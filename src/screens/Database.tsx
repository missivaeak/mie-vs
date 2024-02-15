/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, FlatList, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ScreenProps } from '../navigation/Navigation'
import GlobalContext from '../contexts/GlobalContext'

type ImageSourceArray = {
  source: string
}[]

const Database = () => {
  const navigation = useNavigation<ScreenProps['navigation']>()
  const [images, setImages] = useState<ImageSourceArray>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)

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
        // flexGrow: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      {images.map((item)=> {
        return (<Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: item.source
          }}
        />)}
      )}
      <></>
    </View>
  )
}

export default Database
