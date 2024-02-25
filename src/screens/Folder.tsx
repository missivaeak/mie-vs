/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import type ImageType from '../types/ImageType'

import GlobalContext from '../contexts/GlobalContext'
import EnvVars from '../constants/EnvVars'
import { RootStackScreenProps } from '../navigation/types'

const ContainerImage = (props: {imageSource: string}) => {
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

export default function Folder({navigation, route}: RootStackScreenProps<'Folder'>) {
  const [image, setImage] = useState<ImageType>()
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useEffect(() => {
    globalState?.database?.getStartingPointImage().then((image) => {
      setImage(image)
      return
    })
  }, [])

  return (
    <View
      style={styles.wrapper}>
      <View
        style={styles.folders}
        >
      </View>

      <View
        style={styles.places}
        >
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row'
  },
  folders: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dfdfdf',
    alignContent: 'center'
  },
  folder: {
    width: '100%',
    aspectRatio: 1,
    // fontSize: 40,
    alignSelf: 'center'
  },
  places: {
    flex: 3,
    padding: 5,
    flexWrap: 'wrap'
  },
  place: {
    width: '45%',
    aspectRatio: 1,

    // borderWidth: 2,
    // borderRadius: 12,
    // borderColor: '#bbb',

    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    fontSize: 100,
    alignSelf: 'center',
    color: '#000000'
  }
})
