import { ethers, Contract, BrowserProvider } from 'ethers';
// import type { AccountChangeInfo } from "./types/common";
// import contractABI from './contracts/CryptoWarriors.json';

const CONTRACT_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

let provider: BrowserProvider;
let signer: ethers.Signer;
// let contract: Contract;
let userAddress: string;
let networkName: string;

// export async function subscribeToAccountChanges(callback: (info: AccountChangeInfo) => void)  {
export async function subscribeToAccountChanges(callback: (info: any) => void)  {
  if (!window.ethereum) return;
  
  window.ethereum.on("accountsChanged", async (accounts) => {
    const addresses = accounts as string[];
    if (addresses.length > 0) {
      console.log('🔄 Аккаунт изменён:', addresses[0]);

      // Создаём новый provider при каждой смене аккаунта
      await setConnectionData();
      // const  contract: Contract = await createContractInstance();
      // use the userAddress set by setConnectionData() to avoid string | undefined
      // callback({ signer, userAddress, provider, networkName, contract });
      callback({ signer, userAddress, provider, networkName });
    } else {
      console.log('❌ Все аккаунты отключены');
      // callback({ signer: null, userAddress: '', provider: null, networkName: '', contract: null });
    }
  });

}

// Подключение MetaMask
export async function connectMetaMask() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
     // Запрашиваем разрешение на подключение
    await window.ethereum.request({ method: "eth_requestAccounts" });

    await setConnectionData();

    // const  contract: Contract = await createContractInstance();

    // return { signer, userAddress, networkName, provider, contract };
    return { signer, userAddress, networkName, provider };

  } catch (error) {
    console.error("Ошибка при подключении:", error);
  }
}

// Получение баланса
export async function getBalance(address: string, provider: ethers.BrowserProvider): Promise<string> {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

// export async function IsOwner(): Promise<boolean> {
//   const contract: Contract = await createContractInstance();
//   const owner = await contract.owner();
//   return owner.toLowerCase() === userAddress.toLowerCase();
// }

// export async function BuyCollection(): Promise<void> {
//   const contract: Contract = await createContractInstance();
//   const collectionPrice = await contract.getCollectionPrice();

//   const hasCollection = await contract.hasCollection(userAddress);

//   if (hasCollection) {
//     console.log("⚠️ У вас уже есть коллекция. Она будет перезаписана!");
//   }


//   try {
//     const tx = await contract.buyCollection({
//       value: collectionPrice,
//     });
//     await tx.wait();
//     console.log("Collection purchased successfully");

//   } catch (error) {
//     console.error("Error purchasing collection:", error);
//   }
// }

async function setConnectionData() {
  provider = new ethers.BrowserProvider(window.ethereum!);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  networkName = chainId === 31337 ? "Hardhat Local" : network.name;
}

// async function createContractInstance(): Promise<Contract> {
//   if (!signer) {
//     throw new Error('No signer available to create contract instance');
//   }
//   return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
// }

