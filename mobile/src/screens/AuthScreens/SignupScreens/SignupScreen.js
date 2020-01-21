import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, nameRegex, usernameRegex } from '../../../regex/regex'
import styles from './style'
const SignupScreen = props => {

  const [informations, setInformations] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [user, setUser] = useState({ username: "", firstname: "", surname: "" });
  const [err, setErr] = useState(false)

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
    userValidation = validateRegex(usernameRegex, user.username)
    firstValidation = validateRegex(nameRegex, user.firstname)
    surValidation = validateRegex(nameRegex, user.surname)
    console.log("user",user)
    console.log("cond",conditions)
    console.log("info",informations)
    console.log("err",user)
    if (userValidation && firstValidation && surValidation && conditions && informations) {
      setErr(false)
      //redux user ekleme
      props.navigation.navigate("Signup2")
    } else {
      setErr(true)
    }
  };

  goLoginScreen = () => {
    props.navigation.navigate("Login")
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text h3>SignupScreen</Text>

      <View style={{ display: err ? "flex" : "none" }}>
        <Text style={{ color: "red" }}>
          Bilgilerinizi kontrol ediniz.
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

          <Button containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />

        </View>

        <Button title="Zaten üye misin ?" type="clear" onPress={() => goLoginScreen()} />

      </View>
    </SafeAreaView>

  )
}

export default SignupScreen
