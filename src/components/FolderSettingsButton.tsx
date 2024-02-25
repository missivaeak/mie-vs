import { Pressable } from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { RootStackParamList, ScreenProps } from '../navigation/Navigation'
import { RootStackScreenProps, RootStackNavigationProp } from '../navigation/types'
import { Container } from '../classes/references/Container'


export default function FolderSettingsButton() {
  const route = useRoute<RootStackScreenProps<'Folder'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'Folder'>['navigation']>()
  const folder = route.params.folder

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('EditFolder', {folder})
      }}
      >
      <MaterialCommunityIcon
        name='folder-cog-outline'
        size={40}
        adjustsFontSizeToFit={true}
        />
    </Pressable>
  )
}