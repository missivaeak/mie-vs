import { Image } from "react-native"
import EnvVars from "../constants/EnvVars"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function StartingPointPicture(props: {source: string}) {
  return (
    // <Image
    // style={{
    //   width: '60%',
    //   aspectRatio: 1,
    //   resizeMode: 'contain',
    // }}
    // source={{
    //   uri: EnvVars.baseDir + props.source
    // }}
    // />
    <MaterialCommunityIcon
      style={{
          width: '60%',
          aspectRatio: 1,
          fontSize: 240,
          color: '#000',
          textAlign: 'center',
          textAlignVertical: 'center'
      }}
      name='decagram'
      />
  )
}
