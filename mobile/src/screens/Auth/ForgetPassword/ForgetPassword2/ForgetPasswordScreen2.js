import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import styles from './style'
import { otpRegex, validateRegex } from '../../../../regex/regex'
import * as Http from '../../../../utils/httpHelper'
import * as Colors from '../../../../constStyle/colors'
import { connect } from 'react-redux'

ForgetPasswordScreen2 = props => {
  const [err, setErr] = useState("")
  const [sentCode, setSentCode] = useState(null)
  const [count, setCount] = useState(0)
  const [errMessage, setErrMessage] = useState("")
  const [showSendButton, setShowSendButton] = useState(true)
  const [showVerifyButton, setShowVerifyButton] = useState(false)
  const [disable, setDisable] = useState(false)

  sendSms = async () => {
    try {
      await Http.postWithoutToken("auth/forget/send-otp", { phone: props.getUser.phone })
      setCount(0)
      setShowSendButton(false)
      setShowVerifyButton(true)
      setErr(false)
      setErrMessage("")
    } catch {
      setErrMessage("Kod yollanırken bir hatayla karşılaştık")
      setErr(true)
      setShowVerifyButton(false)
      setShowSendButton(true)
    }
  }

  changeNumber = (value) => {
    setSentCode(value)
  }

  checkCode = async () => {
    try {
      setErr(false)
      setErrMessage("")
      setDisable(true)
      setCount(count + 1)

      let codeValid = validateRegex(otpRegex, sentCode)

      if (count <= 3) {

        if (codeValid) {

          let check = await Http.postWithoutToken('auth/forget/check-otp', { phone: props.getUser.phone, code: sentCode })

          if (!check.err) {
            props.navigation.navigate("Forget3")

          } else throw new Error("Tek seferlik kod yanlış girildi")

        } else throw new Error("Yanlış 6 haneli kod girilmiştir, tekrar deneyiniz.")

      } else {
        setShowSendButton(true)
        setShowVerifyButton(false)
        throw new Error("Tek seferlik kod hakkınız bitmiştir. Lütfen tekrar kod yolla butonuna tıklayınız.")
      }
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

      <Button title="Onayla" disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} containerStyle={[{ display: showVerifyButton ? "flex" : "none" }, styles.button]} buttonStyle={{ backgroundColor: Colors.COLOR_BACKGROUND }} onPress={() => checkCode()} />

    </SafeAreaView>
  )
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(mapStateToProps)(ForgetPasswordScreen2);
