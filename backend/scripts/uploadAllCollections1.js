import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { PinataSDK } from "pinata";
import { PATHS } from '../config/path.js';
import { type } from 'os';

dotenv.config();

const BASE_PRICE = 0.001

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || '',
  pinataGateway: process.env.PINATA_GATEWAY || 'gateway.pinata.cloud',
});

const groupCache = new Map();

// async function getOrCreateGroup(collectionName) {
//   if (groupCache.has(collectionName)) {
//     return groupCache.get(collectionName);
//   }
//   try {
//     const groupsList = await pinata.groups.public.list();
//     const existingGroup = groupsList.groups?.find(group => group.name === collectionName);

//     if (existingGroup) {
//       groupCache.set(collectionName, existingGroup.id);
//       return existingGroup.id;
//     }

//     const newGroup = await pinata.groups.public.create({
//       name: collectionName,
//     });

//     groupCache.set(collectionName, newGroup.id);
//     console.log(`✓ Created new group for collection ${collectionName}:`, newGroup.id);
//     return newGroup.id;

//   } catch (error) {
//     console.error(`✗ Error creating/getting group for collection ${collectionName}:`, error.message);
//     return null;
//   }
// }

function getPrevPrice(rarity) {
  const res = BASE_PRICE * (1 + rarity / 10)**2
  return res.toFixed(2)
}

async function uploadImage(imagePath, collectionName, imageId) {
  // console.log(">> Uploading image:", imagePath, collectionName, imageId);
  try {
    const fileName = path.basename(imagePath);
    const blob = new Blob([fs.readFileSync(imagePath)]);

    const extension = path.extname(imagePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
      throw new Error(`Unsupported file type: ${extension}`);
    }
    const newFileName = `${collectionName}-${imageId}.${extension}`;
    // const groupId = await getOrCreateGroup(collectionName);

    const file = new File([blob], newFileName, {
      type: `image/${path.extname(imagePath).slice(1)}`,
    });

    const upload = await pinata.upload.public.file(file, {
      metadata: {
        name: `${collectionName}-${imageId}-${fileName}`, 
        keyvalues: {
          collection: collectionName,
          itemId: imageId.toString(),
        },
      },
      // ...(groupId && { groupId }),
    });

    const ipfsHash = upload.IpfsHash || upload.ipfsHash || upload.cid;
    if (!ipfsHash) {
      console.error("❌ Upload response:", upload);
      throw new Error("Failed to get IPFS hash");
    }

    const imageUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${ipfsHash}`;
    console.log(`✓ Uploaded image for item ${imageId} in collection ${collectionName}: ${imageUrl}`);
    return {  
      imageUrl,
      ipfsHash
    };

  } catch (error) {
    console.error(`✗ Error uploading image for item ${imageId} in collection ${collectionName}:`, error.message);
  }
}

// async function uploadMetadata(metadata, collectionName, itemId, groupId) {
async function uploadMetadata(metadata, collectionName, itemId) {
  try {
    const metadataFileName = `${collectionName}-${itemId}-metadata.json`;
    const blob = new Blob([JSON.stringify(metadata)]);

    const file = new File([blob], metadataFileName, {
      type: 'application/json',
    });

    const upload = await pinata.upload.public.file(file, {
      metadata: {
        name: `${collectionName}-${itemId}-metadata`,
        keyvalues: {
          collection: collectionName,
          itemId: itemId.toString(),
          type: 'metadata',
        },
      },
      // ...(groupId && { groupId }),
    });

    const ipfsHash = upload.IpfsHash || upload.ipfsHash || upload.cid;
    
    if (!ipfsHash) {
      console.error("Upload response:", upload);
      throw new Error("Failed to get IPFS hash");
    }

    const metadataUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${ipfsHash}`;
    console.log(`✓ Uploaded metadata for item ${itemId} in collection ${collectionName}: ${metadataUrl}`);
    return {
      metadataUrl,
      ipfsHash
    };

  } catch (error) {
    console.error(`✗ Error uploading metadata for item ${itemId} in collection ${collectionName}:`, error.message);
  }
}

async function processCollection(collectionPath) {
  const collectionName = path.basename(collectionPath);
  // console.log("✔ Successfully processed collection:", collectionName);

  // Читаем data.json
  const dataPath = path.join(collectionPath, 'data.json');
  if (!fs.existsSync(dataPath)) {
    console.error(`✗ data.json not found in ${collectionName}`);
    return null;
  }

  const metadata = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const imagesDir = path.join(collectionPath, 'images');
  if (!fs.existsSync(imagesDir)) {
    console.error(`✗ images folder not found in ${collectionName}`);
    return null;
  }

  const imageFiles = fs.readdirSync(imagesDir).filter((file) => {
    return /\.(jpg|jpeg|png|gif)$/.test(file);
  });

  // console.log(">>> metadata", metadata.length);

  const updatedData = [];

  for(let i = 0; i < metadata.length; i++) {
    const item = metadata[i];
    const imageFile = imageFiles[i];
    if (!imageFile) {
      console.warn(`⚠ No image found for item ${item.id}`);
      updatedData.push(item);
      continue;
    }
    
    const imagePath = path.join(imagesDir, imageFile);
    // console.log(">>>> i", imagePath);

    try {
      const imageData = await uploadImage(imagePath, collectionName, item.id);

      if(imageData) {
      // Добавляем данные об изображении в метаданные
      const nftMetadata = {
        name: item.name,
        collection: collectionName,
        description: item.description,
        image: `ipfs://${imageData.ipfsHash}`,
        external_url: imageData.imageUrl,
        attributes: item.attributes || [],
      };

      const metadataData = await uploadMetadata(nftMetadata, collectionName, item.id);

      // const updatedItem = {
      //   ...item,
      //   image: imageData.imageUrl,
      //   imageIpfsHash: imageData.ipfsHash,
      //   imageUrl: `ipfs://${imageData.ipfsHash}`,
      //   metadataUrl: metadataData ? metadataData.metadataUrl : null,
      //   metadataIpfsHash: metadataData ? metadataData.ipfsHash : null,
      //   imageFileName: imageFile,
      // };

      const updatedItem = {
        ...item,
        image: imageData.imageUrl,
        imageIpfsHash: imageData.ipfsHash,
        imageUri: `ipfs://${imageData.ipfsHash}`,
        metadata: metadataData.metadataUrl,
        metadataIpfsHash: metadataData.ipfsHash,
        metadataUri: `ipfs://${metadataData.ipfsHash}`,
        imageFileName: imageFile,
      };

      updatedData.push(updatedItem);

    } else {  
      updatedData.push(item); // Если загрузка не удалась, сохраняем оригинальный элемент
    }

      // Небольшая задержка между загрузками
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`✗ Error processing item ${item.id} in collection ${collectionName}:`, error.message);
      updatedData.push(item); // Добавляем оригинальный элемент без изменений
    }    
  }

  return {
    collection: collectionName,
    items: updatedData,
  };

}

async function uploadCollections() {
  const collectionsDir = PATHS.collections;
  console.log(">>>> collectionsDir:", collectionsDir);

  if (!fs.existsSync(collectionsDir)) {
    console.error("✗ collections folder not found!");
    return;
  }

  const collectionFolders = fs.readdirSync(collectionsDir).filter((file) => {
    const folderPath = path.join(collectionsDir, file);
    return fs.statSync(folderPath).isDirectory();
  });

  const results = {};

  for (const folder of collectionFolders) {
    const folderPath = path.join(collectionsDir, folder);
    console.log("Found collection folder:", folder);
    const res = await processCollection(folderPath);
    // results[folder] = res;

    if (res) {
      results[folder] = res;

      // Сохраняем обновленный data.json
      // const outputDataPath = path.join(folderPath, 'data_updated.json');
      // fs.writeFileSync(outputDataPath, JSON.stringify(res.items, null, 2));
      // console.log(`✓ Updated data.json saved for collection ${folder} at ${outputDataPath}`);
    }
  }

  // Сохраняем общий файл со всеми коллекциями
  // const allCollectionsPath = path.join(collectionsDir, 'all_collections.json');
  // fs.writeFileSync(allCollectionsPath, JSON.stringify(results, null, 2));
  // console.log(`✓ All collections data saved at ${allCollectionsPath}`);

   // Создаем плоский массив всех NFT с уникальными tokenId
  const flatNftList = [];
  let globalTokenId = 0;

  Object.entries(results).forEach(([collectionName, collectionData]) => {
    collectionData.items.forEach((item) => {
      const curRarity = item.attributes.find(el => el.trait_type==='Rarity Score').value;
      const curPrice = getPrevPrice(curRarity);
      globalTokenId++;

      flatNftList.push({
        tokenId: globalTokenId,
        // collectionId: item.id,
        collection: collectionName,
        preview_price: curPrice,
        ...item,
      });
      
    });
  });

  // const flatNftListPath = path.join(collectionsDir, 'flat_nft_list.json');
  // fs.writeFileSync(flatNftListPath, JSON.stringify(flatNftList, null, 2));
  // console.log(`✓ Flat NFT list saved at ${flatNftListPath}`);
}

// async function testUpload() {
//   const groupsList = await pinata.groups.public.list();
//   console.log(">>>> Groups List:", groupsList);
// }

uploadCollections().catch((error) => {
  console.error("Error uploading collections:", error);
});

// testUpload().catch((error) => {
//   console.error("Error in test upload:", error);
// });
