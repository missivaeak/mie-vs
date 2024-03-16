import { type PhotoFile } from "react-native-vision-camera";
import RNFetchBlob from 'react-native-blob-util'
import EnvVars from "../constants/EnvVars";

export default class Photographer {
  static async save(photo: PhotoFile) {
    const now = new Date()
    const timestamp = now.getTime().toString()
    const filename = timestamp + '.jpg'

    await RNFetchBlob.fs.cp(
      photo.path,
      EnvVars.baseDir + filename
      )

    return filename
  }
}
