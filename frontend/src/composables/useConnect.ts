import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { Contract, JsonRpcProvider, BrowserProvider, ethers, TransactionReceipt  } from 'ethers';
import type { Signer } from 'ethers'
import { useConnectStore } from "@/stores/useConnectStore";
import ThematicNFT from '@/contractData/ThematicNFT.json'
import { NETWORKS } from '@/types/common'
import { notify } from '@/composables/useNotification';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const RPC_ADDRESS = import.meta.env.VITE_RPC_ADDRESS;

const publicProvider = new JsonRpcProvider(RPC_ADDRESS);
const publicContract = new Contract(CONTRACT_ADDRESS, ThematicNFT.abi, publicProvider);

const walletProvider = shallowRef<BrowserProvider | null>(null);
const curContract = ref<Contract | null>(publicContract);
const signer = shallowRef<Signer | null>(null);
const account = ref<string | null>(null)

export function useConnect() {

  const connectStore = useConnectStore() 

  onMounted(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', _subscribeToAccountChanges);
    }
  })

  onUnmounted(() => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', _subscribeToAccountChanges);
    }
  });


  const _subscribeToAccountChanges = async (accounts: string[]) => {
    if (accounts.length === 0) {
      _resetConnectionData()
      
    } else {
      account.value = accounts[0]!;

      if(walletProvider.value) {
        signer.value = await walletProvider.value.getSigner()
        curContract.value = await _initContract()
        await _setConnectionData()
      }
    }
  }

  const connectWallet = async () => {
    
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // const _account = (window.ethereum as any).selectedAddress;
      walletProvider.value = new BrowserProvider(window.ethereum!);
      signer.value = await walletProvider.value.getSigner();
      account.value = await signer.value.getAddress();
      curContract.value = await _initContract()

      console.log(">>==", signer.value)

      await _setConnectionData()

    } catch (error) {
      console.error("Ошибка при подключении:", error);
      _resetConnectionData()
    }
  }
  
  const disconnectWallet = () => {
    _resetConnectionData()
  }

  async function buyToken(tokenId: number, price: bigint): Promise<TransactionReceipt> {
    if (!connectStore.isWalletConnected) {
      throw new Error("Wallet not connected");
    }   

    let balanceBefor;

    if(account.value) {
      let res = await walletProvider.value?.getBalance!(account.value)

      balanceBefor = res && ethers.formatEther(res);
    }
    

    notify.info('Minting NFT...', 'Please wait');

    const tx = await curContract.value?.mintNFT!(tokenId, {
      value: price,
    });

    console.log(">>> account", balanceBefor, ethers.formatEther(price));
    
    const receipt: TransactionReceipt = await tx.wait()

    const iface = new ethers.Interface(ThematicNFT.abi)

    receipt.logs.forEach((log) => {
      // console.log(">>>> logs", log);
      try {
        const parsed = iface.parseLog(log)
        // console.log(">>>> log name", parsed?.name);
        if (parsed?.name === "NFTMinted") {
          const [ to, tokenId, price ] = parsed.args;

          console.log(">>> Minted!", to, tokenId, price); 
          notify.success(`NFT #${Number(tokenId)} minted successfully!`, 'Success');
        }

      } catch(e) {
        notify.error(e instanceof Error ? e.message : 'Unknown error', 'Minting Failed');
      }

    })

    return receipt
  }

  const _initContract = async (): Promise<Contract> => {
    // Проверяем наличие signer
    if (!signer.value) {
      throw new Error('Signer not available. Please connect wallet first.')
    }

    // Проверяем наличие provider
    if (!walletProvider.value) {
      throw new Error('Provider not available')
    }

    // const balance = await walletProvider.value.getBalance("0x70997970c51812dc3a010c7d01b50e0d17dc79c8")  // твой аккаунт
    // console.log("balance", ethers.formatEther(balance))

    try {
      // ВАЖНО: Создаем контракт с signer.value, а не просто signer
      return new ethers.Contract(
        CONTRACT_ADDRESS,
        ThematicNFT.abi,
        signer.value  // Используем .value!
      ) 
      
    } catch (error: any) {
      console.error("❌ Contract initialization error:", error)
      curContract.value = publicContract
      throw error
    }
  }

  const _resetConnectionData = () => {
    account.value = null
    walletProvider.value = null
    signer.value = null
    curContract.value = publicContract

    connectStore.setWalletConnected(false)
    connectStore.setCurNetwork('')
    connectStore.setCurWalletAddress('')
    connectStore.setCurContractAddress('')
  }

  const _setConnectionData = async () => {
    const _network = await walletProvider.value?.getNetwork();
    const _chainId = Number(_network?.chainId);

    const curNetwork = _chainId === 31337 ? "Hardhat Local" : NETWORKS[_chainId] ?? _network?.name;
    const walletAddress = account.value ? account.value.slice(0, 6) + '...' + account.value.slice(-4) : '';
    const contractAddress = CONTRACT_ADDRESS.slice(0, 6) + '...' + CONTRACT_ADDRESS.slice(-4);

    console.log(">>>> set", contractAddress);
    

    connectStore.setWalletConnected(true)
    connectStore.setCurNetwork(curNetwork!)
    connectStore.setCurWalletAddress(walletAddress)
    connectStore.setCurContractAddress(contractAddress)

    const bal = await walletProvider.value?.getBalance(account.value!)
    let balance = ethers.formatEther(bal!);

    console.log(">>>> curBalance", balance);
  }

  return {
    curContract,
    connectWallet,
    disconnectWallet,
    buyToken
  }
}