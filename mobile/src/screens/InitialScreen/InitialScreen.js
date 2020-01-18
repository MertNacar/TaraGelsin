import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import styles from './style'
import { COLOR_PRIMARY } from '../../constStyle/constStyle'
import { getTokenStorage, getUserStorage } from "../../AsyncStorage/index";
import { post } from '../../utils/httpHelper'
//import { UserContext } from '../../store/user/context'
//import { updateUser } from '../../store/user/actionCreator'
//import UserProvider from '../../store/user/context';

const InitialScreen = props => {

  init = async () => {
    try {
      const token = await getTokenStorage();

      if (token.err) throw new Error()
      else {
        let username = await getUserStorage()
        let result = await post("login/immediately", username.value, token.value)

        if (result.err) throw new Error()
        else {
          props.navigation.navigate("Main")
        }
      }
    } catch{
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

