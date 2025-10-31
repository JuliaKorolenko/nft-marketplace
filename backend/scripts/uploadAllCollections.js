// import axios from 'axios';
// import FormData from 'form-data';
// import { createReadStream, readdirSync, existsSync } from 'fs';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { PinataSDK } from "pinata";
import { PATHS } from '../config/path.js';

dotenv.config();

// console.log("📍 Looking for collections at:", process.env.PINATA_GATEWAY, process.env.PINATA_JWT);
// console.log("Exists?", fs.existsSync(PATHS.collections));


const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || '',
  pinataGateway: process.env.PINATA_GATEWAY || 'gateway.pinata.cloud',
});

async function uploadImage(imagePath, collectionName, imageId) {
  console.log(">> Uploading image:", imagePath, collectionName, imageId);
  try {
    // const fileBuffer = fs.createReadStream(imagePath);
    const fileName = path.basename(imagePath);
    const blob = new Blob([fs.readFileSync(imagePath)]);
      // const testFile = new File([blob], 'test_img', {
      //   type: 'image/jpeg',
      // });

    // const blob = new Blob([fileBuffer], {
    //   type: `image/${path.extname(imagePath).slice(1)}`,
    // });

    const file = new File([blob], fileName, {
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
      // groupId: collectionName,
    });

    const imageUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`
    console.log(`✓ Uploaded image for item ${imageId} in collection ${collectionName}: ${imageUrl}`);
    return {  
      imageUrl,
      ipfsHash: upload.IpfsHash
    };

  } catch (error) {
    console.error(`✗ Error uploading image for item ${imageId} in collection ${collectionName}:`, error.message);
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
        const updatedItem = {
         ...item,
          image: imageData.imageUrl,
          ipfsHash: imageData.ipfsHash,
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
      const outputDataPath = path.join(folderPath, 'data_updated.json');
      fs.writeFileSync(outputDataPath, JSON.stringify(res.items, null, 2));
      console.log(`✓ Updated data.json saved for collection ${folder} at ${outputDataPath}`);
    }
  }

  // Сохраняем общий файл со всеми коллекциями
  const allCollectionsPath = path.join(collectionsDir, 'all_collections.json');
  fs.writeFileSync(allCollectionsPath, JSON.stringify(results, null, 2));
  console.log(`✓ All collections data saved at ${allCollectionsPath}`);
}

async function testUpload() {
  const testPath = 'D:/blockchain/NFT-marketplace/backend/assets/collections/cyberpunk/images/2.jpg'; // создайте тестовое изображение
  const fileBuffer = fs.createReadStream(testPath);
  const fileName = path.basename(testPath);

  const blob = new Blob([fs.readFileSync(testPath)]);
  const testFile = new File([blob], 'test_img', {
    type: 'image/jpeg',
  });


  try {
    // const blob = new Blob([fileBuffer], {
    //   type: `image/${path.extname(testPath).slice(1)}`,
    // });

    // const file = new File([blob], fileName, {
    //   type: blob.type,
    // });
    const upload = await pinata.upload.public.file(testFile);

    console.log('Test upload:', upload);
    console.log('URL:', `https://${process.env.PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`);
  } catch (error) {
    console.error('Test error:', error);
  }
}

uploadCollections().catch((error) => {
  console.error("Error uploading collections:", error);
});

// testUpload().catch((error) => {
//   console.error("Error in test upload:", error);
// });

