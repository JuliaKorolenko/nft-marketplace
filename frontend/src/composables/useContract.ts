import { ref, computed, onMounted } from 'vue'
import { ethers, Contract, TransactionReceipt, Log, parseEther } from 'ethers'
import { useWallet } from './useWallet'
import ThematicNFT from '@/contractData/ThematicNFT.json'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

const contract = ref<Contract | null>(null)

export const useContract = () => {
  const { signer, provider, curNetwork, isConnected } = useWallet()

  const wallet = useWallet()

  const isContractReady = computed(() => {
    return isConnected.value && contract.value !== null && signer.value !== null
  })

  // const contractAddress = computed(() => {
  //   const hidden_address = CONTRACT_ADDRESS.slice(0, 6) + '...' + CONTRACT_ADDRESS.slice(-4);
  //   return isContractReady.value ? hidden_address : null;
  // }) 

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

  async function getCurItemInfo(tokenId: number): Promise<{ rarity: string; price: string; realPrice: bigint; isMinted: boolean }> {
    if(!contract.value) {
      contract.value = await initContract()
    }

    // console.log(">>>getCurItemInfo", tokenId);
    const tokenInfo = await contract.value.getTokenInfo!(tokenId);
    
    const rarity = tokenInfo[1];
    const price = tokenInfo[2];
    const isMinted = tokenInfo[3];

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

  async function BuyToken(tokenId: number, curPrice: string) {
    if(!contract.value) {
      contract.value = await initContract()
    }

    // parseEther(curPrice)
    const { realPrice } = await getCurItemInfo(tokenId)
    

    const tx = await contract.value.mintNFT!(tokenId, { value: realPrice })
    console.log(">>>> buy tx sent", tx);

    const receipt: TransactionReceipt = await tx.wait()  // ждём 1 блок подтверждения

    console.log(">>>> tx confirmed", receipt);

    receipt.logs.forEach((log: Log) => {
      try {
        const parsed = contract.value?.interface.parseLog(log)
        if (parsed?.name === "NFTMinted") {
          const { to, tokenId, price } = parsed.args
          console.log({
            to,
            tokenId: tokenId.toString(),
            price: price.toString()
          })
        }
      } catch (e) {
        // игнорируем логи, которые не удалось распарсить
      }
    })

    // contract.value.on('NFTMinted', (to, tokenId, price) => {
    //   console.log(">>>> Token minted!", { to, tokenId, price});
      
    // })

    
    
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
    BuyToken,
    test
  }
}