import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, nameRegex, phoneRegex, passwordRegex, emailRegex } from '../../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../../utils/httpHelper'
import CountryPicker from 'react-native-country-picker-modal'
import * as Colors from '../../../../constStyle/colors'
const SignupScreen = props => {

  const [countryCode, setCountryCode] = useState('TR')
  const [country, setCountry] = useState(null)
  const [informations, setInformations] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [user, setUser] = useState({ phone: "", email: "", firstname: "", surname: "", password: "" });
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)

  changeText = (value, type) => {
    if (type === 'phone') value = "+" + country.callingCode + value
    let newUser = Object.assign({}, user, { [type]: value })
    setUser(newUser)
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  changeInformation = () => {
    setInformations(!informations)
  };

  changeCondition = () => {
    setConditions(!conditions)
  };

  continueSign = async () => {
    try {
      setDisable(true)
      setErrMessage("")
      setErr(false)

      let phoneValidation = validateRegex(phoneRegex, user.phone)
      let firstValidation = validateRegex(nameRegex, user.firstname)
      let surValidation = validateRegex(nameRegex, user.surname)
      let passValidation = validateRegex(passwordRegex, user.password)
      let emailValidation = validateRegex(emailRegex, user.email)

      let validation = phoneValidation && firstValidation && surValidation
        && passValidation && emailValidation && conditions && informations

      if (validation) {
        let checking = await Http.getWithoutToken(`auth/signup/validatePhoneEmail?phone=${user.phone}&email=${user.email}`)

        if (checking.err) throw new Error("Girdiğiniz bilgiler kullanılmaktadır.")
        else {
          props.updateUser(user)
          setDisable(false)
          props.navigation.navigate("Signup2")
        }

      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  };

  goLogin = () => {
    props.navigation.navigate("Login")
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          {errMessage}
        </Text>
      </View>

      <View style={styles.form}>

        <View style={styles.row}>
          <Input
            placeholder="İsim"
            textContentType="name"
            containerStyle={styles.name}
            inputStyle={{ marginLeft: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="md-person" size={24} color={Colors.COLOR_BACKGROUND} />}
            maxLength={20}
            onChangeText={value => changeText(value, 'firstname')}
          />
          <Input
            placeholder="Soyisim"
            textContentType="familyName"
            containerStyle={styles.name}
            inputStyle={{ marginLeft: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="md-people" size={24} color={Colors.COLOR_BACKGROUND} />}
            maxLength={20}
            onChangeText={value => changeText(value, 'surname')}
          />
        </View>


        <View style={styles.row}>
          <View style={styles.inputCountry}>
            <CountryPicker
              containerButtonStyle={{ alignItems: "center", paddingTop: 5 }}
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
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={styles.phone}
            maxLength={10}
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="md-call" size={24} color={Colors.COLOR_BACKGROUND} />}
            inputStyle={{ marginLeft: 5 }}
            onChangeText={value => changeText(value, 'phone')}
          />
        </View>

        <Input
          placeholder="Şifre"
          secureTextEntry={true}
          textContentType="password"
          containerStyle={styles.password}
          maxLength={24}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-lock" size={24} color={Colors.COLOR_BACKGROUND} />}
          onChangeText={value => changeText(value, 'password')}
        />

        <Input
          placeholder="Email"
          textContentType="emailAddress"
          containerStyle={styles.password}
          maxLength={40}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-mail" size={24} color={Colors.COLOR_BACKGROUND} />}
          onChangeText={value => changeText(value, 'email')}
        />

        <View style={styles.checks}>
          <CheckBox
            center
            title="Kullanım Koşulları ve Şartlarını okudum ve onaylıyorum."
            checkedIcon={<Icon name="md-checkbox" size={24} color={Colors.COLOR_BACKGROUND} />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color={Colors.COLOR_BACKGROUND} />}
            checked={conditions}
            onPress={() => changeCondition()}
          />
          <CheckBox
            center
            title="KVKK Verilerin işlenmesini okudum ve onaylıyorum."
            checkedIcon={<Icon name="md-checkbox" size={24} color={Colors.COLOR_BACKGROUND} />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color={Colors.COLOR_BACKGROUND} />}
            checked={informations}
            onPress={() => changeInformation()}
          />
          <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={{ backgroundColor: Colors.COLOR_BACKGROUND }} containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />
          <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} titleStyle={{ color: Colors.COLOR_BACKGROUND }} containerStyle={styles.button} title="Zaten üye misin ?" type="clear" onPress={() => goLogin()} />
        </View>

      </View>

    </SafeAreaView>

  )
}

mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(null, mapDispatchToProps)(SignupScreen);
