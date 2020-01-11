import React from 'react'
import { View, Text } from 'react-native'
import {Button} from 'react-native-elements'
const ForgetPasswordScreen = props => {

  
  goLoginScreen = () => {
    props.navigation.navigate("Login")
  };

  return (
    <View>
      <Text>ForgetPasswordScreen</Text>
      <Button title="Şifren aklına mı geldi ?" type="clear" onPress={() => goLoginScreen()} />
    </View>
  )
}

export default ForgetPasswordScreen
