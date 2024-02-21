
import { useContext, } from 'react'
import { View, Button } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import DebugDefault from '../screens/DebugDefault'
import Home from '../screens/Home'
import DebugGallery from '../screens/DebugGallery'
import DebugAudio from '../screens/DebugAudio'
import DebugCamera from '../screens/DebugCamera'
import Loading from '../components/Loading'
import GlobalContext from '../contexts/GlobalContext'

type RootStackParamList = {
  Home: undefined
  Debug: undefined
  Gallery: undefined
  Audio: undefined
  Camera: undefined
}

type ScreenProps = NativeStackScreenProps<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()

const BottomTabMenu = () => {
  const navigation = useNavigation<ScreenProps['navigation']>()

  return (
    <View
      style={{
        height: 60,
        padding: 10,
        // justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Button
        title="Debug"
        onPress={() =>
          navigation.navigate('Debug')
        }
      />
      <Button
        title="Gallery"
        onPress={() =>
          navigation.navigate('Gallery')
        }
      />
      <Button
        title="Audio"
        onPress={() =>
          navigation.navigate('Audio')
        }
      />
      <Button
        title="Camera"
        onPress={() =>
          navigation.navigate('Camera')
        }
      />
    </View>
  )
}

export default () => {
  const { globalState, setGlobalState } = useContext(GlobalContext)

  if (!globalState || !globalState.database) {
    return (
      <Loading />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gallery" component={DebugGallery} />
        <Stack.Screen name="Debug" component={DebugDefault} />
        <Stack.Screen name="Audio" component={DebugAudio} />
        <Stack.Screen name="Camera" component={DebugCamera} />
      </Stack.Navigator>

      <BottomTabMenu />
    </NavigationContainer>
  )
}

export type { RootStackParamList, ScreenProps }
