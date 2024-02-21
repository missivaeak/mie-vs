/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState, useContext, useEffect } from 'react'
import { Text, View } from 'react-native'

import GlobalContext from '../contexts/GlobalContext'
import Database from '../services/Database'
import Initialiser from '../services/Initialiser'
import Permitter from '../services/Permitter'

const Loading = () => {
  const globalContext = useContext(GlobalContext)
  let database: Database

  // check database connection
  useEffect(() => {
    if (!globalContext.globalState.database) {
      database = new Database()
  
      database.ping().then(async (result) => {
        if (result.firstRun === "true") {
          console.log('first run, running initialiser')
          await Initialiser.run(database)
        }
        globalContext.setGlobalState({database})
        return
      })
    }
  }, [])

  // check permissions
  useEffect(() => {
    Permitter.checkAll().then(result => 
      console.log(result)
    )
  },[])


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
