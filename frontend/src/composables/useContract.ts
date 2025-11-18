import { ref, computed } from 'vue'
import { ethers, Contract } from 'ethers'
import { useWallet } from './useWallet'
import ThematicNFT from '@/contractData/ThematicNFT.json'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

const contract = ref<Contract | null>(null)

export const useContract = () => {
  // const { signer, provider, isConnected } = useWallet()

  const wallet = useWallet()

  const isContractReady = computed(() => {
    return wallet.isConnected.value && contract.value !== null && wallet.signer.value !== null
  })

  // const initContract = async (): Contract => {
  //   // Проверяем наличие signer
  //   if (!signer.value) {
  //     throw new Error('Signer not available. Please connect wallet first.')
  //   }

  //   // Проверяем наличие provider
  //   if (!provider.value) {
  //     throw new Error('Provider not available')
  //   }

  //   try {
  //     // ВАЖНО: Создаем контракт с signer.value, а не просто signer
  //     return new ethers.Contract(
  //       CONTRACT_ADDRESS,
  //       ThematicNFT.abi,
  //       signer.value  // Используем .value!
  //     )
      
  //     // console.log("✅ Contract initialized:", CONTRACT_ADDRESS)
  //     // console.log("   Contract instance:", contract.value)
      
  //     // // Проверяем, что контракт создан правильно
  //     // if (contract.value.target) {
  //     //   console.log("   Contract address:", contract.value.target)
  //     // }
      
  //   } catch (error: any) {
  //     console.error("❌ Contract initialization error:", error)
  //     contract.value = null
  //     throw error
  //   }
  // }

  async function initContract(): Promise<Contract> {
  if (!wallet.signer.value) {
    throw new Error('No signer available to create contract instance');
  }
  contract.value = new ethers.Contract(CONTRACT_ADDRESS, ThematicNFT.abi, wallet.signer.value);
}

  async function test() {
    // console.log("=== DETAILED DEBUG ===")
    // console.log("wallet.signer:", wallet.signer)
    // console.log("wallet.signer.value:", wallet.signer.value)
    // console.log("typeof wallet.signer.value:", typeof wallet.signer.value)
    // console.log("wallet.signer.value constructor:", wallet.signer.value?.constructor.name)
    // let c = await initContract()
    // console.log(">>> test", c);

    let data =  await contract.value!.getTokenData!(2)
    let res =  await contract.value!.getPrice!(78)

    console.log(">>> test data", data);
    console.log(">>> test price", ethers.formatEther(res));
    
  }

  // Вызов read-only методов (view/pure)
  const callContractMethod = async (
    methodName: string,
    ...args: any[]
  ) => {
    // Проверяем готовность контракта
    if (!contract.value) {
      throw new Error('Contract not initialized. Call initContract() first.')
    }

    // Проверяем, что метод существует
    if (typeof contract.value[methodName] !== 'function') {
      throw new Error(`Method ${methodName} does not exist on contract`)
    }

    try {
      console.log(`📞 Calling ${methodName} with args:`, args)
      
      // Вызываем метод
      const result = await contract.value[methodName](...args)
      
      console.log(`✅ ${methodName} result:`, result)
      return result
      
    } catch (error: any) {
      console.error(`❌ Error calling ${methodName}:`, {
        message: error.message,
        code: error.code,
        data: error.data
      })
      throw error
    }
  }

  // Отправка транзакций (non-view методы)
  const sendContractTransaction = async (
    methodName: string,
    options: any = {},
    ...args: any[]
  ) => {
    if (!contract.value) {
      throw new Error('Contract not initialized')
    }

    if (!signer.value) {
      throw new Error('Signer not available')
    }

    try {
      console.log(`📝 Sending transaction: ${methodName}`)
      console.log('   Args:', args)
      console.log('   Options:', options)
      
      // Вызываем метод с опциями (например, {value: ethers.parseEther("0.1")})
      const tx = await contract.value[methodName]!(...args, options)
      console.log("   Transaction hash:", tx.hash)
      
      // Ждем подтверждения
      const receipt = await tx.wait()
      console.log("✅ Transaction confirmed:", receipt.hash)
      
      return receipt
      
    } catch (error: any) {
      console.error(`❌ Transaction error in ${methodName}:`, error)
      throw error
    }
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
    callContractMethod,
    sendContractTransaction,
    test
  }
}