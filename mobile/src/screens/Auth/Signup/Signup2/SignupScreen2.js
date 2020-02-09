import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, passwordRegex } from '../../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'

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

  continueSign2 = async () => {
    setErrMessage("")
    setErr(false)
    validate = validatePassword()

    if (validate) {
      passValidation = validateRegex(passwordRegex, passwords.password)

      if (passValidation) {
        let user = Object.assign({}, props.getUser, { password: passwords.password })
        props.updateUser(user)
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
      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          {errMessage}
        </Text>
      </View>

      <View style={styles.form}>

        <Input
          placeholder="Şifre"
          secureTextEntry={true}
          textContentType="password"
          inputStyle={{ marginLeft: 5 }}
          containerStyle={{ paddingBottom: 15 }}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'password')}
        />

        <Input
          placeholder="Şifre Tekrar"
          secureTextEntry={true}
          inputStyle={{ marginLeft: 5 }}
          containerStyle={{ paddingBottom: 15 }}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'rePassword')}
        />

        <Button containerStyle={styles.button} title="Devam et" onPress={() => continueSign2()} />
      </View>

    </SafeAreaView>
  )
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen2);
