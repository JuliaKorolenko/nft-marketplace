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
  // preview_price?: number,
  // likes: number,
  imgUrl: string,
  // metadataIpfsHash: string,
  attributes: Array<{ name: string, value: string | number }>,
  tokenId: number,
  description: string,
  rarity: number,
  isMinted: boolean,
  rank: number,
  // status: 'Hot' | 'New' | 'Trending'
}

export interface Collection {
  tokenId: number,
  uri: string,
  rarity: number,
  price: number,
  attributes?: object[],
  isMinted: boolean,
  name: string,
  description: string
}
