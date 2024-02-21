import { Platform, PermissionsAndroid } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFetchBlob from "react-native-blob-util";
// import { Recorder } from '@react-native-community/audio-toolkit'

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

  async start(filename: string) {
    const dirs = RNFetchBlob.fs.dirs
    const path = Platform.select({
      ios: `${filename}.m4a`,
      android: `${dirs.CacheDir}/${filename}.mp4`
    })
    const uri = await (await this.audioRecorderPlayer).startRecorder(path)

    console.log("start recording:", uri)
    console.log(await RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir))

    return uri
  }

  async stop() {
    const result = await (await this.audioRecorderPlayer).stopRecorder()

    console.log("stop recording:", result)
    console.log(await RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir))

    return result
  }
}