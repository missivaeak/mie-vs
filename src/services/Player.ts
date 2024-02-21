import { Platform, PermissionsAndroid } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFetchBlob from "react-native-blob-util";

export default class Player {
  audioRecorderPlayer: AudioRecorderPlayer

  constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer()
  }

  static async play(filename: string, injectedAudioRecorderPlayer?: AudioRecorderPlayer) {
    let audioRecorderPlayer: AudioRecorderPlayer

    if (injectedAudioRecorderPlayer) {
      audioRecorderPlayer = injectedAudioRecorderPlayer
    } else {
      audioRecorderPlayer = new AudioRecorderPlayer()
    }

    const dirs = RNFetchBlob.fs.dirs
    const path = Platform.select({
      ios: `${filename}.m4a`,
      android: `${dirs.CacheDir}/${filename}.mp4`
    })
    const uri = await audioRecorderPlayer.startPlayer(path)

    console.log("start playing:", uri)

    return uri
  }

  async start(filename: string) {
    const uri = await Player.play(filename, this.audioRecorderPlayer)

    return uri
  }

  async stop() {
    const result = await this.audioRecorderPlayer.stopPlayer()

    console.log("stop recording:", result)

    return result
  }
}