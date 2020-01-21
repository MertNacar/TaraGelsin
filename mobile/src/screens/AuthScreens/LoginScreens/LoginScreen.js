import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, usernameRegex, passwordRegex } from '../../../regex/regex'
import { storeTokenStorage, storeUserStorage } from '../../../AsyncStorage'
import { postWithoutToken } from '../../../utils/httpHelper'
//import { UserContext } from '../../../store/user/context'
//import { updateUser } from '../../../store/user/actionCreator'

import styles from './style'

const LoginScreen = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

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
      validateUsername = validateRegex(usernameRegex, username)
      validatePassword = validateRegex(passwordRegex, password)

      if (validateUsername && validatePassword) {
        setErr(false)
        let result = await postWithoutToken('login', { username, password })

        if (!result.err) {
          await storeUserStorage(username)
          await storeTokenStorage(result.user.token)
          //REDUX EKLE
          props.navigation.navigate("Main")

        } else throw new Error()
      } else throw new Error()
    } catch (err) {
      console.log(err)
      setErr(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text h3>GİRİŞ</Text>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          Kullanıcı adı veya şifreniz yanlıştır.
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

        <Button containerStyle={styles.link} title="Giriş Yap" onPress={() => login()} />

      </View>
      <View style={styles.link}>

        <Button title="Şifremi unuttum ?" type="clear" onPress={() => goForgetScreen()} />

        <Button title="Kayıt Ol" type="clear" onPress={() => goSignupScreen()} />

      </View>

    </SafeAreaView>
  );
};

export default LoginScreen;
