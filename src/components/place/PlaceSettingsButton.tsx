import { useRoute, useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { RootStackScreenProps, RootStackNavigationProp } from '../../navigation/types'


export default function FolderSettingsButton() {
  const route = useRoute<RootStackScreenProps<'Place'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'Place'>['navigation']>()
  const place = route.params.place

  return (
    <Pressable
      onPress={() => {
        navigation.push('EditPlace', {place})
      }}
      >
      <MaterialCommunityIcon
        name='sawtooth-wave'
        size={40}
        adjustsFontSizeToFit={true}
        />
    </Pressable>
  )
}