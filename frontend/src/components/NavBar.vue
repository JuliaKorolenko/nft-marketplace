<script setup lang="ts">
import { useWallet } from '@/composables/useWallet';

const { isConnected, getCurAddress, chainId, connect, disconnect } = useWallet();

const handleConnect = async () => {
  try {
    if (isConnected.value) {
      disconnect()
      return
    }
    await connect()
  } catch (err) {
    console.error(err)
  }
}

</script>
<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <div class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <span class="logo-text">NFT Marketplace</span>
      </div>

      <div class="wallet-info">
        <div class="wallet-item" v-if="!isConnected">
          <div
            :class="['status-dot', isConnected ? 'status-connected' : 'status-disconnected']"
          >
        </div>
          <span class="not-connected-text">Not connected</span>
        </div>
        <template v-else>
          <div class="wallet-item">
            <span class="wallet-label">Wallet</span>
            <span class="wallet-value wallet-address">{{ getCurAddress }}</span>
            <div class="divider"></div>
          </div>
          <div class="wallet-item">
            <span class="wallet-label">Network:</span>
            <span class="wallet-value wallet-network">{{ chainId }}</span>
          </div>
          <div class="status-dot status-connected"></div>
        </template>
      </div>


      <button
        id="connectBtn"
        class="connect-btn disconnected"
         @click="handleConnect"
      >
        {{ isConnected ? 'Disconnect Wallet' : 'Connect Wallet' }}
      </button>
    </div>
  </header>
</template>
<style scoped>
  .header {
    background: linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%);
    border-bottom: 1px solid #475569;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .header-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-icon {
    background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: bold;
    background: linear-gradient(90deg, #60a5fa, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .wallet-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #475569;
  }

  .wallet-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .wallet-label {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 500;
  }

  .wallet-value {
    font-size: 0.875rem;
    font-family: 'Courier New', monospace;
    font-weight: 600;
  }

  .wallet-address {
    color: #60a5fa;
  }

  .wallet-network {
    color: #c084fc;
  }

  .divider {
    width: 1px;
    height: 1rem;
    background: #475569;
  }

  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }

  .status-connected {
    background: #22c55e;
    animation: pulse 2s infinite;
  }

  .status-disconnected {
    background: #64748b;
  }

  .not-connected-text {
    font-size: 0.875rem;
    color: #94a3b8;
    font-weight: 500;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .connect-btn {
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .connect-btn.connected {
    background: #475569;
    color: #cbd5e1;
    border: 1px solid #64748b;
  }

  .connect-btn.connected:hover {
    background: #64748b;
  }

  .connect-btn.disconnected {
    background: linear-gradient(90deg, #3b82f6, #9333ea);
    color: white;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }

  .connect-btn.disconnected:hover {
    background: linear-gradient(90deg, #2563eb, #7c3aed);
  }  
</style>
