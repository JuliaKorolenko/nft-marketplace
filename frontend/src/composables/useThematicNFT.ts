import { ref } from 'vue'
import { useContract } from './useContract'
import { ethers } from 'ethers'

export const useThematicNFT = () => {
  const { callContractMethod, sendContractTransaction, isContractReady } = useContract()
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Получение цены NFT
  const getItemPrice = async (tokenId: number, rarity: number) => {
    if (!isContractReady.value) {
      throw new Error('Contract not ready. Please connect wallet and initialize contract.')
    }

    loading.value = true
    error.value = null

    try {
      console.log(`🔍 Getting price for token ${tokenId}`)
      
      // Предполагаем, что метод называется getPrice или price
      const price = await callContractMethod('getPrice', rarity)
      
      // Конвертируем в ETH
      const priceInEth = ethers.formatEther(price)
      
      console.log(`✅ Price for token ${tokenId}:`, priceInEth, 'ETH')
      
      return priceInEth
      
    } catch (err: any) {
      error.value = err.message
      console.error('Error getting price:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Получение данных токена
  const getTokenData = async (tokenId: number) => {
    if (!isContractReady.value) {
      throw new Error('Contract not ready')
    }

    loading.value = true
    error.value = null

    try {
      // Предполагаем, что метод называется getTokenData
      const data = await callContractMethod('getTokenData', tokenId)
      return data
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Минт NFT
  const mintNFT = async (tokenId: number, priceInEth: string) => {
    if (!isContractReady.value) {
      throw new Error('Contract not ready')
    }

    loading.value = true
    error.value = null

    try {
      console.log(`🎨 Minting token ${tokenId} for ${priceInEth} ETH`)
      
      const receipt = await sendContractTransaction(
        'mint',
        { value: ethers.parseEther(priceInEth) }, // опции
        tokenId // аргументы
      )
      
      console.log('✅ NFT minted successfully')
      return receipt
      
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    isContractReady,
    getItemPrice,
    getTokenData,
    mintNFT
  }
}