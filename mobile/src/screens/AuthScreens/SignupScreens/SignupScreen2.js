import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, passwordRegex } from '../../../regex/regex'
import styles from './style'

const SignupScreen2 = props => {
  const [passwords, setPasswords] = useState({ password: "", rePassword: "" })
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")

  changeText = (value, type) => {
    let newPassword = Object.assign({}, passwords, { [type]: value })
    setPasswords(newPassword)
  };

  validatePassword = () => {
    if (passwords.password === passwords.rePassword) {
      return true
    } else return false
  }

  continueSign = async () => {
    validate = validatePassword()
    if(validate){
      setErr(false)
      setErrMessage("")
      passValidation = validateRegex(passwordRegex, passwords.password)
      if (passValidation) {
        setErr(false)
        setErrMessage("")
        //redux user çek ekleme
        //redux password ekle geri gönder

        props.navigation.navigate("Signup3")
      } else {
        setErr(true)
        setErrMessage("Girdiğiniz şifre uygun değildir, lütfen başka bir şifre deneyiniz")
      }
    } else {
      setErr(true)
      setErrMessage("Girdiğiniz şifreler uyuşmamaktadır.")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Signup2</Text>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          {errMessage}
          </Text>
      </View>

      <Input
        placeholder="Şifre"
        secureTextEntry={true}
        textContentType="password"
        inputStyle={{ marginLeft: 5 }}
        leftIcon={<Icon name="md-lock" size={24} color="black" />}
        onChangeText={value => changeText(value, 'password')}
      />

      <Input
        placeholder="Şifre Tekrar"
        secureTextEntry={true}
        inputStyle={{ marginLeft: 5 }}
        leftIcon={<Icon name="md-lock" size={24} color="black" />}
        onChangeText={value => changeText(value, 'rePassword')}
      />

      <Button containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />

    </SafeAreaView>
  )
}

export default SignupScreen2
