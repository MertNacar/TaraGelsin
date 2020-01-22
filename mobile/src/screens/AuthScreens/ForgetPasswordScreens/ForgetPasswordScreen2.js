import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, passwordRegex } from '../../../regex/regex'
import styles from './style2'
import { updateUser } from '../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../utils/httpHelper'

const ForgetPasswordScreen2 = props => {

  const [passwords, setPasswords] = useState({ password: "", rePassword: "" })
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)

  changeText = (value, type) => {
    let newPassword = Object.assign({}, passwords, { [type]: value })
    setPasswords(newPassword)
  };

  validatePassword = () => {
    if (passwords.password === passwords.rePassword) {
      return true
    } else return false
  }

  getNewPassword = async () => {
    try {
      setDisable(true)
      setErrMessage("")
      setErr(false)
      validate = validatePassword()

      if (validate) {
        passValidation = validateRegex(passwordRegex, passwords.password)

        if (passValidation) {
          let user = { username: props.getUser.username, password: passwords.password }
          let changingPassword = await Http.postWithoutToken("forget/changePassword", user)

          if (!changingPassword.err) {
            setDisable(false)
            props.navigation.navigate("Login")

          } else throw new Error("Şifreyi değiştirirken bir hatayla karşılaştık tekrar deneyiniz.")

        } else throw new Error("Girdiğiniz şifre uygun değildir, lütfen başka bir şifre deneyiniz")

      } else throw new Error("Girdiğiniz şifreler uyuşmamaktadır.")

    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
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
          textContentType="newPassword"
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

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.button} title="Şifreni Al" onPress={() => getNewPassword()} />

      </View>

    </SafeAreaView>
  )
} 

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(mapStateToProps)(ForgetPasswordScreen2);
