import { defineStore} from 'pinia';
import type { Log } from "ethers";

export type NftStatus = true | false;

export interface NftInfo {
  status: NftStatus;
  owner: string | null;
  price: string | null;
}

export const useNftStore = defineStore('nftStore', {
  state: () => ({
    nftStatuses: {} as Record<number, NftInfo>
  }),

  getters: {
    getNftData: (state) => (tokenId: number) => {
      return state.nftStatuses[tokenId];
    },

    isNftMinted: (state) => (tokenId: number) => {
      return state.nftStatuses[tokenId]?.status === true;
    }
  },

  actions: {
    setNftStatus(tokenId: number, info: Partial<NftInfo>) {
      if(!this.nftStatuses[tokenId]) {
        this.nftStatuses[tokenId] = {
          status: false,
          owner: null,
          price: null
        }
      }

      this.nftStatuses[tokenId] = {
        ...this.nftStatuses[tokenId],
        ...info
      }
    },

    handleMintEvent(to: string, tokenId: number, price: string) {
      
      
      this.setNftStatus(tokenId, {
        status: true,
        owner: to,
        price
      })

      console.log(">>> store", this.nftStatuses);
    }
  }
})