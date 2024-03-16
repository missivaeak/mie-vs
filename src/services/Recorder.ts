import { Platform, PermissionsAndroid } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFetchBlob from "react-native-blob-util";
// import { Recorder } from '@react-native-community/audio-toolkit'

import EnvVars from "../constants/EnvVars";

export default class {
  audioRecorderPlayer: Promise<AudioRecorderPlayer>

  constructor() {
    this.audioRecorderPlayer = this.permit().then(() => {
      return new AudioRecorderPlayer()
    })
  }

  async androidPermissions() {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }

  private async permit() {
    if (Platform.OS === 'android') {
      await this.androidPermissions()
    }
  }

  async start() {
    const now = new Date()
    const timestamp = now.getTime().toString()
    // const dirs = RNFetchBlob.fs.dirs
    let filename = Platform.select({
      ios: `${timestamp}.m4a`,
      android: `${timestamp}.mp4`
    })
    await (await this.audioRecorderPlayer).startRecorder(EnvVars.bareBaseDir + filename)

    // console.log("start recording:", uri)
    // console.log(await RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir))

    return filename ?? ''
  }

  async stop() {
    const result = await (await this.audioRecorderPlayer).stopRecorder()

    // console.log("stop recording:", result)
    // console.log(await RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir))

    return result
  }
}