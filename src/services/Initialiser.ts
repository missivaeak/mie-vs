import Database from "./Database"
import RNFetchBlob from 'react-native-blob-util'

import EnvVars from "../constants/EnvVars"
// import RNFS from 'react-native-fs'
// import images from '../assets/index'

// default images
const images = [
  'city.png',
  'hotel.png',
  'house.png',
  'school.png',
  'shop.png',
]

export default class Initialiser {
  static async run(db: Database) {
    for (let i = 0; i < images.length; i++) {
      const base64 = await RNFetchBlob.fs.readFile(
        `bundle-assets://${images[i]}`, 'base64'
        )
      await RNFetchBlob.fs.writeFile(EnvVars.bareBaseDir + images[i], base64, 'base64')
      await db.saveImage(images[i], 'png')
    }

    console.log("1")

    // await RNFetchBlob.fs.ls(cacheDir)
    //     // files will an array contains filenames
    //     .then((files) => {
    //         console.log(files)
    //     })
    await db.setStartingPointImage(3)
    
    
    console.log("2")

    await db.setSetting("first_run", "false")

    
    console.log("3")
  }
}