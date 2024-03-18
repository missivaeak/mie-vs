import { useRoute, useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { RootStackScreenProps, RootStackNavigationProp } from '../../navigation/types'


export default function FolderSettingsButton() {
  const route = useRoute<RootStackScreenProps<'Scene'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'Scene'>['navigation']>()
  const scene = route.params.scene

  return (
    <Pressable
      onPress={() => {
        navigation.push('EditScene', {scene})
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