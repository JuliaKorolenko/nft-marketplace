import { ref, computed } from 'vue'
import { ethers, Contract, TransactionReceipt, type Log } from 'ethers'
import { useWallet } from './useWallet'
import { useNftStore } from "@/stores/useNftStore";
import ThematicNFT from '@/contractData/ThematicNFT.json'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

const contract = ref<Contract | null>(null)

export const useContract = () => {
  const { signer, provider, curNetwork, isConnected } = useWallet()
  const nftStore = useNftStore()  

  const wallet = useWallet()

  const isContractReady = computed(() => {
    return isConnected.value && contract.value !== null && signer.value !== null
  })

  const initContract = async (): Promise<Contract> => {
    // Проверяем наличие signer
    if (!signer.value) {
      throw new Error('Signer not available. Please connect wallet first.')
    }

    // Проверяем наличие provider
    if (!provider.value) {
      throw new Error('Provider not available')
    }

    const balance = await provider.value.getBalance("0x70997970c51812dc3a010c7d01b50e0d17dc79c8")  // твой аккаунт
    console.log("balance", ethers.formatEther(balance))

    try {
      // ВАЖНО: Создаем контракт с signer.value, а не просто signer
      return new ethers.Contract(
        CONTRACT_ADDRESS,
        ThematicNFT.abi,
        wallet.signer.value  // Используем .value!
      ) 
      
    } catch (error: any) {
      console.error("❌ Contract initialization error:", error)
      contract.value = null
      throw error
    }
  }

//   async function initContract(): Promise<Contract> {
//   if (!wallet.signer.value) {
//     throw new Error('No signer available to create contract instance');
//   }
//   return new ethers.Contract(CONTRACT_ADDRESS, ThematicNFT.abi, wallet.signer.value);
//   // return contract.value;
// }

  async function getCurItemInfo(tokenId: number): Promise<{ rarity: string; price: string; realPrice: bigint; isMinted: boolean }> {
    if(!contract.value) {
      contract.value = await initContract()
    }

    // console.log(">>>getCurItemInfo", tokenId);
    const tokenInfo = await contract.value.getTokenInfo!(tokenId);
    
    const rarity = tokenInfo[1];
    const price = tokenInfo[2];
    const isMinted = tokenInfo[3];

    // console.log(">>> rrr", price);
    

    return {
      rarity: rarity.toString(),
      price: price ? ethers.formatEther(price) : "0",
      realPrice: price,
      isMinted: isMinted
    };
  }

  async function getItemDetail(tokenId: number) {
    if (!isContractReady.value) return null

    const hidden_address = CONTRACT_ADDRESS.slice(0, 6) + '...' + CONTRACT_ADDRESS.slice(-4);
    return {
      contract_address: hidden_address,
      token_id: `#${tokenId}`,
      token_standart: 'ERC-721',
      blockchain: curNetwork

    };
  }

  async function fetchAvailableTokens() {
    if(!contract.value) {
      contract.value = await initContract()
    }
    return await contract.value.getAvailableTokens!()
    // console.log(">>> fetchAvailableTokens", contract.value);
    
  }

  async function fetchAllTokenIds() {
    if(!contract.value) {
      contract.value = await initContract()
    }
    return await contract.value.getAllTokenIds!()
  }

  async function BuyToken(tokenId: number) {
    if(!contract.value) {
      contract.value = await initContract()
    }

    // parseEther(curPrice)
    const { realPrice } = await getCurItemInfo(tokenId)
    

    const tx = await contract.value.mintNFT!(tokenId, { value: realPrice })
    console.log(">>>> buy tx sent", tx);

    const receipt: TransactionReceipt = await tx.wait()  // ждём 1 блок подтверждения

    console.log(">>>> tx confirmed", receipt);
    
    const iface = new ethers.Interface(ThematicNFT.abi)
    
    receipt.logs.forEach((log) => {
      // console.log(">>>> logs", log);
      try {
        const parsed = iface.parseLog(log)
        // console.log(">>>> log name", parsed?.name);
        if (parsed?.name === "NFTMinted") {
          const [ to, tokenId, price ] = parsed.args;

          console.log(">>> Minted!", to, tokenId, price); 
          nftStore.handleMintEvent(
            to,
            Number(tokenId),
            price.toString()
          )
        }

      } catch(e) {}

      
      // try {
      //   const parsed = contract.value?.interface.parseLog(log)
        

      //   if (parsed?.name === "NFTMinted") {
      //     const { to, tokenId, price } = parsed.args
      //     console.log("Minted!", {
      //       to,
      //       tokenId: tokenId.toString(),
      //       price: price.toString()
      //     })
      //   }
      // } catch (e) {
      //   // игнорируем логи, которые не удалось распарсить
      // }
    })

    return receipt
  }

  async function listenToMintEvents() {
    if(!contract.value) {
      contract.value = await initContract()
    }
    // const filter = contract.value?.filters.NFTMinted!();
    const iface = new ethers.Interface(ThematicNFT.abi)

    provider.value?.on({ address: contract.value.getAddress()}, (log) => {
      try {
        const parsed = iface.parseLog(log)

        if (parsed?.name === "NFTMinted") {
          const { to, tokenId, price} = parsed.args;

          console.log(">>> Minted!"); 
          nftStore.handleMintEvent(
            to,
            Number(tokenId),
            price.toString()
          )
        }

      } catch(e) {}
    })
  }

  // Пересоздание контракта (полезно после смены аккаунта)
  const reinitContract = async () => {
    console.log("🔄 Reinitializing contract...")
    contract.value = null
    await initContract()
  }

  return {
    contract,
    isContractReady,
    getItemDetail,
    initContract,
    reinitContract,
    getCurItemInfo,
    fetchAvailableTokens,
    BuyToken,
    listenToMintEvents,
    fetchAllTokenIds
  }
}