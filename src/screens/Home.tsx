/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, FlatList, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import type ImageArrayType from '../types/ImageArrayType'

import { ScreenProps } from '../navigation/Navigation'
import GlobalContext from '../contexts/GlobalContext'

const StartingPointImage = (props: {images: ImageArrayType|undefined}) => {
  let component = (<></>)

  if (props.images && props.images[0]) {
    component = (
        <Image
          style={{
            width: '60%',
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
          source={{
            uri: props.images[2].source
          }}
        />
    )
  }

  return component
}

const Home = () => {
  const [images, setImages] = useState<ImageArrayType>()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const navigation = useNavigation<ScreenProps['navigation']>()

  useEffect(() => {
    globalState?.database?.getImages().then((images) => {
      setImages(images)
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
          navigation.navigate('Database')
        }}
        style={{
          alignItems: 'center'
        }}
        >

        <StartingPointImage images={images} />

        <Text>Börja använda appen.</Text>
      </Pressable>
    </View>
  )
}

export default Home
