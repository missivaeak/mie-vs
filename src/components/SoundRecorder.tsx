import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type CustomButtonType from "../types/CustomButtonType"
import type Sound from "../classes/references/Sound"

import Recorder from "../services/Recorder"
import Player from "../services/Player"
import GlobalContext from "../contexts/GlobalContext"

function CustomButton({onPress, icon, style}: CustomButtonType<void>) {
  return (<>
    <Pressable
      style={({pressed}) => [
        pressed ? styles.pressed : {},
        styles.button
      ]}
      onPress={onPress}
      >
      <MaterialCommunityIcon
        style={style}
        name={icon}
        />
    </Pressable>
  </>)
}

export default function SoundRecorder(
  {saveSound}: {saveSound: (sound: Sound) => void}
) {
  let timer: NodeJS.Timeout
  let recorder: Recorder

  const [ step, setStep ] = useState("ready")
  const filename = useRef('')
  const {globalState, setGlobalState} = useContext(GlobalContext)

  useEffect(() => {
    recorder = new Recorder()
  }, [])

  const record = useCallback(async () => {
    setStep('recording')

    timer = enqueueStep('reviewing', 5000, () => {
      recorder.stop()
      clearTimeout(timer)
    })

    filename.current = await recorder.start()
  }, [])

  const stop = useCallback(() => {
    clearTimeout(timer)
    setStep('reviewing')

    recorder.stop()
  }, [])

  const play = useCallback(() => {
    setStep('listening')

    timer = enqueueStep('reviewing', 5000, () => {
      recorder.stop()
      clearTimeout(timer)
    })

    Player.play(filename.current, () => {
      setStep('reviewing')
    })
  }, [])

  const confirm = useCallback(async () => {
    if (!globalState.database) { return }

    // TODO: somewhere the app needs to clear
    // unwanted sounds if the users cancels instead of confirms

    const sound = await globalState.database.insertSound(filename.current)

    saveSound(sound)
  }, [])

  const enqueueStep = useCallback((
    nextStep: "ready" | "recording" | "reviewing" | "listening",
    delay: number,
    callback?: () => void
  ) => {
    let timer: NodeJS.Timeout

    timer = setTimeout(() => {
      setStep(nextStep)
      clearTimeout(timer)

      if (callback) {
        callback()
      }
    }, delay)

    return timer
  }, [])

  return (
    <View
      style={styles.wrapper}
      >
      { step === "ready" ?
        <CustomButton
          onPress={record}
          style={styles.recordIcon}
          icon='record'
          />
        : null }

      { step === "recording" ?
        <CustomButton
          onPress={stop}
          style={styles.stopIcon}
          icon='stop'
          />
        : null }

      { step === "reviewing" ?
        <>
          <CustomButton
            onPress={play}
            style={styles.playIcon}
            icon='play'
            />
          <CustomButton
            onPress={record}
            style={styles.recordIcon}
            icon='record'
            />
          <CustomButton
            onPress={confirm}
            style={styles.confirmIcon}
            icon='check-circle-outline'
            />
        </>
        : null }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordIcon: {
    color: '#cc0000',
    fontSize: 100
  },
  stopIcon: {
    color: '#000000',
    fontSize: 100
  },
  playIcon: {
    color: '#000000',
    fontSize: 100
  },
  confirmIcon: {
    color: '#339933',
    fontSize: 75
  },
  pressed: {
    opacity: 0.65
  }
})