import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { RootStackScreenProps } from '../navigation/types'
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'

export default function NavigateBack({onPress}: {onPress: () => void}) {
  return (
    <MaterialCommunityIcon
      onPress={onPress}
      style={{
        fontSize: 40,
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingRight: 5
      }}
      name='gamma'
      />
  )
}