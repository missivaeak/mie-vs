
import { useContext, } from 'react'
import { View, Button } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import Debug from '../screens/Debug'
import Home from '../screens/Home'
import Database from '../screens/Database'
import Loading from '../components/Loading'
import GlobalContext from '../contexts/GlobalContext'

type RootStackParamList = {
  Home: undefined
  Debug: undefined
  Database: undefined
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
        title="Database"
        onPress={() =>
          navigation.navigate('Database')
        }
      />
      <Button
        title="Debug"
        onPress={() =>
          navigation.navigate('Debug')
        }
      />
    </View>
  )
}

const Navigation = () => {
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
        <Stack.Screen name="Database" component={Database} />
        <Stack.Screen name="Debug" component={Debug} />
      </Stack.Navigator>

      <BottomTabMenu />
    </NavigationContainer>
  )
}
export type { RootStackParamList, ScreenProps }
export default Navigation