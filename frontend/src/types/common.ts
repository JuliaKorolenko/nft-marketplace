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
  metadataIpfsHash: string,
  attributes: Array<{ trait_type: string, value: string | number }>,
  tokenId: number,
  description: string,
  rank?: number,
  status: 'Hot' | 'New' | 'Trending'
}
