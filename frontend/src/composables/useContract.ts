import { ref, computed, onMounted } from 'vue'
import { ethers, Contract } from 'ethers'
import { useWallet } from './useWallet'
import ThematicNFT from '@/contractData/ThematicNFT.json'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

const contract = ref<Contract | null>(null)

export const useContract = () => {
  const { signer, provider, isConnected } = useWallet()

  const wallet = useWallet()

  onMounted(async () => {
    // console.log("🏛️ Initializing contract composable...", wallet.signer.value)
    // contract.value = await initContract()
  })



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

  async function test() {
    // console.log("=== DETAILED DEBUG ===")
    // console.log("wallet.signer:", wallet.signer)
    // console.log("wallet.signer.value:", wallet.signer.value)
    // console.log("typeof wallet.signer.value:", typeof wallet.signer.value)
    // console.log("wallet.signer.value constructor:", wallet.signer.value?.constructor.name)
    // let contract = await initContract()
    if(!contract.value) {
      contract.value = await initContract()
    }
    console.log(">>> test", contract.value);

    let data = await contract.value.getTokenData!(2)
    let res =  await contract.value.getPrice!(78)

    console.log(">>> test data", data[0], data[1]);
    console.log(">>> test price", ethers.formatEther(res));
    
  }

  async function getCurItemInfo(tokenId: number): Promise<{ rarity: string; price: string; isMinted: boolean }> {
    if(!contract.value) {
      contract.value = await initContract()
    }
    
    // let price = null;

    // const [hashFromContract, rarityFromContract] = await contract.value.getTokenData!(tokenId)
    const tokenInfo = await contract.value.getTokenInfo!(tokenId);
    
    const rarity = tokenInfo[1];
    const price = tokenInfo[2];
    const isMinted = tokenInfo[3];

    // console.log(">>> foo", tokenInfo);
    
    

    // if(Number(rarityFromContract) == rarityScore && dataHash===hashFromContract) {
    //   price = await contract.value.getPrice!(rarityScore);
    //   console.log(">>> price", ethers.formatEther(price));
    // }

    return {
      rarity: rarity.toString(),
      price: price ? ethers.formatEther(price) : "0",
      isMinted: isMinted
    };
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
    initContract,
    reinitContract,
    getCurItemInfo,
    test
  }
}