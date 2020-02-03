import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, phoneRegex } from '../../../regex/regex'
import styles from './style3'
import { removeUser } from '../../../store/user/actionCreator'
import * as Http from '../../../utils/httpHelper'
import { connect } from 'react-redux'
import { storeUserStorage, storeTokenStorage } from '../../../AsyncStorage/index'

const SignupScreen3 = props => {
  const [phone, setPhone] = useState("")
  const [err, setErr] = useState("")

  changeNumber = (value) => {
    setPhone(value)
  }

  sendSms = () => {

  }

  signUp = async () => {
    try {

      let user = Object.assign({}, props.getUser, { phone })
      user.deviceID = "STATIC DEVICEID"
      let res = await Http.postWithoutToken('auth/signup/', user)

      if (res.err) throw new Error()
      else {
        props.removeUser(user)
        props.navigation.navigate("Login")

      }
    } catch (err) {
      console.warn(err.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Signup2</Text>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          Hatalı Telefon Numarası Girdiniz.
        </Text>
      </View>

      <Input
        placeholder="+90 452 080 51 51"
        textContentType="telephoneNumber"
        inputStyle={{ marginLeft: 5 }}
        leftIcon={<Icon name="md-call" size={24} color="black" />}
        onChangeText={value => changeNumber(value)}
      />

      <Button containerStyle={styles.button} title="Kayıt Ol" onPress={() => signUp()} />

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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen3);
