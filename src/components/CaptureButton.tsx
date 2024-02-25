import React, { useCallback, useRef, RefObject, useContext } from 'react'
import { StyleSheet, View, ViewProps, Text, Pressable } from 'react-native'
import { Camera, type PhotoFile } from 'react-native-vision-camera'

import { CAPTURE_BUTTON_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/EnvVars'
import GlobalContext from '../contexts/GlobalContext'

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wholeButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: '#303030',
    backgroundColor: '#ffffff44',
  },
  pressedButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
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
  const { globalState, setGlobalState} = useContext(GlobalContext)

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!')

      setGlobalState({
        ...globalState,
        spinnerActive: true
      })
      // console.log('Taking photo...')

      const photo = await camera.current.takePhoto({})

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
          <View style={pressed ? styles.pressedButton : styles.wholeButton} />
        )}
      </Pressable>
    </View>
  )
}