/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

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

export default function EditScene(
  {route, navigation}: RootStackScreenProps<'EditScene'>
) {
  const [image, setImage] = useState<ImageType>()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  // console.log(folder)

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
        <Pressable
          onPress={() => {}}
          style={styles.folder}
          >
          <MaterialCommunityIcon
            style={styles.addButton}
            name='folder-plus-outline'
            adjustsFontSizeToFit={true}
            />
        </Pressable>
      </View>

      <View
        style={styles.places}
        >
        <Pressable
          style={styles.place}
          >
          <MaterialCommunityIcon
            style={styles.addButton}
            name='map-marker-plus-outline'
            adjustsFontSizeToFit={true}
            />
        </Pressable>
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
