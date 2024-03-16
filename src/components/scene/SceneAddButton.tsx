import { Pressable, StyleSheet } from "react-native"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SceneAddButton(props: {callback: () => void}) {
  return (
    <Pressable
      style={styles.button}
      onPress={props.callback}
      >
      <MaterialCommunityIcon
        style={styles.icon}
        name='movie-open-plus-outline'
        adjustsFontSizeToFit={true}
        />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center'
  },
  icon: {
    fontSize: 120,
    // color: '#000000'
  }
})
