import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, phoneRegex, usernameRegex } from '../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../utils/httpHelper'

const ForgetPasswordScreen = props => {

  const [user, setUser] = useState({ username: "", phone: "" })
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)

  changeText = (value, type) => {
    let newUser = Object.assign({}, user, { [type]: value })
    setUser(newUser)
  };

  goLoginScreen = () => {
    props.navigation.goBack()
  };

  goForgetScreen2 = async () => {
    try {
      setDisable(true)
      setErrMessage("")
      setErr(false)
      // phone validate düzenlenecek
      userValidation = validateRegex(usernameRegex, user.username)
      phoneValidation = validateRegex(usernameRegex, user.phone)

      if (userValidation && phoneValidation) {
        let checkUser = await Http.postWithoutToken("auth/forget/password/", user)

        if (checkUser.err) throw new Error("Böyle bir kullanıcı adı kullanılmamaktadır.")
        else {
          props.updateUser(checkUser.user)
          setDisable(false)
          props.navigation.navigate("Forget2")
        }

      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          {errMessage}
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Kullanıcı Adı"
          textContentType="username"
          containerStyle={{ paddingBottom: 15 }}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-person" size={24} color="black" />}
          onChangeText={value => changeText(value, 'username')}
        />

        <Input
          placeholder="+90 452 080 51 51"
          textContentType="telephoneNumber"
          containerStyle={{ paddingBottom: 15 }}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-call" size={24} color="black" />}
          onChangeText={value => changeText(value, 'phone')}
        />

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.button} title="Şifreni Al" onPress={() => goForgetScreen2()} />

        <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} type="clear" containerStyle={styles.buttonClear} title="Şifren aklına mı geldi ?" onPress={() => goLoginScreen()} />

      </View>

    </SafeAreaView>
  )
}

mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(null, mapDispatchToProps)(ForgetPasswordScreen);
