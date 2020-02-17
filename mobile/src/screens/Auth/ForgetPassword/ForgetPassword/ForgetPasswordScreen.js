import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, phoneRegex, emailRegex } from '../../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../../utils/httpHelper'
import CountryPicker from 'react-native-country-picker-modal'
import * as Colors from '../../../../constStyle/colors'
const ForgetPasswordScreen = props => {

  const [countryCode, setCountryCode] = useState('TR')
  const [country, setCountry] = useState({ callingCode: "90" })
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [borderColors, setBorderColors] = useState({ phoneBorder: Colors.COLOR_BACKGROUND, mailBorder: Colors.COLOR_BACKGROUND })

  changeText = (value, type) => {
    if (type === 'phone') {
      setPhone(country.callingCode + value)
    }
    else setEmail(value);
  };

  goLoginScreen = () => {
    props.navigation.navigate("Login")
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  setBorders = (verifyPhone, verifyMail) => {
    let phoneBorder = verifyPhone ? Colors.COLOR_BACKGROUND : "red"
    let mailBorder = verifyMail ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ phoneBorder, mailBorder })
  }

  goForgetScreen2 = async () => {
    try {
      setBorders(true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)

      let emailValidation = validateRegex(emailRegex, email)
      let phoneValidation = validateRegex(phoneRegex, phone)
      setBorders(phoneValidation, emailValidation)

      if (emailValidation && phoneValidation) {
        let checkUser = await Http.postWithoutToken("auth/forget/password", { email, phone })

        if (checkUser.err) throw new Error("Böyle bir telefon kullanılmamaktadır.")
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
          placeholder="Email"
          textContentType="emailAddress"
          underlineColorAndroid="transparent"
          maxLength={40}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          containerStyle={[styles.inputEmail, { borderColor: borderColors.mailBorder }]}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-mail" size={24} color="black" />}
          onChangeText={value => changeText(value, 'email')}
        />

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
            placeholder="452 080 51 51"
            textContentType="telephoneNumber"
            underlineColorAndroid="transparent"
            maxLength={10}
            keyboardType="numeric"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={[styles.inputPhone, { borderColor: borderColors.phoneBorder }]}
            inputStyle={{ paddingLeft: 7 }}
            leftIcon={<Icon name="md-call" size={24} color="black" />}
            onChangeText={value => changeText(value, 'phone')}
          />

        </View>



        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={styles.button} containerStyle={styles.buttonContainer} title="Devam Et" onPress={() => goForgetScreen2()} />

        <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} titleStyle={styles.textButtonInput} containerStyle={styles.textButtonContainer} type="clear" title="Şifren aklına mı geldi ?" onPress={() => goLoginScreen()} />

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
