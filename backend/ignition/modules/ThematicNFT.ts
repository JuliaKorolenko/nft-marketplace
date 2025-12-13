import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { fileURLToPath } from "url";
import fs from 'fs';
import path from "path";
import { parseEther } from 'ethers'

export default buildModule("ThematicNFTModule", (m) => {
  const initialAccount = m.getAccount(0);
  const basePrice = parseEther("0.001");
  const tokenIds = Array.from({ length: 20 }, (_, i) => i + 1);
  const rarities = [98, 78, 43, 85, 65, 96, 89, 98, 94, 87, 75, 90, 95, 88, 70, 85, 95, 70, 72, 88];

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const uriFilePath = path.join(__dirname, "../../assets/collections/metadata_cids.json");
  const uris: string[] = JSON.parse(fs.readFileSync(uriFilePath, "utf8"));

  if(uris.length !== rarities.length) {
    throw new Error("URIs's length and rarities's length mismatch")
  }
  
  const ThematicNFT = m.contract("ThematicNFT", [initialAccount, basePrice, tokenIds, uris, rarities]);

  return { ThematicNFT };
})