<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { connectMetaMask, getBalance, subscribeToAccountChanges } from '@/wallet';
import { useWallet } from '@/composables/useWallet';
import { useContract} from '@/composables/useContract';

const { isConnected, account, connect } = useWallet();
const { isContractReady, initContract, test } = useContract();
// const contractApi = useContract();

// const { 
//     getCurItemPrice, 
//     initContract 
// } = contractApi;

// const boundGetCurItemPrice = getCurItemPrice.bind(contractApi);
// const boundInitContract = initContract.bind(contractApi);

const realPrice = ref<number | null>(null)

// getCurItemPrice()

// const handleConnect = async () => {
//   try {
//     await connect();
//   } catch (error) {
//     console.error('Error connecting wallet:', error);
//   }
// };
const handleConnect = async () => {
  try {
    await connect()
    await initContract()
    await test()
  } catch (err) {
    console.error(err)
  }
}

// const handleGetPrice = async () => {
//   try {
//     await getCurItemPrice(78)
//   } catch (error) {
//     console.error(error)
//   }
// }

</script>
<template>
  <nav class="navbar">
    <div class="logo">NFT·MARKET     
      <!-- <button @click="handleGetPrice">Click</button> -->
    </div>
     {{ isContractReady }}
    <ul class="nav-links">
        <li><a href="#explore">Explore</a></li>
        <li><a href="#collections">Collections</a></li>
        <li><a href="#create">Create</a></li>
        <li><a href="#profile">Profile</a></li>
    </ul>
    <button class="wallet-btn" @click="handleConnect">Connect Wallet</button>
  </nav>
</template>
<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 60px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    gap: 40px;
    list-style: none;
  }

  .nav-links a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
    position: relative;
  }

  .nav-links a:hover {
    color: #fff;
  }

  .nav-links a::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .wallet-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  .wallet-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  .wallet-btn.connected {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(102, 126, 234, 0.5);
  }
</style>
