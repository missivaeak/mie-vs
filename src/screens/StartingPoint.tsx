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

export default function StartingPoint() {
  const [image, setImage] = useState<ImageType>()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  // const navigation = useNavigation<ScreenProps['navigation']>()

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
    // <View
    //   style={{
    //     flex: 1,
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>

    //   <Pressable
    //     onPress={() => {
    //       navigation.navigate('Gallery')
    //     }}
    //     style={{
    //       alignItems: 'center'
    //     }}
    //     >

    //     <ContainerImage imageSource={image ? image.source : ''} />

    //     <Text>Börja använda appen.</Text>
    //   </Pressable>
    // </View>
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
  // folderHeader: {
  //   alignSelf: 'center',
  //   paddingVertical: 5
  // },
  folder: {
    width: '100%',
    aspectRatio: 1,
    // fontSize: 40,
    alignSelf: 'center'
  },
  // placesHeader: {
  //   width: '100%',
  //   paddingLeft: 20,
  //   paddingBottom: 5
  // },
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
