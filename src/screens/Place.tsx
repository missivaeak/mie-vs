/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, Pressable, StyleSheet, ScrollView } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'

import type ImageType from '../types/ImageType'

import GlobalContext from '../contexts/GlobalContext'
import { RootStackScreenProps } from '../navigation/types'

export default function Place({navigation, route}: RootStackScreenProps<'Place'>) {
  const [image, setImage] = useState<ImageType>()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  // const navigation = useNavigation<ScreenProps['navigation']>()
  // console.log(props.folder)

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
