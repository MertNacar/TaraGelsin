import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import styles from './style'
import { otpRegex, validateRegex } from '../../../../regex/regex'
import { removeUser } from '../../../../store/user/actionCreator'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
import { getUniqueId } from 'react-native-device-info'
import * as Colors from '../../../../constStyle/colors'

const SignupScreen2 = props => {
  const [err, setErr] = useState("")
  const [sentCode, setSentCode] = useState(null)
  const [errMessage, setErrMessage] = useState("")
  const [showSendButton, setShowSendButton] = useState(true)
  const [showVerifyButton, setShowVerifyButton] = useState(false)
  const [disable, setDisable] = useState(false)

  sendSms = async () => {
    try {
      await Http.postWithoutToken("auth/signup/send-otp", { phone: props.getUser.phone })
      setShowSendButton(false)
      setShowVerifyButton(true)
      setErr(false)
      setErrMessage("")
    } catch {
      setErrMessage("Kod yollanırken bir hatayla karşılaştık")
      setErr(true)
    }
  }

  changeNumber = (value) => {
    setSentCode(value)
  }

  signUp = async () => {
    try {
      setErr(false)
      setErrMessage("")
      setDisable(true)

      let codeValid = validateRegex(otpRegex, sentCode)

      if (codeValid) {

        let check = await Http.postWithoutToken('auth/signup/check-otp', { phone: props.getUser.phone, code: sentCode })

        if (!check.err) {
          deviceID = getUniqueId()
          let res = await Http.postWithoutToken('auth/signup', { ...props.getUser, deviceID })

          if (!res.err) {
            props.removeUser()
            props.navigation.navigate("Signup3")

          } else throw new Error("Tek seferlik kodu alırken bir hata ile karşılaştık.")

        } else throw new Error("Tek seferlik kod yanlış girildi")

      } else throw new Error("Yanlış 6 haneli kod girilmiştir, tekrar deneyiniz.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ display: err ? "flex" : "none", width: "90%", marginBottom: 10 }}>
        <Text style={styles.errText}>
          {errMessage}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Telefonunuza kod gönderildi</Text>
        <Text style={styles.text}>Birkaç kez yanlış girmeniz durumunda</Text>
        <Text style={styles.text}>yeniden kod isteminiz gerekmektedir.</Text>
      </View>
      <Input
        disabled={showSendButton}
        placeholder="Tek seferlik kodunuzu giriniz."
        textContentType="oneTimeCode"
        keyboardType="numeric"
        containerStyle={styles.input}
        inputStyle={styles.inputText}
        maxLength={6}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        onChangeText={value => changeNumber(value)}
      />

      <Button title="Kod Yolla" containerStyle={[{ display: showSendButton ? "flex" : "none" }, styles.button]} buttonStyle={{ backgroundColor: Colors.COLOR_BACKGROUND }} onPress={() => sendSms()} />

      <Button title="Onayla" disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} containerStyle={[{ display: showVerifyButton ? "flex" : "none" }, styles.button]} buttonStyle={{ backgroundColor: Colors.COLOR_BACKGROUND }} onPress={() => signUp()} />

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
    removeUser: () => dispatch(removeUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen2);
