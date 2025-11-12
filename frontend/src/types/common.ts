import { ethers } from "ethers";
import type { Contract } from "ethers";

export interface AccountChangeInfo {
  userAddress: string;
  provider: any;
  networkName: string;
  contract?: Contract;
  signer?: ethers.Signer;
}

export interface NFTCard {
  id: number,
  name: string,
  collection: string,
  price: number,
  preview_price?: number,
  likes: number,
  image: string,
  status: 'Hot' | 'New' | 'Trending'
}
