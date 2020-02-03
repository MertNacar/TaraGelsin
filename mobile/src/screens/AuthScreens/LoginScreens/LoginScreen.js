import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, usernameRegex, passwordRegex } from '../../../regex/regex'
import { storeTokenStorage, storeUserStorage } from '../../../AsyncStorage'
import * as Http from '../../../utils/httpHelper'
import { updateUser } from '../../../store/user/actionCreator'
import { connect } from 'react-redux'
import styles from './style'

const LoginScreen = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)

  changeText = (value, type) => {
    if (type === 'username') setUsername(value)
    else setPassword(value);
  };

  goSignupScreen = () => {
    props.navigation.navigate("Signup")
  };

  goForgetScreen = () => {
    props.navigation.navigate("Forget")
  };

  login = async () => {
    try {
      setDisable(true)
      setErrMessage("")
      setErr(false)

      validateUsername = validateRegex(usernameRegex, username)
      validatePassword = validateRegex(passwordRegex, password)
      console.log('validateUsername', validateUsername)
      console.log('validatePassword', validatePassword)
      if (validateUsername && validatePassword) {
        let result = await Http.postWithoutToken('auth/login', { username, password })

        if (!result.err) {
          await storeUserStorage(username)
          await storeTokenStorage(result.user.token)
          props.updateUser(result.user)
          setDisable(false)
          props.navigation.navigate("Main")

        } else throw new Error("Yanlış kullanıcı adı veya şifre girdiniz.")
      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text h3>GİRİŞ</Text>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          {errMessage}
        </Text>
      </View>

      <View style={styles.form}>

        <View style={styles.inputs}>
          <Input
            placeholder="Kullanıcı Adı"
            textContentType="username"
            inputStyle={{ marginLeft: 5 }}
            leftIcon={<Icon name="md-person" size={24} color="black" />}
            onChangeText={value => changeText(value, 'username')}
          />

          <Input
            placeholder="Şifre"
            secureTextEntry={true}
            textContentType="password"
            inputStyle={{ marginLeft: 5 }}
            leftIcon={<Icon name="md-lock" size={24} color="black" />}
            onChangeText={value => changeText(value, 'password')}
          />
        </View>

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.link} title="Giriş Yap" onPress={() => login()} />

      </View>
      <View style={styles.link}>

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} title="Şifremi unuttum ?" type="clear" onPress={() => goForgetScreen()} />

        <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} title="Kayıt Ol" type="clear" onPress={() => goSignupScreen()} />

      </View>

    </SafeAreaView>
  );
};


mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
