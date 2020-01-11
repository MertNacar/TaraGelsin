import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Input} from 'react-native-elements'
const SignupScreen2 = () => {
  return (
    <SafeAreaView>
      <Text>SSignup2</Text>
      
      <Input
          placeholder="Şifre"
          secureTextEntry={true}
          textContentType="password"
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'password')}
        />
        
    </SafeAreaView>
  )
}

export default SignupScreen2
