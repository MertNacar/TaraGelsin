import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, passwordRegex } from '../../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../../utils/httpHelper'
import * as Colors from '../../../../constStyle/colors'

const ForgetPasswordScreen2 = props => {

  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [passBorder, setPassBorder] = useState(Colors.COLOR_BACKGROUND)

  changeText = (value, type) => {
    if (type === "password") setPassword(value)
    else setRePassword(value)
  };

  validatePassword = () => {
    if (password === rePassword) return true
    else return false
  }

  setBorder = (verifyPass) => {
    let border = verifyPass ? Colors.COLOR_BACKGROUND : "red"
    setPassBorder(border)
  }

  getNewPassword = async () => {
    try {
      setBorder(true)
      setDisable(true)
      setErrMessage("")
      setErr(false)
      let validate = validatePassword()

      if (validate) {
        passValidation = validateRegex(passwordRegex, password)
        setBorder(passValidation)
        if (passValidation) {
          let user = { phone: props.getUser.phone, password }
          let changingPassword = await Http.putWithoutToken("auth/forget/change-password", user)

          if (!changingPassword.err) {
            setDisable(false)
            props.navigation.navigate("Forget4")

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
          maxLength={24}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          containerStyle={[styles.input, { borderColor: passBorder }]}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'password')}
        />

        <Input
          placeholder="Şifre Tekrar"
          secureTextEntry={true}
          inputStyle={{ marginLeft: 5 }}
          maxLength={24}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          containerStyle={[styles.input, { borderColor: passBorder }]}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'rePassword')}
        />

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.buttonContainer} buttonStyle={styles.button} title="Şifreni Al" onPress={() => getNewPassword()} />

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
