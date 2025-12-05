// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ThematicNFT  is ERC721URIStorage, Ownable {
  // uint256 public basePrice = 0.01 ether;
  uint256 public basePrice;
  uint256 private constant SCALE = 1000;
  // Базовый URI для метаданных
  string private _baseTokenURI;

  // Счетчик заминченных токенов
  uint256 public totalSupply;

  // Массив всех доступных tokenIds
  uint256[] public _allTokenIds;

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
      basePrice = _basePrice;
      _allTokenIds = tokenIds;

    // initialize token data (caller is owner at this point)
    _setTokensData(tokenIds, uris, rarities);

    // transfer ownership if an initialAccount is provided
    if (initialAccount != address(0)) {
      transferOwnership(initialAccount);
    }
  }

  function getPrice(uint256 rarity) public view returns (uint256) {
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
    require(
      tokenIds.length == rarities.length &&
      uris.length == rarities.length,
      "Arrays must be same length"
    );

    for(uint256 i=0; i<tokenIds.length; i++) {
      rarityMap[tokenIds[i]] = rarities[i];
      _tokenURIsMap[tokenIds[i]] = uris[i];
    }
  }

  function getTokenData(uint256 tokenId) public view returns (string memory, uint256 tokenRarity) {
    return (_tokenURIsMap[tokenId], rarityMap[tokenId]);
  }

  function mintNFT(uint256 tokenId) public payable returns (uint256) {
    require(!minted[tokenId], "Token already minted");
    require(bytes(_tokenURIsMap[tokenId]).length > 0, "Token ID does not exist");
    require(totalSupply < _allTokenIds.length, "All tokens have been minted");

    uint256 tokenRarity = rarityMap[tokenId];
    uint256 price = getPrice(tokenRarity);

    require(msg.value >= price, "Insufficient payment");

    // Минтим токен покупателю
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, _tokenURIsMap[tokenId]);

    minted[tokenId] = true;
    totalSupply++;

    // Refund excess payment
    if (msg.value > price) {
      payable(msg.sender).transfer(msg.value - price);
    }

    emit NFTMinted(msg.sender, tokenId, price);

    return tokenId;
  }

  /**
  * @dev Get all tokens available for Minting
  */

  // function getAvialablesTokens() public view returns (uint256[] memory) {
  //   uint256 availableCount = _allTokenIds.length - totalSupply;
  //   uint256[] memory available = new uint256[](availableCount);
  //   uint256 index = 0;

  //   for (uint256 i = 0; i < _allTokenIds.length && i < availableCount; i++) {
  //     uint256 tokenId = _allTokenIds[i];

  //     if (!minted[tokenId]) {
  //       available[index] = tokenId;
  //       index++;
  //     }    }

  //   return available;
  // }

  function getAvailableTokens() public view returns (uint256[] memory) {
    uint256 availableCount = 0;

    // Считаем, сколько доступных токенов
    for (uint256 i = 0; i < _allTokenIds.length; i++) {
        if (!minted[_allTokenIds[i]]) {
            availableCount++;
        }
    }

    uint256[] memory available = new uint256[](availableCount);
    uint256 index = 0;

    // Заполняем массив только доступными токенами
    for (uint256 i = 0; i < _allTokenIds.length; i++) {
        uint256 tokenId = _allTokenIds[i];
        if (!minted[tokenId]) {
            available[index] = tokenId;
            index++;
        }
    }

    return available;
  }

  function getAllTokenIds() public view returns (uint256[] memory) {
    return _allTokenIds;
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
          prices[i] = getPrice(rarityMap[id]);
          mintedStatuses[i] = minted[id];
      }
  }

  function getMintedTokens() public view returns (uint256[] memory) {
    uint256 count = totalSupply;
    uint256[] memory result = new uint256[](count);
    uint256 index = 0;

    for (uint256 i = 0; i < _allTokenIds.length; i++) {
        uint256 id = _allTokenIds[i];
        if (minted[id]) {
            result[index] = id;
            index++;
        }
    }
    return result;
  }

  /**
  * @dev Get the total number of tokens in the collection
  */
  function maxSupply() public view returns (uint256) {
    return _allTokenIds.length;
  }

  /**
  * @dev Owner can withdraw funds
  */
  function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, "No funds to withdraw");
    payable(owner()).transfer(balance);
  }

  /**
  * @dev Owner can update the base price
  */
  function setBasePrice(uint256 newBasePrice) public onlyOwner {
    uint256 old = basePrice;
    basePrice = newBasePrice;
    emit BasePriceUpdated(old, newBasePrice);
  }

  /**
  * @dev Get token information: URI, rarity, price, minted status
  */
  function getTokenInfo(uint256 tokenId) public view returns (
    string memory uri,
    uint256 rarity,
    uint256 price,
    bool isMinted
  ) {
    uri = _tokenURIsMap[tokenId];
    rarity = rarityMap[tokenId];
    price = getPrice(rarity);
    isMinted = minted[tokenId];
  }

  function isTokenMinted(uint256 tokenId) public view returns (bool) {
    return minted[tokenId];
  }


  receive() external payable {
    revert("Use mintNFT(tokenId) function");
  }

  fallback() external payable {
    revert("Use mintNFT(tokenId) function");
  }
}