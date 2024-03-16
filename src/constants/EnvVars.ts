import RNFetchBlob from "react-native-blob-util"
import { Dimensions, Platform } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const dir = RNFetchBlob.fs.dirs.CacheDir

// const path = Platform.select({
//   ios: `${timestamp}.m4a`,
//   android: `${dirs.CacheDir}/${timestamp}.mp4`
// })

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0
const CONTENT_SPACING = 15

export default {
  bareBaseDir: dir + '/',
  baseDir: 'file://' + dir + '/',
  safeAreaPadding: {
    paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
    paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
    paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
    paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
  },
  contentSpacing: CONTENT_SPACING,
  captureButtonSize: 78,
}



// The maximum zoom _factor_ you should be able to zoom in
// export const MAX_ZOOM_FACTOR = 10

// export const SCREEN_WIDTH = Dimensions.get('window').width
// export const SCREEN_HEIGHT = Platform.select<number>({
//   android: Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
//   ios: Dimensions.get('window').height,
// }) as number

// // Capture Button
// export const CAPTURE_BUTTON_SIZE = 78

// // Control Button like Flash
// export const CONTROL_BUTTON_SIZE = 40