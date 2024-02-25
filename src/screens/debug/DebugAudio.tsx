/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, Image, FlatList, ScrollView } from 'react-native'
import Recorder from '../../services/Recorder'
import Player from '../../services/Player'

export default () => {
  // const navigation = useNavigation<ScreenProps['navigation']>()
  // const { globalState, setGlobalState } = useContext(GlobalContext)
  let recorder: Recorder

  useEffect(() => {
    recorder = new Recorder()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        // flexGrow: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Button
        title="Spela in"
        onPress={() => {recorder.start("test")}}
      />

      <Button
        title="Stäng av inspelning"
        onPress={() => {recorder.stop()}}
      />

      <Button
        title="Spela upp"
        onPress={() => {Player.play("test")}}
      />
    </View>
  )
}
