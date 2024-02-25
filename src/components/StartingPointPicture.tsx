import { Image } from "react-native"
import EnvVars from "../constants/EnvVars"

export default function StartingPointPicture(props: {source: string}) {
  return (
    <Image
    style={{
      width: '60%',
      aspectRatio: 1,
      resizeMode: 'contain',
    }}
    source={{
      uri: EnvVars.baseDir + props.source
    }}
    />
  )
}
