import { ref, onMounted } from 'vue'
import { ethers, Contract, BrowserProvider, formatEther } from 'ethers';

export const useConnectMetamask = () => {
  const isConnected = ref(false)
  const account = ref<string | null>(null)
  const balance = ref<string | null>(null)
  const chainId = ref<number | null>(null)
  const provider = ref<BrowserProvider | null>(null)
  const signer = ref<ethers.Signer | null>(null);
  const address = ref<string | null>(null);

  const connect = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      // Запрашиваем разрешение на подключение
      await window.ethereum.request({ method: "eth_requestAccounts" });
      account.value = (window.ethereum as any).selectedAddress;

      let provider = new BrowserProvider(window.ethereum!);
      let signer = await provider.getSigner();
      let a = await signer.getAddress();
      // address.value = await signer.value.getAddress();
      const network = await provider.getNetwork();
      // chainId.value = Number(network.chainId);
     
      // console.log(">>> connect", account.value, signer.value, address.value, network, provider.value, balance.value);
      

      // provider.value = new BrowserProvider((window as any).ethereum);
      const bal = await provider!.getBalance(account.value!)
      let balance = formatEther(bal)

      console.log(">>> connect", account.value, a, network, balance);

      // console.log(">>> connect", account.value, provider.value, balance.value);
      

    } catch (error) {
      console.error("Ошибка при подключении:", error);
    }
    // try {
    //   if (!(window as any).ethereum) {
    //     console.log('MetaMask не найден. Установите расширение.')
    //     return
    //   }

    //   const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
    //   account.value = accounts[0]

    //   provider.value = new BrowserProvider((window as any).ethereum);
    //   const bal = await provider.value!.getBalance(account.value!)
    //   balance.value = formatEther(bal)

    //   const net = await provider.value!.getNetwork()
    //   const rawChainId = (net as any).chainId as number | bigint | null
    //   chainId.value = rawChainId === null ? null : (typeof rawChainId === 'bigint' ? Number(rawChainId) : rawChainId)
    //   error.value = null
    // } catch (err: any) {
    //   // error.value = err?.message || String(err)
    //   console.log(">>> Error connecting to MetaMask:", error.value);
      
    // }
  }

  return {
    isConnected,
    account,
    balance,
    chainId,
    provider,
    connect
  }
}