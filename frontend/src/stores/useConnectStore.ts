import { defineStore} from 'pinia';


export const useConnectStore = defineStore('connectStore', {
    state: () => ({
      walletConnected: false,
      curNetwork: '',
      curWalletAddress: '',
      curContractAddress: '',
    }),
    getters: {
      isWalletConnected: (state) => state.walletConnected,
      getCurNetwork: (state) => state.curNetwork,
      getCurWalletAddress: (state) => state.curWalletAddress,
      getCurContractAddress: (state) => state.curContractAddress,
    },
    actions: {
      setWalletConnected(value: boolean) {
        this.walletConnected = value
      },

      setCurNetwork(value: string) {
        this.curNetwork = value
      },

      setCurWalletAddress(value: string) {
        this.curWalletAddress = value
      },
      setCurContractAddress(value: string) {
        console.log(">>> setCurContractAddress", value);
        
        this.curContractAddress = value
      }
    }
})