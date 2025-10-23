<script setup lang="ts">
import { onMounted } from 'vue';
    const nfts = [
        { id: 1, name: "Cosmic Dreamer #142", collection: "Cosmic Dreams", price: 2.5, likes: 234, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop", status: "On Sale" },
        { id: 2, name: "Abstract Mind #89", collection: "Abstract Minds", price: 1.8, likes: 189, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", status: "On Sale" },
        { id: 3, name: "Neon City #456", collection: "Neon Cities", price: 3.2, likes: 567, image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop", status: "Hot" },
        { id: 4, name: "Digital Sunset #23", collection: "Digital Skies", price: 1.5, likes: 145, image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop", status: "On Sale" },
        { id: 5, name: "Cyber Punk #78", collection: "Cyber World", price: 4.1, likes: 892, image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=400&fit=crop", status: "Hot" },
        { id: 6, name: "Galaxy Explorer #991", collection: "Space Odyssey", price: 2.9, likes: 423, image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400&h=400&fit=crop", status: "On Sale" },
        { id: 7, name: "Ethereal Being #334", collection: "Ethereal Collection", price: 5.5, likes: 1024, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop&sat=-100", status: "Hot" },
        { id: 8, name: "Pixel Dreams #127", collection: "Pixel Art", price: 0.9, likes: 67, image: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&h=400&fit=crop", status: "On Sale" },
    ];

      onMounted(() => {
                      // Render NFT cards
      // const nftGrid = document.getElementById('nftGrid');
      // nfts.forEach(nft => {
      //     const card = document.createElement('div');
      //     card.className = 'nft-card';
      //     card.innerHTML = `
      //         <div class="nft-image-container">
      //             <img src="${nft.image}" alt="${nft.name}" class="nft-image">
      //             <div class="nft-badge">${nft.status}</div>
      //         </div>
      //         <div class="nft-content">
      //             <div class="nft-header">
      //                 <div>
      //                     <div class="nft-title">${nft.name}</div>
      //                     <div class="nft-collection">${nft.collection}</div>
      //                 </div>
      //                 <div class="nft-likes">❤️ ${nft.likes}</div>
      //             </div>
      //             <div class="nft-price-section">
      //                 <div>
      //                     <div class="price-label">Current Price</div>
      //                     <div class="price-value">
      //                         <svg class="eth-icon" viewBox="0 0 24 24" fill="currentColor">
      //                             <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
      //                         </svg>
      //                         ${nft.price} ETH
      //                     </div>
      //                 </div>
      //             </div>
      //             <button class="buy-btn" onclick="buyNFT(${nft.id})">Buy Now</button>
      //         </div>
      //     `;
      //     nftGrid?.appendChild(card);
      //   });

                // Wallet connection
        const walletBtn = document.getElementById('walletBtn') as HTMLButtonElement | null;
        let isConnected = false;


      });
</script>

<template>
  <nav class="navbar">
    <div class="logo">NFT·MARKET</div>
    <ul class="nav-links">
        <li><a href="#explore">Explore</a></li>
        <li><a href="#collections">Collections</a></li>
        <li><a href="#create">Create</a></li>
        <li><a href="#profile">Profile</a></li>
    </ul>
    <button class="wallet-btn" id="walletBtn">Connect Wallet</button>
  </nav>

  <!-- Hero Stats -->
  <div class="hero-stats">
      <div class="stat-card">
          <div class="stat-label">Total Volume</div>
          <div class="stat-value">124.8K ETH</div>
      </div>
      <div class="stat-card">
          <div class="stat-label">Floor Price</div>
          <div class="stat-value">2.45 ETH</div>
      </div>
      <div class="stat-card">
          <div class="stat-label">24h Sales</div>
          <div class="stat-value">1,234</div>
      </div>
      <div class="stat-card">
          <div class="stat-label">Total Owners</div>
          <div class="stat-value">8.9K</div>
      </div>
  </div>

  <!-- Filters -->
  <div class="filters-section">
      <div class="filters-container">
          <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Search NFTs, collections, or creators...">
          </div>
          <div class="filter-group">
              <button class="filter-btn active">All</button>
              <button class="filter-btn">Art</button>
              <button class="filter-btn">Gaming</button>
              <button class="filter-btn">Music</button>
              <button class="filter-btn">Photography</button>
          </div>
          <div class="filter-group">
              <button class="filter-btn">Price: Low to High</button>
              <button class="filter-btn">Recently Listed</button>
          </div>
      </div>
  </div>

  <!-- NFT Grid -->
  <div class="nft-grid" id="nftGrid">
      <!-- NFT cards will be generated by JS -->
  </div>

  <!-- Activity Sidebar -->
  <div class="activity-sidebar" id="activitySidebar">
      <div class="activity-title">🔥 Live Activity</div>
      <div id="activityFeed"></div>
  </div>

  <button class="toggle-activity" id="toggleActivity">📊</button>

  <!-- Footer -->
  <footer class="footer">
      <p>© 2025 NFT Marketplace. Built with ❤️ for Web3</p>
  </footer>
</template>

<style scoped>


      /* Navbar */
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
          content: '';
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

      /* Hero Stats */
      .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding: 40px 60px;
          margin-bottom: 20px;
      }

      .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s;
      }

      .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(102, 126, 234, 0.5);
      }

      .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 8px;
      }

      .stat-value {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
      }

      /* Filters */
      .filters-section {
          padding: 0 60px 30px;
      }

      .filters-container {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
      }

      .search-box {
          flex: 1;
          min-width: 300px;
          position: relative;
      }

      .search-box input {
          width: 100%;
          padding: 14px 20px 14px 45px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: white;
          font-size: 15px;
          transition: all 0.3s;
      }

      .search-box input:focus {
          outline: none;
          border-color: rgba(102, 126, 234, 0.5);
          background: rgba(255, 255, 255, 0.1);
      }

      .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
      }

      .filter-group {
          display: flex;
          gap: 12px;
      }

      .filter-btn {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
      }

      .filter-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(102, 126, 234, 0.5);
      }

      .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: white;
      }

      /* NFT Grid */
      .nft-grid {
          padding: 20px 60px 60px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
      }

      .nft-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
      }

      .nft-card:hover {
          transform: translateY(-10px);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
      }

      .nft-image-container {
          position: relative;
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
      }

      .nft-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
      }

      .nft-card:hover .nft-image {
          transform: scale(1.1);
      }

      .nft-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #4ade80;
      }

      .nft-content {
          padding: 20px;
      }

      .nft-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
      }

      .nft-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
      }

      .nft-collection {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
      }

      .nft-likes {
          display: flex;
          align-items: center;
          gap: 4px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
      }

      .nft-price-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
      }

      .price-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
      }

      .price-value {
          font-size: 20px;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          gap: 6px;
      }

      .eth-icon {
          width: 16px;
          height: 16px;
      }

      .buy-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
      }

      .buy-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      }

      /* Footer */
      .footer {
          background: rgba(255, 255, 255, 0.03);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 40px 60px;
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
      }

      /* Live Activity Feed */
      .activity-sidebar {
          position: fixed;
          right: 0;
          top: 80px;
          width: 320px;
          height: calc(100vh - 80px);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s;
      }

      .activity-sidebar.show {
          transform: translateX(0);
      }

      .activity-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
      }

      .activity-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin-bottom: 12px;
          align-items: center;
      }

      .activity-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .activity-details {
          flex: 1;
      }

      .activity-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4px;
      }

      .activity-time {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
      }

      .toggle-activity {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s;
          z-index: 1000;
      }

      .toggle-activity:hover {
          transform: scale(1.1);
      }
</style>
