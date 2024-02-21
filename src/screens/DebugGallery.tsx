/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, Button, Image, FlatList, ScrollView } from 'react-native'

import type ImageType from '../types/ImageType'

import GlobalContext from '../contexts/GlobalContext'
import EnvVars from '../constants/EnvVars'

export default () => {
  const [images, setImages] = useState<Array<ImageType>>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useEffect(() => {
    globalState?.database?.getImages().then((images): void => {
      setImages(images)
      return
    })
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{
        flex: 1,
        // flexGrow: 0,
      }}>

      {images.map((item)=> {
        return (<Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: EnvVars.baseDir + item.source
          }}
          key={item.id}
        />)
      })}
      <></>
    </ScrollView>
  )
}
