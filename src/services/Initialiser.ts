import Database from "./Database"
import RNFetchBlob from 'react-native-blob-util'

import EnvVars from "../constants/EnvVars"
// import RNFS from 'react-native-fs'
// import images from '../assets/index'

// default images
const pictures = [
  'house.png',
  'city.png',
  'hotel.png',
  'school.png',
  'shop.png',
]

export default class Initialiser {
  static async run(db: Database) {
    for (let i = 0; i < pictures.length; i++) {
      const base64 = await RNFetchBlob.fs.readFile(
        `bundle-assets://${pictures[i]}`, 'base64'
        )
      await RNFetchBlob.fs.writeFile(EnvVars.bareBaseDir + pictures[i], base64, 'base64')
      await db.insertPicture(pictures[i], 'png')
    }

    await db.setStartingPointPicture(1)
    await db.setSetting("first_run", "false")
  }
}