# Thematic NFT Marketplace

A decentralized NFT marketplace built on Ethereum with ERC-721 smart contracts, featuring dynamic pricing based on rarity and a Vue.js frontend with MetaMask integration.

## 📋 Overview

This project is a full-stack NFT marketplace consisting of:
- **Smart Contract (Backend)**: ERC-721 compliant contract with rarity-based dynamic pricing
- **Frontend (dApp)**: Vue 3 + TypeScript application with Web3 integration for seamless blockchain interaction

The marketplace features a cyberpunk-themed UI showcasing unique digital art collections across multiple themes including Cyberpunk, Nebula, and Surrealism aesthetics.


## ✨ Key Features

- 🎨 **NFT Minting**: Mint unique NFTs with predefined metadata and rarity levels
- 💎 **Dynamic Pricing**: Prices automatically adjust based on NFT rarity (0-100 scale)
- 💰 **Secure Purchases**: Buy NFTs with automatic refunds for overpayment
- 🔗 **MetaMask Integration**: Connect your wallet and interact with the blockchain
- 📊 **Marketplace View**: Browse all available NFTs with real-time minting status
- 🔍 **Search & Filter**: Search NFTs by name, filter by rarity, sort by price
- 🏷️ **Rarity Tiers**: LEGENDARY, EPIC, RARE, UNCOMMON, COMMON
- 📈 **Real-time Statistics**: Floor price, ceiling price, available tokens, total sales
- 🎭 **Themed Collections**: Cyberpunk, Nebula, Surrealism digital art
- 🔐 **Owner Controls**: Contract owner can withdraw funds and adjust base pricing
- 🛡️ **Security**: ReentrancyGuard protection and safe transfer mechanisms


## 🛠 Technology Stack

### Backend (Smart Contract)
- **Solidity ^0.8.28** - Smart contract language
- **Hardhat 3.0.7** - Development framework
- **OpenZeppelin 5.0.0** - Industry-standard contract libraries
  - ERC721URIStorage
  - Ownable
  - ReentrancyGuard
- **TypeScript** - Type-safe scripting
- **Pinata** - IPFS integration for metadata storage
- **Network**: Sepolia Testnet (production-ready for mainnet)

### Frontend
- **Vue 3.5** - Progressive JavaScript framework
- **TypeScript 5.9** - Static type checking
- **Vite 7.1** - Next-generation build tool
- **Ethers.js 6.15** - Ethereum library for blockchain interaction
- **Pinia 3.0** - State management
- **VueUse 14.1** - Composition utilities


## 📦 Installation & Setup

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- MetaMask browser extension
- Git


### Clone the Repository
```bash
git clone https://github.com/JuliaKorolenko/nft-marketplace.git
cd nft-marketplace
```

### Backend Setup
```bash
cd backend
npm install
```

#### Environment Configuration
- For local development, you don't need any API keys - Hardhat provides a built-in local blockchain
- The NFT metadata is already prepared in backend/assets/collections/metadata_cids.json and will be read by the deployment script.
- The uploadAllCollections.js script is included for reference but is not required for deployment.


#### Local Development
Start a local Hardhat node (provides 10 test accounts with 10000 ETH each):

```bash
npx hardhat node
```

In a new terminal, deploy to local network:

```bash
npx hardhat ignition deploy ignition/modules/ThematicNFT.ts --network localhost
```

Hardhat will automatically compile the contract before deployment - no need to run npm run compile separately!

The deployment will:

Compile the ThematicNFT contract automatically
Deploy with base price and metadata from backend/assets/collections/metadata_cids.json
Output the deployed contract address

This will deploy the `ThematicNFT` contract with:
- Base price configuration
- Predefined token IDs, URIs, and rarity values


#### Upload Metadata to IPFS
```bash
npm run upload
```
Optional: Upload Metadata to IPFS
bashnpm run upload

Note: This script is included for demonstration purposes only. The metadata has already been uploaded to IPFS and the URIs are stored in backend/assets/collections/metadata_cids.json.


### Frontend Setup
```bash
cd frontend
npm install
```

#### Environment Configuration
Create a `.env` file in the `frontend` directory:

```env
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_RPC_ADDRESS=http://127.0.0.1:8545
VITE_IPFS_BASE_URL=https://emerald-elegant-scorpion-153.mypinata.cloud/ipfs/
```

#### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## 📝 How to Use

### Connect Your Wallet
1. Install the MetaMask browser extension
2. Create or import a wallet
3. Click "Connect Wallet" on the dApp
4. Approve the connection in MetaMask

### Browse NFTs
- View all available NFTs in the marketplace
- See rarity levels (0-100) and corresponding prices
- Check minting status (available/minted)
- Filter by rarity tier: LEGENDARY (98-100), EPIC (85-97), RARE (70-84), UNCOMMON (50-69), COMMON (0-49)
- Search NFTs by name
- Sort by price or rarity score
- View themed collections: Cyberpunk, Nebula, Surrealism

### Mint an NFT
1. Connect your wallet
2. Browse available NFTs
3. Click on an NFT card to view details
4. Review the real-time price calculated via smart contract
5. View traits, description, and metadata
6. Click "Buy Now" button
7. Confirm the transaction in MetaMask
8. Wait for blockchain confirmation
9. Your NFT will appear in your wallet!

### Pricing Formula
The contract uses dynamic pricing based on rarity:

```
price = basePrice × ((1 + rarity/10)²)
```

- Rarity 0: 1.00× base price
- Rarity 50: 1.56× base price  
- Rarity 100: 2.25× base price

**Rarity Tiers:**
- **LEGENDARY** (98-100): Highest rarity, 2.21-2.25× base price
- **EPIC** (85-97): Very rare, 1.82-2.18× base price
- **RARE** (70-84): Rare items, 1.69-1.78× base price
- **UNCOMMON** (50-69): Somewhat uncommon, 1.56-1.66× base price
- **COMMON** (0-49): Most common, 1.00-1.52× base price

## 🎨 NFT Collections
The marketplace features curated digital art collections:

### Cyberpunk Collection
Futuristic characters with neon aesthetics, advanced technology, and urban sci-fi themes.
- Examples: Neon Muse, Neon Oracle, Data Runner, Crimson Seer, Solar Pilot

### Nebula Collection
Cosmic and space-themed artwork featuring celestial bodies and astronomical phenomena.
- Examples: Nature's Gateway, cosmic landscapes

### Surrealism Collection
Dreamlike and abstract compositions with imaginative visual elements.
- Examples: Cloud Anchor, surreal environments


## 🔐 Smart Contract Details

### Contract: `ThematicNFT`

**Key Functions:**
- `mintNFT(uint256 tokenId)` - Mint an NFT by token ID (payable)
- `getAllTokensInfo()` - Get all tokens with metadata, prices, and status
- `withdraw()` - Owner withdraws contract balance
- `setBasePrice(uint256 newBasePrice)` - Owner updates base price

**Security Features:**
- ReentrancyGuard prevents reentrancy attacks
- Automatic refund of excess payment
- Owner-only administrative functions
- Safe token transfers via `_safeMint`

**Events:**
- `NFTMinted(address indexed buyer, uint256 indexed tokenId, uint256 price)`
- `BasePriceUpdated(uint256 oldPrice, uint256 newPrice)`


## 🧪 Testing

### Smart Contract Tests
```bash
cd backend
npx hardhat test
```

### Frontend Tests (will be soon)
```bash
cd frontend
npm run test
```

## 🔧 Configuration

### Hardhat Configuration
The project uses Hardhat with:
- Solidity compiler 0.8.28
- Hardhat Ignition for deployments
- Built-in local network (no external RPC needed for development)
- Sepolia network configuration (requires Infura or other RPC provider)
- Etherscan verification support
- TypeScript support


### Vite Configuration
Frontend is configured with:
- Vue 3 plugin
- TypeScript support
- Path aliases
- Development server optimizations


## 📞 Contact

Julia Korolenko - https://github.com/JuliaKorolenko
Project Link: https://github.com/JuliaKorolenko/nft-marketplace

## ⚠️ Security Disclaimer
This project is created for educational purposes. Before deploying to mainnet:
- Conduct thorough security audits
- Perform extensive testing
- Review gas optimization
- Consider professional smart contract audit services

## 🙏 Acknowledgments
- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contract libraries
- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Ethers.js](https://docs.ethers.org/) - Ethereum library
- [Pinata](https://pinata.cloud/) - IPFS pinning service


## 📊 Contract Statistics
- **Standard**: ERC-721 with URI Storage
- **Optimization**: Dynamic pricing algorithm with quadratic scaling
- **Gas Efficiency**: Optimized storage patterns and batch operations
- **Security**: ReentrancyGuard + Ownable + safe transfers

---

⭐ If you find this project useful, please consider giving it a star on GitHub!