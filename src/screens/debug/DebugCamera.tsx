/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, FlatList, ScrollView, StyleSheet, Modal } from 'react-native'
import { useCameraDevice, useCameraPermission, Camera, CameraDevice } from 'react-native-vision-camera'


import { useRef, useCallback, useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  CameraProps,
  CameraRuntimeError,
  PhotoFile,
  useCameraFormat,
  useFrameProcessor,
  VideoFile,
} from 'react-native-vision-camera'
// import { Camera } from 'react-native-vision-camera'
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, MAX_ZOOM_FACTOR, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/EnvVars'
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated'
import { useIsForeground } from '../../hooks/useIsForeground'
import { StatusBarBlurBackground } from '../../components/StatusBarBlurBackground'
import CaptureButton from '../../components/CaptureButton'
import { PressableOpacity } from 'react-native-pressable-opacity'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/core'
import { usePreferredCameraDevice } from '../../hooks/usePreferredCameraDevice'
import { RootStackParamList } from '../../navigation/Navigation'
import ModalDefault from '../../components/ModalDefault'
import Photographer from '../../services/Photographer'
import GlobalContext from '../../contexts/GlobalContext'

// export default () => {
//   const devices = Camera.getAvailableCameraDevices()
//   // console.log(JSON.stringify(devices, null, 2))
//   const { hasPermission, requestPermission } = useCameraPermission()
//   requestPermission()
//   const [ device, setDevice ] = useState<CameraDevice>()
//   const deviceHook = useCameraDevice('back')

//   useEffect(() => {
//     setDevice(deviceHook)
//   }, [])
//   // console.log(device)

//   if (device == undefined) {
//     return (
//       <View>
//         <Text>No camera</Text>
//       </View>
//     )
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         // flexGrow: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>

//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//       />

//     </View>
//   )
// }


const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)
Reanimated.addWhitelistedNativeProps({
  zoom: true,
})

const SCALE_FULL_ZOOM = 3

// type Props = NativeStackScreenProps<RootStackParamList, 'CameraPage'>
export default function CameraPage(): React.ReactElement {
  const camera = useRef<Camera>(null)
  const [isCameraInitialized, setIsCameraInitialized] = useState(false)
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ modalContent, setModalContent] = useState({
    header: '',
    text: ''
  })

  useEffect(() => {
    const permissionStatus = Camera.getCameraPermissionStatus()
    // console.log(permissionStatus)
    if (permissionStatus !== 'granted') {
      Camera.requestCameraPermission()
    }
  }, [camera])

  // check if camera page is active
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground

  // camera device settings
  const device = useCameraDevice('back')

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error)
  }, [])

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true)
  }, [])

  const showModal = useCallback((header: string, text: string) => {
    setModalContent({ header, text })
    setModalOpen(true)
  }, [])

  const onPhotoCaptured = useCallback(
    async (photo: PhotoFile) => {
      const path = await Photographer.save(photo)
      const imageRow = await globalState.database?.saveImage(path, 'jpg')

      setGlobalState({
        ...globalState,
        spinnerActive: false
      })

      showModal('Media captured!', JSON.stringify(imageRow))
    },
    [],
  )

  return (
    <View style={styles.container}>
      {device != null && 
        (<Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          ref={camera}
          onInitialized={onInitialized}
          onError={onError}
          orientation="portrait"
          photo={true}
        />)}

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          flex: 1
        }}
        >
        <View
          style={styles.captureButton}
          >
          <CaptureButton
            camera={camera}
            onPhotoCaptured={onPhotoCaptured}
            />
        </View>
      </View>

      {modalOpen ? 
        <ModalDefault
          setModalOpen={setModalOpen}
          >
          <Text>
            {modalContent.header}
          </Text>

          <Text>
            {modalContent.text}
          </Text>
        </ModalDefault>
      : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
    borderRadius: CONTROL_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
