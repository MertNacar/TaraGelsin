import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import styles from './style'
import { COLOR_PRIMARY } from '../../constStyle/colors'
import { getTokenStorage, getUserStorage } from "../../AsyncStorage/index";
import * as Http from '../../utils/httpHelper'
import { updateUser } from '../../store/user/actionCreator'
import { connect } from 'react-redux'

const InitialScreen = props => {

  init = async () => {
    try {
      const token = await getTokenStorage();

      if (token.err) throw new Error()
      else {
        let username = await getUserStorage()
        let result = await Http.get(`auth/login/immediately?username=${username.value}`, token.value)

        if (result.err) throw new Error()
        else {
          props.updateUser(result.user)
          props.navigation.navigate("Main")
        }
      }
    } catch (err) {
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

mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(null, mapDispatchToProps)(InitialScreen);

