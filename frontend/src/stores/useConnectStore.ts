import { defineStore} from 'pinia';


export const useConnectStore = defineStore('connectStore', {
    state: () => ({
      walletConnected: false,
      curNetwork: '',
      curWalletAddress: '',
    }),
    getters: {
      isWalletConnected: (state) => state.walletConnected,
      getCurNetwork: (state) => state.curNetwork,
      getCurWalletAddress: (state) => state.curWalletAddress,
    },
    actions: {
      setWalletConnected(value: boolean) {
        this.walletConnected = value
      },

      setCurNetwork(value: string) {
        this.curNetwork = value
      },

      seCurWalletAddress(value: string) {
        this.curWalletAddress = value
      },
    }
})