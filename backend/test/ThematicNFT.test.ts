import { assert, expect } from "chai";
import { type Signer } from "ethers";
import { network } from "hardhat";
// import { ThematicNFT } from "../typechain-types";

const { ethers } = await network.connect();

describe.only("ThematicNFT", function () {
  let nft: any;
  let owner: Signer;
  let buyer1: Signer;
  let buyer2: Signer;

  const basePrice = ethers.parseEther("0.01");
  const tokenIds = [1, 2, 3, 4, 5];
  const uris = [
    "ipfs://QmHash1",
    "ipfs://QmHash2", 
    "ipfs://QmHash3",
    "ipfs://QmHash4",
    "ipfs://QmHash5"
  ];
  const rarities = [10, 30, 50, 70, 90]; // 10% to 90% rarity

  this.beforeEach(async function () {
    [owner, buyer1, buyer2] = await ethers.getSigners();

    const NFTFactory = await ethers.getContractFactory("ThematicNFT");

    nft = await NFTFactory.deploy(
      await owner.getAddress(), // initialAccount
      basePrice,
      tokenIds,
      uris,
      rarities
    );

    await nft.waitForDeployment();
  })

  it("Should set the correct owner", async function () {
    const ownerAddress = await owner.getAddress();
    const nftOwner = await nft.owner();
    expect(nftOwner).to.equal(ownerAddress);
  });

  it("Should set the correct price", async function () {
    const price = await nft.basePrice();
    expect(price).to.equal(basePrice);
  });

  it("Should store all token IDs", async function () {
    for (let i = 0; i < tokenIds.length; i++) {
      expect(await nft._allTokenIds(i)).to.equal(tokenIds[i]);
    }
  });

  it("Should mark all tokens as existing", async function () {
    for (const tokenId of tokenIds) {
      const exists = await nft.tokenExists(tokenId);
      expect(exists).to.be.true;
    }
  });

  it("Should revert if owner is zero address", async function () {
    const NFT = await ethers.getContractFactory("ThematicNFT");

    await expect(
      NFT.deploy(ethers.ZeroAddress, basePrice, tokenIds, uris, rarities)
    ).to.be.revertedWithCustomError(NFT,"OwnableInvalidOwner");
  });

  it("Should revert if base price is 0", async function () {
    const NFTFactory = await ethers.getContractFactory("ThematicNFT");

    await expect(
      NFTFactory.deploy(
        await owner.getAddress(),
        0n, // invalid base price
        tokenIds,
        uris,
        rarities
      )
    ).to.be.revertedWith("Base price must be greater than 0");
  });

});