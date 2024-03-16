/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'

import type { RootStackScreenProps } from '../navigation/types'
import Container from '../classes/references/Container'
import StartingPointPicture from '../components/StartingPointPicture'

import GlobalContext from '../contexts/GlobalContext'

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
            navigation.push('Folder', {folder: startingPoint})
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
