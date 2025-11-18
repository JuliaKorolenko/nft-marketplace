import { ref, shallowRef } from 'vue'
import { BrowserProvider } from 'ethers';
import type { Signer } from 'ethers'

const isConnected = ref(false)
const account = ref<string | null>(null)
const balance = ref<string | null>(null)
const chainId = ref<number | null>(null)

const provider = shallowRef<BrowserProvider | null>(null)
const signer = shallowRef<Signer | null>(null);
// const address = ref<string | null>(null);

export const useWallet = () => {

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
      chainId.value = Number(_network.chainId);

      provider.value = _provider;
      signer.value = _signer;
      account.value = _address;
      // chainId.value = Number(_network.chainId);
      // balance.value = formatEther(_balance);
      isConnected.value = true;

      // isConnected.value = true;

      // console.log("✅ Wallet connected:", account.value)

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
    chainId.value = null
    provider.value = null
    signer.value = null
  }



  return {
    isConnected,
    account,
    balance,
    chainId,
    provider,
    signer,
    connect,
    disconnect
  }
}