import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, nameRegex, usernameRegex } from '../../../regex/regex'
import styles from './style'
import { updateUser } from '../../../store/user/actionCreator'
import { connect } from 'react-redux'
import * as Http from '../../../utils/httpHelper'

const SignupScreen = props => {

  const [informations, setInformations] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [user, setUser] = useState({ username: "", firstname: "", surname: "" });
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)

  changeText = (value, type) => {
    let newUser = Object.assign({}, user, { [type]: value })
    setUser(newUser)
  };

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
      userValidation = validateRegex(usernameRegex, user.username)
      firstValidation = validateRegex(nameRegex, user.firstname)
      surValidation = validateRegex(nameRegex, user.surname)

      if (userValidation && firstValidation && surValidation && conditions && informations) {
        let checkUsername = await Http.getWithoutToken(`auth/signup/validateUsername?username=${user.username}`)

        if (checkUsername.err) throw new Error("Girdiğiniz kullanıcı adı kullanılmaktadır.")
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

  goLoginScreen = () => {
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
            containerStyle={{ width: "50%" }}
            inputStyle={{ marginLeft: 5 }}
            onChangeText={value => changeText(value, 'firstname')}
          />

          <Input
            placeholder="Soyisim"
            textContentType="familyName"
            containerStyle={{ width: "50%" }}
            inputStyle={{ marginLeft: 5 }}
            onChangeText={value => changeText(value, 'surname')}
          />
        </View>


        <Input
          placeholder="Kullanıcı Adı"
          textContentType="username"
          containerStyle={styles.username}
          inputStyle={{ marginLeft: 5 }}
          onChangeText={value => changeText(value, 'username')}
        />

        <View style={styles.checks}>
          <CheckBox
            center
            title="Kullanım Koşulları ve Şartlarını Okudum"
            textStyle={{ width: "90%" }}
            checkedIcon={<Icon name="md-checkbox" size={24} color="black" />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color="black" />}
            checked={conditions}
            onPress={() => changeCondition()}
          />

          <CheckBox
            center
            title="KVKK Verilerimin işlenmesini onaylıyorum."
            textStyle={{ width: "90%" }}
            checkedIcon={<Icon name="md-checkbox" size={24} color="black" />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color="black" />}
            checked={informations}
            onPress={() => changeInformation()}
          />

          <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />

        </View>

        <Button disabled={disable} disabledTitleStyle={{ opacity: 0.8 }} title="Zaten üye misin ?" type="clear" onPress={() => goLoginScreen()} />

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
