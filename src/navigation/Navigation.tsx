import { useContext, useState } from 'react'
import { View, Button } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DebugDefault from '../screens/debug/DebugDefault'
import DebugGallery from '../screens/debug/DebugGallery'
import DebugAudio from '../screens/debug/DebugAudio'
import DebugCamera from '../screens/debug/DebugCamera'

import Home from '../screens/Home'
import Folder from '../screens/Folder'
import EditFolder from '../screens/EditFolder'
import Place from '../screens/Place'
import EditPlace from '../screens/EditPlace'
import Scene from '../screens/Scene'
import EditScene from '../screens/EditScene'
import Loading from '../screens/Loading'
import Spinner from '../components/Spinner'
import GlobalContext from '../contexts/GlobalContext'
import FolderSettingsButton from '../components/FolderSettingsButton'
import type { RootStackNavigationProp, RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const DebugMenu = () => {
  const navigation = useNavigation<RootStackNavigationProp>()

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
  const [ isLoading, setIsLoading ] = useState(true)
  const { globalState, setGlobalState } = useContext(GlobalContext)

  if (isLoading) {
    return (
      <Loading
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
          />

        <Stack.Screen
          name="EditFolder"
          component={EditFolder}
          options={{
            title: 'Redigera mapp'
          }}
          />

        <Stack.Screen
          name="Folder"
          component={Folder}
          options={{
            title: 'todo: mappnamn'
          }}
          />

        <Stack.Screen
          name="EditPlace"
          component={EditPlace}
          options={{
            title: 'todo: mappnamn'
          }}
          />

        <Stack.Screen
          name="Place"
          component={Place}
          options={{
            title: 'todo: mappnamn'
          }}
          />

        <Stack.Screen
          name="EditScene"
          component={EditScene}
          options={{
            title: 'todo: mappnamn'
          }}
          />

        <Stack.Screen
          name="Scene"
          component={Scene}
          options={{
            title: 'todo: mappnamn'
          }}
          />

        <Stack.Screen name="Gallery" component={DebugGallery} />
        <Stack.Screen name="Debug" component={DebugDefault} />
        <Stack.Screen name="Audio" component={DebugAudio} />
        <Stack.Screen name="Camera" component={DebugCamera} />
      </Stack.Navigator>

      <DebugMenu />

      {globalState.spinnerActive ? <Spinner /> : <></>}

    </NavigationContainer>
  )
}

export type { RootStackParamList }
