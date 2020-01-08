import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { getTokenStorage } from "../../AsyncStorage/index";

const InitialScreen = ({navigation}) => {
  
  init = async () => {
    try {
      const token = await getTokenStorage();
      console.warn(token)
      if (!token.err) {
        //user atama context API
        navigation.navigate("Main")
      } else throw new Error()
    } catch { navigation.navigate("Auth") }
  }

  useEffect(() => {
    init()
  })

    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
}

export default InitialScreen;

