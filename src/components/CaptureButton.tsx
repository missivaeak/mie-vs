import React, { useCallback, useRef, RefObject, useContext } from 'react'
import { StyleSheet, View, ViewProps, Text, Pressable } from 'react-native'
import { Camera, type PhotoFile } from 'react-native-vision-camera'

import GlobalContext from '../contexts/GlobalContext'
import EnvVars from '../constants/EnvVars'

const borderWidth = EnvVars.captureButtonSize * 0.1

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  button: {
    width: EnvVars.captureButtonSize,
    height: EnvVars.captureButtonSize,
    borderRadius: EnvVars.captureButtonSize / 2,
    borderWidth: borderWidth,
    borderColor: '#303030',
    backgroundColor: '#ffffff44',
  },
  pressedButton: {
    width: EnvVars.captureButtonSize,
    height: EnvVars.captureButtonSize,
    borderRadius: EnvVars.captureButtonSize / 2,
    borderWidth: borderWidth,
    borderColor: '#cccccc',
    backgroundColor: '#00000044',
  }
})

export default function CaptureButton({
  camera,
  onPhotoCaptured
}: {
  camera: RefObject<Camera>
  onPhotoCaptured: (photo: PhotoFile) => void
}) {
  const { globalState, setGlobalState, setSpinnerActive} = useContext(GlobalContext)

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!')

      setSpinnerActive(true)
      // console.log('Taking photo...')

      const photo = await camera.current.takePhoto({
        enableShutterSound: false
      })

      onPhotoCaptured(photo)
    } catch (e) {
      console.error('Failed to take photo!', e)
    }
  }, [])

  return (
    <View style={styles.flex}>
      <Pressable
        onPressOut={takePhoto}
        >
        {({pressed}) => (
          <View style={pressed ? styles.pressedButton : styles.button} />
        )}
      </Pressable>
    </View>
  )
}