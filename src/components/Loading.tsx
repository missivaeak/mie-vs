/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState, useContext } from 'react'
import { Text, View } from 'react-native'
import GlobalContext from '../contexts/GlobalContext'
import Database from '../classes/Database'

const Loading = () => {
  const globalContext = useContext(GlobalContext)

  Database.getDBConnection().then((connection) => {
    const database = new Database(connection)
    database.createTable().then(() => {
      globalContext.setGlobalState({database})
    })
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Text>Loading...</Text>
    </View>
  )
}

export default Loading
