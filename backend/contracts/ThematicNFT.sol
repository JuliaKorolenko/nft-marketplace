// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ThematicNFT  is ERC721URIStorage, Ownable, ReentrancyGuard  {
  // uint256 public basePrice = 0.01 ether;
  uint256 public basePrice;
  uint256 private constant SCALE = 1000;

  // Счетчик заминченных токенов
  uint256 public totalMinted;

  // Массив всех доступных tokenIds
  uint256[] public _allTokenIds;

  // Маппинг tokenId → существует ли в коллекции
  mapping(uint256 => bool) public tokenExists;
  // Маппинг tokenId → уже заминчен или нет
  mapping(uint256 => bool) public minted;
  mapping(uint256 => uint256) public rarityMap; // tokenId → rarity
  mapping(uint256 => string) private _tokenURIsMap; // tokenId → URI

  event NFTMinted(address indexed buyer, uint256 indexed tokenId, uint256 price);
  event BasePriceUpdated(uint256 oldPrice, uint256 newPrice);

  constructor(
    address initialAccount,
    uint256 _basePrice,
    uint256[] memory tokenIds,
    string[] memory uris,
    uint256[] memory rarities

  ) ERC721URIStorage() ERC721('ThematicNFT', 'TNFT') Ownable(initialAccount) {
      require(_basePrice > 0, "Base price must be greater than 0");
      require(tokenIds.length > 0, "Must have at least one token");
      require(
        tokenIds.length == uris.length && tokenIds.length == rarities.length,
        "Arrays must be same length"
      );

      basePrice = _basePrice;
      _allTokenIds = tokenIds;

    // initialize token data (caller is owner at this point)
    _setTokensData(tokenIds, uris, rarities);
  }

  function _getPrice(uint256 rarity) view internal returns (uint256) {
    uint256 scaled = SCALE + (rarity * SCALE / 10);
    uint256 squared = scaled * scaled;
    uint256 price = basePrice * squared / (SCALE * SCALE);
    return price;
  }

  function _setTokensData(
    uint256[] memory tokenIds,
    string[] memory uris,
    uint256[] memory rarities
  ) internal {
    for(uint256 i=0; i<tokenIds.length; i++) {
      require(!tokenExists[tokenIds[i]], "Duplicate token ID");
      require(bytes(uris[i]).length > 0, "URI cannot be empty");
      require(rarities[i] <= 100, "Rarity must be between 0 and 10");
      
      tokenExists[tokenIds[i]] = true;
      rarityMap[tokenIds[i]] = rarities[i];
      _tokenURIsMap[tokenIds[i]] = uris[i];
    }
  }

  function mintNFT(uint256 tokenId) public payable nonReentrant returns (uint256) {
    require(tokenExists[tokenId], "Token ID does not exist in collection");
    require(!minted[tokenId], "Token already minted");
    require(totalMinted < _allTokenIds.length, "All tokens have been minted");

    uint256 tokenRarity = rarityMap[tokenId];
    uint256 price = _getPrice(tokenRarity);

    require(msg.value >= price, "Insufficient payment");

    // Минтим токен покупателю
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, _tokenURIsMap[tokenId]);

    minted[tokenId] = true;
    totalMinted++;

    // Refund excess payment
    uint256 excess = msg.value - price;
    if (excess > 0) {
      (bool success, ) = payable(msg.sender).call{value: excess}("");
      require(success, "Refund failed");
    }
    emit NFTMinted(msg.sender, tokenId, price);

    return tokenId;
  }


  function getAllTokensInfo() 
    public 
    view 
    returns (
        uint256[] memory tokenIds,
        string[] memory uris,
        uint256[] memory rarities,
        uint256[] memory prices,
        bool[] memory mintedStatuses
    ) 
  {
      uint256 length = _allTokenIds.length;

      tokenIds = new uint256[](length);
      uris = new string[](length);
      rarities = new uint256[](length);
      prices = new uint256[](length);
      mintedStatuses = new bool[](length);

      for (uint256 i = 0; i < length; i++) {
          uint256 id = _allTokenIds[i];

          tokenIds[i] = id;
          uris[i] = _tokenURIsMap[id];
          rarities[i] = rarityMap[id];
          prices[i] = _getPrice(rarityMap[id]);
          mintedStatuses[i] = minted[id];
      }
  }

  /**
  * @dev Owner can withdraw funds
  */
  function withdraw() public onlyOwner nonReentrant {
    uint256 balance = address(this).balance;
    require(balance > 0, "No funds to withdraw");
    (bool success, ) = payable(owner()).call{value: balance}("");
    require(success, "Withdrawal failed");
  }

  /**
  * @dev Owner can update the base price
  */
  function setBasePrice(uint256 newBasePrice) public onlyOwner {
    uint256 old = basePrice;
    basePrice = newBasePrice;
    emit BasePriceUpdated(old, newBasePrice);
  }

  receive() external payable {
    revert("Use mintNFT(tokenId) function");
  }

  fallback() external payable {
    revert("Use mintNFT(tokenId) function");
  }
}