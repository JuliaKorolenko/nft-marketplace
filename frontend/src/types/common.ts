// import { ethers } from "ethers";
// import type { Contract } from "ethers";

export const NETWORKS: Record<number, string> = {
  1:      "Ethereum Mainnet",
  5:      "Goerli Testnet",
  11155111: "Sepolia Testnet",

  137:    "Polygon Mainnet",
  80001:  "Polygon Mumbai",

  56:     "BNB Smart Chain Mainnet",
  97:     "BNB Testnet",

  10:     "Optimism",
  420:    "Optimism Goerli",

  42161:  "Arbitrum One",
  421613: "Arbitrum Goerli",

  8453:   "Base Mainnet",
  84531:  "Base Goerli",

  43114:  "Avalanche C-Chain",
  43113:  "Avalanche Fuji Testnet"
}

// export interface AccountChangeInfo {
//   userAddress: string;
//   provider: any;
//   networkName: string;
//   contract?: Contract;
//   signer?: ethers.Signer;
// }

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
