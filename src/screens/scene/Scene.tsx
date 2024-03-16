/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/** Libraries **/
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Text, View, Button, Image, Pressable, StyleSheet, ScrollView, GestureResponderEvent } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

/** Types **/
import type Container from '../../classes/references/Container'
import type { RootStackScreenProps } from '../../navigation/types'

/** General **/
import GlobalContext from '../../contexts/GlobalContext'
import EnvVars from '../../constants/EnvVars'
import Scene from '../../classes/references/Scene'
import Region from '../../classes/references/Region'
import Sound from '../../classes/references/Sound'

/** Components **/
import Shape from '../../components/Shape'
import CoordinatesType from '../../types/CoordinatesType'
import Player from '../../services/Player'

export default function SceneScreen({navigation, route}: RootStackScreenProps<'Scene'>) {
  const [ scene, setScene ] = useState<Scene>(route.params.scene)
  const [ regions, setRegions ] = useState<Array<Region>>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useFocusEffect(useCallback(() => {
    globalState.database?.sync(route.params.scene)?.then((result) => {
      setScene(Object.create(result))
    })

    navigation.setOptions({title: route.params.scene.name})

    return () => {
      // teardown not necessary
    }
  }, [route, navigation]))

  useEffect(() => {
    const regionsTemp: Array<Region> = []

    for (const region of scene.regions) {
      regionsTemp.push(region)
    }

    setRegions(regionsTemp)
    console.log("regions: ", regionsTemp.length)
  }, [scene])

  const scenePress = useCallback((event: GestureResponderEvent) => {
    const click: CoordinatesType = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY
    }

    event.target.measure((x, y, width, height, pageX, pageY) => {
      const normalisedClick: CoordinatesType = {
        x: pageX + click.x,
        y: pageY + click.y - 56
      }

      for (const region of regions) {
        const offsetCoords: CoordinatesType = {
          x: normalisedClick.x - region.coords.x,
          y: normalisedClick.y - region.coords.y
        }

        if (region.shape.checkClick(offsetCoords) && region.action instanceof Sound) {
          return Player.play(region.action.source)
        }
      }
    })
  }, [regions])

  return (
    <View
      style={styles.flex}>
      <Pressable
        style={styles.flex}
        onPress={scenePress}
        >
        <Image
          style={styles.scene}
          source={{
            uri: EnvVars.baseDir + scene.picture.source
          }}
          />
      </Pressable>

      {regions.map((region) => {
        return (<Shape
          callback={scenePress}
          key={region.databaseId}
          region={region}
          />)
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  scene: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain'
  },
  shape: {
    position: 'absolute',
    backgroundColor: '#000000'
  }
})
