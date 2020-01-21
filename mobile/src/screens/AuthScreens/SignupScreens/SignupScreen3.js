import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, phoneRegex } from '../../../regex/regex'
import styles from './style'
const SignupScreen3 = props => {
  const [phone, setPhone] = useState("")
  const [err, setErr] = useState("")

  changeNumber = (value) => {
    setPhone(value)
  }

  sendSms = () => {

  }

  signUp = () => {
    //get redux user
    //addition phone redux
    //post request 
    //create token
    props.navigation.navigate("Initial")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Signup2</Text>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          Hatalı Telefon Numarası Girdiniz.
        </Text>
      </View>

      <Input
        placeholder="+90 452 080 51 51"
        textContentType="telephoneNumber"
        inputStyle={{ marginLeft: 5 }}
        leftIcon={<Icon name="md-call" size={24} color="black" />}
        onChangeText={value => changeNumber(value)}
      />

      <Button containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />

    </SafeAreaView>
  )
}

export default SignupScreen3
