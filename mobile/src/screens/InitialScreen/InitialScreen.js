import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import styles from './style'
import { COLOR_PRIMARY } from '../../constStyle/constStyle'
import { getTokenStorage, getUserStorage } from "../../AsyncStorage/index";
import { post } from '../../utils/httpHelper'

const InitialScreen = props => {

  init = async () => {
    try {
      const token = await getTokenStorage();

      if (token.err) throw new Error()
      else {
        let username = await getUserStorage()
        let result = await post("immediately", username, token)

        if(result.err) throw new Error()
        else{
          //context user kaydet ve main git
          props.navigation.navigate("Main")
        }
      }
    } catch {
      props.navigation.navigate("Auth")
    }
  }

  useEffect(() => {

    init()
  })

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={COLOR_PRIMARY} />
    </View>
  )
}

export default InitialScreen;

