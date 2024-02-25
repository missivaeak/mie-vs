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
import Container from '../classes/references/Container'
import Picture from '../classes/Picture'
import StartingPointPicture from '../components/StartingPointPicture'

import GlobalContext from '../contexts/GlobalContext'
import EnvVars from '../constants/EnvVars'

export default function Home({ navigation, route }: RootStackScreenProps<'Home'>) {
  const [ startingPoint, setStartingPoint ] = useState<Container>()
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useEffect(() => {
    globalState?.database?.getStartingPoint().then((result) => {
      setStartingPoint(result)
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

      {startingPoint ? 
        <Pressable
          onPress={() => {
            navigation.navigate('Folder', {folder: startingPoint})
          }}
          style={{
            alignItems: 'center'
          }}
          >

          <StartingPointPicture source={startingPoint.picture.source} />

          <Text>Börja använda appen.</Text>
        </Pressable>
      : <></>}
    </View>
  )
}
