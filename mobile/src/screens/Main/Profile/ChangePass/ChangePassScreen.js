import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, passwordRegex } from '../../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../../utils/httpHelper'
import * as Colors from '../../../../constStyle/colors'

const ChangePassScreen = props => {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [passBorder, setPassBorder] = useState({
    oldPassBorder: Colors.COLOR_BACKGROUND,
    newPassBorder: Colors.COLOR_BACKGROUND
  })

  changeText = (value, type) => {
    if (type === "oldPassword") setOldPassword(value)
    else setNewPassword(value)
  };

  setBorder = (verifyOldPass, verifyNewPass) => {
    let oldPassBorder = verifyOldPass ? Colors.COLOR_BACKGROUND : "red"
    let newPassborder = verifyNewPass ? Colors.COLOR_BACKGROUND : "red"
    setPassBorder({ oldPassBorder, newPassborder })
  }

  getNewPassword = async () => {
    try {
      setBorder(true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)

      oldPassValid = validateRegex(passwordRegex, oldPassword)
      newPassValid = validateRegex(passwordRegex, newPassword)
      setBorder(oldPassValid, newPassValid)

      if (oldPassValid && newPassValid) {
        let user = { phone: props.getUser.phone, oldPassword, newPassword }
        let changingPassword = await Http.put("main/profile/change-password", user, props.getUser.token)

        if (!changingPassword.err) {
          props.navigation.goBack()

        } else throw new Error("Şifreyi değiştirirken bir hatayla karşılaştık tekrar deneyiniz.")

      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")

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
          placeholder="Eski Şifre"
          secureTextEntry={true}
          textContentType="password"
          inputStyle={{ marginLeft: 5 }}
          maxLength={24}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          containerStyle={[styles.input, { borderColor: passBorder.oldPassBorder }]}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'oldPassword')}
        />

        <Input
          placeholder="Yeni Şifre"
          secureTextEntry={true}
          inputStyle={{ marginLeft: 5 }}
          textContentType="newPassword"
          maxLength={24}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          containerStyle={[styles.input, { borderColor: passBorder.newPassBorder }]}
          leftIcon={<Icon name="md-lock" size={24} color="black" />}
          onChangeText={value => changeText(value, 'newPassword')}
        />

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.buttonContainer} buttonStyle={styles.button} title="Şifreni Değiştir" onPress={() => getNewPassword()} />

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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassScreen);

