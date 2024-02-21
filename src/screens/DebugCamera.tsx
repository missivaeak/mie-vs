/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, FlatList, ScrollView, StyleSheet } from 'react-native'
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
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, MAX_ZOOM_FACTOR, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/EnvVars'
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated'
import { useIsForeground } from '../hooks/useIsForeground'
import { StatusBarBlurBackground } from '../components/StatusBarBlurBackground'
import CaptureButton from '../components/CaptureButton'
import { PressableOpacity } from 'react-native-pressable-opacity'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/core'
import { usePreferredCameraDevice } from '../hooks/usePreferredCameraDevice'
import { RootStackParamList } from '../navigation/Navigation'

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
  const hasMicrophonePermission = useMemo(() => Camera.getMicrophonePermissionStatus() === 'granted', [])
  const zoom = useSharedValue(1)
  const isPressingButton = useSharedValue(false)

  useEffect(() => {
    const permissionStatus = Camera.getCameraPermissionStatus()
    console.log(permissionStatus)
    if (permissionStatus !== 'granted') {
      Camera.requestCameraPermission()
    }
  }, [camera])

  // check if camera page is active
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground

  // const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back')
  const [enableHdr, setEnableHdr] = useState(false)
  const [flash, setFlash] = useState<'off' | 'on'>('off')
  const [enableNightMode, setEnableNightMode] = useState(false)

  // camera device settings
  let device = useCameraDevice('back')

  const [targetFps, setTargetFps] = useState(60)

  const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH
  const format = useCameraFormat(device, [
    { fps: targetFps },
    { videoAspectRatio: screenAspectRatio },
    { videoResolution: 'max' },
    { photoAspectRatio: screenAspectRatio },
    { photoResolution: 'max' },
  ])

  const fps = Math.min(format?.maxFps ?? 1, targetFps)

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error)
  }, [])
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!')
    setIsCameraInitialized(true)
  }, [])

  // const onPhotoCaptured = useCallback(
  //   (photo: PhotoFile) => {
  //     console.log(`Media captured! ${JSON.stringify(photo)}`)
  //     // navigation.navigate('MediaPage', {
  //     //   path: media.path,
  //     //   type: type,
  //     // })
  //   },
  //   // [navigation],
  //   [],
  // )

  const onPhotoCaptured = (photo: PhotoFile) => {
    console.log(`Media captured! ${JSON.stringify(photo)}`)
    // navigation.navigate('MediaPage', {
    //   path: media.path,
    //   type: type,
    // })
  }

  return (
    <View style={styles.container}>
      {device != null && 
        (<Camera
          style={StyleSheet.absoluteFill}
          device={device}
          // isActive={true}
          // style={StyleSheet.absoluteFill}
          // device={device}
          isActive={isActive}
          ref={camera}
          onInitialized={onInitialized}
          onError={onError}
          onStarted={() => 'Camera started!'}
          onStopped={() => 'Camera stopped!'}
          format={format}
          fps={fps}
          photoHdr={format?.supportsPhotoHdr && enableHdr}
          videoHdr={format?.supportsVideoHdr && enableHdr}
          lowLightBoost={device.supportsLowLightBoost && enableNightMode}
          enableZoomGesture={false}
          // animatedProps={cameraAnimatedProps}
          exposure={0}
          // enableFpsGraph={false}
          orientation="portrait"
          photo={true}
          video={true}
          audio={hasMicrophonePermission}
        />)}
      {/* (
        <GestureHandlerRootView>
          <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
            <Reanimated.View onTouchEnd={onFocusTap} style={StyleSheet.absoluteFill}>
              <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                <ReanimatedCamera
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={isActive}
                  ref={camera}
                  onInitialized={onInitialized}
                  onError={onError}
                  onStarted={() => 'Camera started!'}
                  onStopped={() => 'Camera stopped!'}
                  format={format}
                  fps={fps}
                  photoHdr={format?.supportsPhotoHdr && enableHdr}
                  videoHdr={format?.supportsVideoHdr && enableHdr}
                  lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                  enableZoomGesture={false}
                  animatedProps={cameraAnimatedProps}
                  exposure={0}
                  enableFpsGraph={true}
                  orientation="portrait"
                  photo={true}
                  video={true}
                  audio={hasMicrophonePermission}
                />
              </TapGestureHandler>
            </Reanimated.View>
          </PinchGestureHandler>
        </GestureHandlerRootView>
      )} */}

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
          {/* // camera={camera}
          // onMediaCaptured={onMediaCaptured}
          // cameraZoom={zoom}
          // minZoom={minZoom}
          // maxZoom={maxZoom}
          // flash={supportsFlash ? flash : 'off'}
          // enabled={isCameraInitialized && isActive}
          // setIsPressingButton={setIsPressingButton} */}
      </View>

      {/* <StatusBarBlurBackground /> */}

      {/* <View style={styles.rightButtonRow}>
        <PressableOpacity style={styles.button} onPress={onFlipCameraPressed} disabledOpacity={0.4}>
          <IonIcon name="camera-reverse" color="white" size={24} />
        </PressableOpacity>
        {supportsFlash && (
          <PressableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
            <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
          </PressableOpacity>
        )}
        {supports60Fps && (
          <PressableOpacity style={styles.button} onPress={() => setTargetFps((t) => (t === 30 ? 60 : 30))}>
            <Text style={styles.text}>{`${targetFps}\nFPS`}</Text>
          </PressableOpacity>
        )}
        {supportsHdr && (
          <PressableOpacity style={styles.button} onPress={() => setEnableHdr((h) => !h)}>
            <MaterialIcon name={enableHdr ? 'hdr' : 'hdr-off'} color="white" size={24} />
          </PressableOpacity>
        )}
        {canToggleNightMode && (
          <PressableOpacity style={styles.button} onPress={() => setEnableNightMode(!enableNightMode)} disabledOpacity={0.4}>
            <IonIcon name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
          </PressableOpacity>
        )}
        {/* <PressableOpacity style={styles.button} onPress={() => navigation.navigate('Devices')}>
          <IonIcon name="settings-outline" color="white" size={24} />
        </PressableOpacity>
        <PressableOpacity style={styles.button} onPress={() => navigation.navigate('CodeScannerPage')}>
          <IonIcon name="qr-code-outline" color="white" size={24} />
        </PressableOpacity>
      </View> */}
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