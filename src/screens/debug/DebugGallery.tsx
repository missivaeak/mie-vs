/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, Button, Image, FlatList, ScrollView } from 'react-native'

import type Picture from '../../classes/Picture'

import GlobalContext from '../../contexts/GlobalContext'
import EnvVars from '../../constants/EnvVars'

export default () => {
  const [pictures, setPictures] = useState<Array<Picture>>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useEffect(() => {
    globalState?.database?.getPictures().then((pictures): void => {
      setPictures(pictures)
      return
    })
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
      }}
      style={{
        flex: 1,
        // flexGrow: 0,
      }}>

      {pictures.map((picture)=> {
        
        return (<Image
          style={{
            width: '30%',
            aspectRatio: 1,
            resizeMode: picture.format === 'png' ? 'contain' : 'cover',
          }}
          source={{
            uri: EnvVars.baseDir + picture.source
          }}
          key={picture.databaseId}
        />)
      })}
      <></>
    </ScrollView>
  )
}
