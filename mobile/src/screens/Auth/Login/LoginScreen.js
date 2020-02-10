import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, phoneRegex, passwordRegex } from '../../../regex/regex'
import { storeTokenStorage, storePhoneStorage } from '../../../AsyncStorage'
import * as Http from '../../../utils/httpHelper'
import { updateUser } from '../../../store/user/actionCreator'
import { connect } from 'react-redux'
import styles from './style'
import * as Colors from '../../../constStyle/colors'
import CountryPicker from 'react-native-country-picker-modal'

const LoginScreen = props => {

  const [countryCode, setCountryCode] = useState('TR')
  const [country, setCountry] = useState(null)
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)

  changeText = (value, type) => {
    if (type === 'phone') {
      setPhone("+" + country.callingCode + value)
    }
    else setPassword(value);
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

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
      let validatePhone = validateRegex(phoneRegex, phone)
      let validatePassword = validateRegex(passwordRegex, password)

      if (validatePhone && validatePassword) {
        let result = await Http.postWithoutToken('auth/login', { phone, password })

        if (!result.err) {
          await storePhoneStorage(phone)
          await storeTokenStorage(result.user.token)
          props.updateUser(result.user)
          setDisable(false)
          props.navigation.navigate("Main")

        } else throw new Error("Yanlış kullanıcı adı veya şifre girdiniz.")
      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch {
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

        <View style={styles.inputs}>
          <View style={styles.row}>
            <View style={styles.inputCountry}>
              <CountryPicker
                containerButtonStyle={{ alignItems: "center", paddingTop: 10 }}
                countryCode={countryCode}
                withCallingCodeButton={true}
                withCallingCode={true}
                withAlphaFilter={true}
                withFilter={true}
                onSelect={value => onSelectCountry(value)}
                visible
              />

            </View>
            <Input
              placeholder="Phone"
              textContentType="telephoneNumber"
              underlineColorAndroid="transparent"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={{ marginLeft: 5 }}
              maxLength={10}
              containerStyle={styles.inputPhone}
              leftIcon={<Icon name="md-call" size={24} color={Colors.COLOR_BACKGROUND} />}
              onChangeText={value => changeText(value, 'phone')}
            />

          </View>
          <Input
            placeholder="Şifre"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            textContentType="password"
            maxLength={24}
            inputStyle={{ marginLeft: 5 }}
            containerStyle={styles.inputPassword}
            leftIcon={<Icon name="md-lock" size={24} color={Colors.COLOR_BACKGROUND} />}
            onChangeText={value => changeText(value, 'password')}
          />
        </View>

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.link} buttonStyle={styles.loginButton} title="Giriş Yap" onPress={() => login()} />

      </View>
      <View style={styles.link}>

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} titleStyle={{ color: Colors.COLOR_BACKGROUND }} title="Şifremi unuttum ?" type="clear" onPress={() => goForgetScreen()} />

        <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} titleStyle={{ color: Colors.COLOR_BACKGROUND }} title="Kayıt Ol" type="clear" onPress={() => goSignupScreen()} />

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
