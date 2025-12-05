import { ref } from "vue";
import { Contract, JsonRpcProvider, BrowserProvider, Log, ethers } from "ethers";
import { type Collection } from '@/types/common'
import ThematicNFT from '@/contractData/ThematicNFT.json'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const RPC_ADDRESS = import.meta.env.VITE_RPC_ADDRESS;
const BASE_URL = import.meta.env.VITE_IPFS_BASE_URL;

// --- PUBLIC PROVIDER (для чтения данных без кошелька)
// const publicProvider = new JsonRpcProvider("http://127.0.0.1:8545");
const publicProvider = new JsonRpcProvider(RPC_ADDRESS);
const publicContract = new Contract(CONTRACT_ADDRESS, ThematicNFT.abi, publicProvider);

// --- WALLET PROVIDER (создаётся только после connect)
const walletProvider = ref<BrowserProvider | null>(null);
const signerContract = ref<Contract | null>(null);

export function useThematicNFT() {

  const walletAddress = ref<string | null>(null);
  const loading = ref(false);

  // ------------------------------------------
  // 1) Подключение кошелька
  // ------------------------------------------
  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    walletProvider.value = new BrowserProvider(window.ethereum);
    const signer = await walletProvider.value.getSigner();

    walletAddress.value = signer.address;

    signerContract.value = new Contract(CONTRACT_ADDRESS, ThematicNFT.abi, signer);
  }

  async function getCollectionsData() {
    const collections = await fetchAllTokens()

    // console.log(">>> collections", collections);    

    return await Promise.all(
      collections.map(async (el: Collection, id: number) => {
        const metadataUrl = `${BASE_URL}${el.uri}`
        // const imgUrl = await fetchImageUrl(url)
        const response = await fetch(metadataUrl);
        const metadata = await response.json();
        // console.log(">>> metadata", metadata);

        const imgUrl = metadata.image?.replace("ipfs://", BASE_URL) || "";

        const attributesArray = (metadata.attributes || []).map((attr: any) => ({
          name: attr.trait_type,
          value: attr.value
        }));

        const name = metadata.name || ''
        const description = metadata.description || ''

        // console.log(">>> imgUrl", el.tokenId);
        return {
          id,
          tokenId: el.tokenId,
          name,
          rarity: el.rarity,
          price: el.price,
          isMinted: el.isMinted,
          imgUrl,
          description,
          attributes: attributesArray
        }
      })
    )
  }

  // ------------------------------------------
  // 2) Чтение всех данных о токенах (без кошелька)
  // ------------------------------------------
  async function fetchAllTokens() {
    // твой публичный метод
    const tokensInfo = await publicContract.getAllTokensInfo!();

    // console.log(">>> fetch", tokensInfo);
    
    const [tokenIds, uris, rarities, prices, mintedStatuses] = tokensInfo;

    const tokens = tokenIds.map((id: bigint, index: number) => ({
      tokenId: Number(id),
      uri: uris[index],
      rarity: Number(rarities[index]),
      price: Number(prices[index]),
      isMinted: mintedStatuses[index],
    }));

    return tokens
  }

  // ------------------------------------------
  // 3) Покупка токена (требует подключённый кошелёк)
  // ------------------------------------------
  async function buyToken(tokenId: number) {
    if (!signerContract.value) {
      throw new Error("Wallet not connected");
    }

    const tokenInfo = await publicContract.getTokenInfo!(tokenId);

    const price = tokenInfo.price;

    const tx = await signerContract.value.mintNFT!(tokenId, {
      value: price,
    });

    return await tx.wait();
  }

  async function fetchAllTokenIds() {
    return await publicContract.getAllTokenIds!()
  }

  async function fetchAvailableTokens() {
    return await publicContract.getAvailableTokens!()
  }

  return {
    // state
    walletAddress,
    loading,

    // methods
    connectWallet,
    fetchAllTokens,
    buyToken,
    fetchAllTokenIds,
    fetchAvailableTokens,
    getCollectionsData
  };
}
