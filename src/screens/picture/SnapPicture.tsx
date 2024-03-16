import {
  useRef,
  useCallback,
  useContext,
  useState
} from "react"
import { View, StyleSheet, Text } from "react-native"
import {
  Camera,
  useCameraDevice,
  CameraRuntimeError,
  PhotoFile
} from "react-native-vision-camera"
import { useIsFocused } from '@react-navigation/core'

import useIsForeground from "../../hooks/useIsForeground"
import EnvVars from "../../constants/EnvVars"
import CaptureButton from "../../components/CaptureButton"
import Photographer from "../../services/Photographer"
import GlobalContext from "../../contexts/GlobalContext"
import ModalDefault from "../../components/ModalDefault"
import { RootStackScreenProps } from "../../navigation/types"

export default function SnapPicture(
  { navigation, route }: RootStackScreenProps<'SnapPicture'>
) {
  const device = useCameraDevice('back')
  const { globalState, setGlobalState, setSpinnerActive } = useContext(GlobalContext)
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ modalContent, setModalContent] = useState({
    header: '',
    text: ''
  })

  // ref that is assigned by the Camera component
  // and used by the CaptureButton component
  const camera = useRef<Camera>(null)

  // check if camera page is active
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground

  // error handling
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error)
  }, [])

  // todo: remove show modal (for debugging)
  const showModal = useCallback((header: string, text: string) => {
    setModalContent({ header, text })
    setModalOpen(true)
  }, [])

  // main photo snap function
  const onPhotoCaptured = useCallback(
    async (photo: PhotoFile) => {
      const path = await Photographer.save(photo)
      const picture = await globalState.database?.insertPicture(path, 'jpg')

      setSpinnerActive(false)

      if (picture) {
        return navigation.push('ConfirmPicture', {
          ...route.params,
          picture
        })
      }

      showModal('Problem capturing photo!', JSON.stringify(picture))
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
          onError={onError}
          orientation="portrait"
          photo={true}
          resizeMode="contain"
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
    bottom: EnvVars.safeAreaPadding.paddingBottom,
  },
  // button: {
  //   marginBottom: EnvVars.contentSpacing,
  //   width: CONTROL_BUTTON_SIZE,
  //   height: CONTROL_BUTTON_SIZE,
  //   borderRadius: CONTROL_BUTTON_SIZE / 2,
  //   backgroundColor: 'rgba(140, 140, 140, 0.3)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  rightButtonRow: {
    position: 'absolute',
    right: EnvVars.safeAreaPadding.paddingRight,
    top: EnvVars.safeAreaPadding.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
