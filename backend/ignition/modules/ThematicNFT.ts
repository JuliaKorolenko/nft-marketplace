import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ThematicNFTModule", (m) => {
  const initialAccount = m.getAccount(0);
  const tokenIds = Array.from({ length: 20 }, (_, i) => i + 1);
  const rarities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 50, 60, 80, 100];
  const uris = tokenIds.map(id => `ipfs://bafyYOURHASH/${id}.json`);
  const ThematicNFT = m.contract("ThematicNFT");
  return { ThematicNFT };
})