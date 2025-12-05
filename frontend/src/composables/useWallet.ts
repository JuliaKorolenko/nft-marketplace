import { ref, shallowRef, computed } from 'vue'
import { BrowserProvider } from 'ethers';
import type { Signer } from 'ethers'

const isConnected = ref(false)
const account = ref<string | null>(null)
const balance = ref<string | null>(null)
const chainId = ref<number | string | null>(null)

const provider = shallowRef<BrowserProvider | null>(null)
const signer = shallowRef<Signer | null>(null);
const curNetwork = ref<string | null>(null);

const NETWORKS: Record<number, string> = {
  1:      "Ethereum Mainnet",
  5:      "Goerli Testnet",
  11155111: "Sepolia Testnet",

  137:    "Polygon Mainnet",
  80001:  "Polygon Mumbai",

  56:     "BNB Smart Chain Mainnet",
  97:     "BNB Testnet",

  10:     "Optimism",
  420:    "Optimism Goerli",

  42161:  "Arbitrum One",
  421613: "Arbitrum Goerli",

  8453:   "Base Mainnet",
  84531:  "Base Goerli",

  43114:  "Avalanche C-Chain",
  43113:  "Avalanche Fuji Testnet"
}

export const useWallet = () => {

  const getCurAddress = computed(() => {
    return account.value ? account.value.slice(0, 6) + '...' + account.value.slice(-4) : null;
  });

  const connect = async () => {
    
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    try {
      // Запрашиваем разрешение на подключение
      await window.ethereum.request({ method: "eth_requestAccounts" });
      account.value = (window.ethereum as any).selectedAddress;

      const _provider = new BrowserProvider(window.ethereum!);
      const _signer = await _provider.getSigner();
      console.log(">>==", _signer)

      const _address = await _signer.getAddress();

      const _network = await _provider.getNetwork();
      const _chainId = Number(_network.chainId);

      provider.value = _provider;
      signer.value = _signer;
      account.value = _address;
      // balance.value = formatEther(_balance);
      isConnected.value = true;

      curNetwork.value = _chainId === 31337 ? "Hardhat Local" : NETWORKS[_chainId] ?? null;

      // const bal = await provider.value.getBalance(account.value!)
      // let balance = formatEther(bal);

    } catch (error) {
      console.error("Ошибка при подключении:", error);
      resetConnectionData()
    }
  }

  const disconnect = () => {
    resetConnectionData()
  }

  const resetConnectionData = () => {
    isConnected.value = false
    account.value = null
    balance.value = null
    provider.value = null
    signer.value = null
    chainId.value = null
  }



  return {
    isConnected,
    account,
    balance,
    curNetwork,
    provider,
    signer,
    getCurAddress,
    connect,
    disconnect
  }
}