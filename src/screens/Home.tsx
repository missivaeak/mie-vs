/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, FlatList, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RNFetchBlob from 'react-native-blob-util'

import type ImageType from '../types/ImageType'
import type { RootStackScreenProps } from '../navigation/types'
import type { Container } from '../classes/references/Container'

import GlobalContext from '../contexts/GlobalContext'
import EnvVars from '../constants/EnvVars'

const StartingPointImage = (props: {imageSource: string}) => {
  let component = (<></>)

  if (props.imageSource) {
    component = (
        <Image
          style={{
            width: '60%',
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
          source={{
            uri: EnvVars.baseDir + props.imageSource
          }}
        />
    )
  }

  return component
}

const Home = ({ navigation, route }: RootStackScreenProps<'Home'>) => {
  const [ image, setImage ] = useState<ImageType>()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const [ startingPoint, setStartingPoint ] = useState<Container>()

  useEffect(() => {
    globalState?.database?.getStartingPointImage().then((image) => {
      setImage(image)
      return
    })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Pressable
        onPress={() => {
          navigation.navigate('StartingPoint')
        }}
        style={{
          alignItems: 'center'
        }}
        >

        <StartingPointImage imageSource={image ? image.source : ''} />

        <Text>Börja använda appen.</Text>
      </Pressable>
    </View>
  )
}

export default Home
