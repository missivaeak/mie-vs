import { Platform, PermissionsAndroid } from "react-native";
import AudioRecorderPlayer, { PlayBackType } from "react-native-audio-recorder-player";
import RNFetchBlob from "react-native-blob-util";

import EnvVars from "../constants/EnvVars";

export default class Player {
  audioRecorderPlayer: AudioRecorderPlayer

  constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer()
  }

  static async play(filename: string, callback?: () => void, injectedAudioRecorderPlayer?: AudioRecorderPlayer) {
    let audioRecorderPlayer: AudioRecorderPlayer

    if (injectedAudioRecorderPlayer) {
      audioRecorderPlayer = injectedAudioRecorderPlayer
    } else {
      audioRecorderPlayer = new AudioRecorderPlayer()
    }

    await audioRecorderPlayer.stopPlayer()

    const path = EnvVars.bareBaseDir + filename
    const uri = await audioRecorderPlayer.startPlayer(path)

    audioRecorderPlayer.removePlayBackListener()

    if (callback) {
      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        if (e.currentPosition === e.duration) {
          callback()
        }
      })
    }

    return uri
  }

  async start(filename: string, callback: () => void) {
    const uri = await Player.play(filename, callback, this.audioRecorderPlayer)

    return uri
  }

  async stop() {
    const result = await this.audioRecorderPlayer.stopPlayer()

    // console.log("stop playing:", result)

    return result
  }
}