import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button, Overlay } from 'react-native-elements'
import TermUse from '../../../../components/TermUse'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, nameRegex, phoneRegex, passwordRegex, emailRegex } from '../../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../../utils/httpHelper'
import CountryPicker from 'react-native-country-picker-modal'
import * as Colors from '../../../../constStyle/colors'
const SignupScreen = props => {

  const [visibleOverlay, setVisibleOverlay] = useState(false)
  const [countryCode, setCountryCode] = useState('TR')
  const [country, setCountry] = useState({ callingCode: '90' })
  const [informations, setInformations] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [user, setUser] = useState({ phone: "", email: "", firstname: "", surname: "", password: "" });
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [borderColors, setBorderColors] = useState(
    {
      firstBorder: Colors.COLOR_BACKGROUND,
      surBorder: Colors.COLOR_BACKGROUND,
      phoneBorder: Colors.COLOR_BACKGROUND,
      passBorder: Colors.COLOR_BACKGROUND,
      mailBorder: Colors.COLOR_BACKGROUND,
      condBorder: Colors.COLOR_BACKGROUND,
      infoBorder: Colors.COLOR_BACKGROUND
    })

  changeText = (value, type) => {
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

  setBorders = (verifyFirst, verifySur, verifyPhone, verifyPass, verifyMail, verifyCond, verifyInfo) => {
    let firstBorder = verifyFirst ? Colors.COLOR_BACKGROUND : "red"
    let surBorder = verifySur ? Colors.COLOR_BACKGROUND : "red"
    let phoneBorder = verifyPhone ? Colors.COLOR_BACKGROUND : "red"
    let passBorder = verifyPass ? Colors.COLOR_BACKGROUND : "red"
    let mailBorder = verifyMail ? Colors.COLOR_BACKGROUND : "red"
    let condBorder = verifyCond ? Colors.COLOR_BACKGROUND : "red"
    let infoBorder = verifyInfo ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ firstBorder, surBorder, phoneBorder, passBorder, mailBorder, condBorder, infoBorder })
  }

  continueSign = async () => {
    try {
      setBorders(true, true, true, true, true, true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)

      let firstValidation = validateRegex(nameRegex, user.firstname)
      let surValidation = validateRegex(nameRegex, user.surname)
      let phoneValidation = validateRegex(phoneRegex, country.callingCode + user.phone)
      let passValidation = validateRegex(passwordRegex, user.password)
      let emailValidation = validateRegex(emailRegex, user.email)
      setBorders(firstValidation, surValidation, phoneValidation, passValidation,
        emailValidation, conditions, informations)

      let validation = phoneValidation && firstValidation && surValidation
        && passValidation && emailValidation && conditions && informations

      if (validation) {
        let checking = await Http.postWithoutToken(`auth/signup/validate-phone-email`, { phone: country.callingCode + user.phone, email: user.email })

        if (checking.err) throw new Error("Girdiğiniz bilgiler kullanılmaktadır.")
        else {
          props.updateUser({ ...user, phone: country.callingCode + user.phone, countryName: countryCode })
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

  openOverlay = () => {
    setVisibleOverlay(true)
  }

  closeOverlay = () => {
    setVisibleOverlay(false)
  }

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
            containerStyle={[styles.name, { borderColor: borderColors.firstBorder }]}
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
            containerStyle={[styles.name, { borderColor: borderColors.surBorder }]}
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
              visible={false}
            />
          </View>
          <Input
            placeholder="555 454 45 45"
            textContentType="telephoneNumber"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={[styles.phone, { borderColor: borderColors.phoneBorder }]}
            maxLength={10}
            keyboardType="numeric"
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
          containerStyle={[styles.password, { borderColor: borderColors.passBorder }]}
          maxLength={24}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-lock" size={24} color={Colors.COLOR_BACKGROUND} />}
          onChangeText={value => changeText(value, 'password')}
        />

        <Input
          placeholder="E-posta"
          textContentType="emailAddress"
          containerStyle={[styles.password, { borderColor: borderColors.mailBorder }]}
          maxLength={40}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ marginLeft: 5 }}
          leftIcon={<Icon name="md-mail" size={24} color={Colors.COLOR_BACKGROUND} />}
          onChangeText={value => changeText(value, 'email')}
        />

        <View style={styles.checks}>
          <CheckBox
            center
            textStyle={{ color: borderColors.condBorder }}
            wrapperStyle={{ marginLeft: 10 }}
            title="Kullanım Koşulları ve Şartlarını okudum ve onaylıyorum."
            checkedIcon={<Icon name="md-checkbox" size={24} color={Colors.COLOR_BACKGROUND} />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color={Colors.COLOR_BACKGROUND} />}
            checked={conditions}
            onPress={() => changeCondition()}
          />
          <CheckBox
            center
            textStyle={{ color: borderColors.infoBorder }}
            wrapperStyle={{ marginLeft: 10 }}
            title="KVKK Verilerin işlenmesini okudum ve onaylıyorum."
            checkedIcon={<Icon name="md-checkbox" size={24} color={Colors.COLOR_BACKGROUND} />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color={Colors.COLOR_BACKGROUND} />}
            checked={informations}
            onPress={() => changeInformation()}
          />


          <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={{ backgroundColor: Colors.COLOR_BACKGROUND }} containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />

          <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} titleStyle={{ color: Colors.COLOR_BACKGROUND }} containerStyle={styles.button} title="Zaten üye misin ?" type="clear" onPress={() => goLogin()} />
          <Button titleStyle={{ fontSize: 12 }} style={{}} type="clear" onPress={() => openOverlay()} title="Kullanım Koşullarını ve KVKK Verilerin işlenmesi metinlerini görüntülemek için tıklayınız." />

        </View>

        <Overlay
          isVisible={visibleOverlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="80%"
          height="80%"
          onBackdropPress={() => closeOverlay()}
        >
         <TermUse />
        </Overlay>

      </View>

    </SafeAreaView >

  )
}

mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(null, mapDispatchToProps)(SignupScreen);
