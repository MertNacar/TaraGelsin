import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { CheckBox, Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, nameRegex, usernameRegex } from '../../../regex/regex'
import styles from './style'
const SignupScreen = props => {

  const [checkInformations, setCheckInformations] = useState(false);
  const [checkConditions, setCheckConditions] = useState(false);
  const [user, setUser] = useState({ username: "", firstname: "", surname: "" });

  changeText = (value, type) => {
    let newUser = Object.assign({}, ...user, { [type]: value })
    setUser(newUser)
  };

  continueSign = () => {
    props.navigation.navigate("Signup2")
  };


  return (
    <SafeAreaView style={styles.container}>

      <Text h3>SignupScreen</Text>

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
            checked={checkConditions}
          />

          <CheckBox
            center
            title="KVKK Verilerimin işlenmesini onaylıyorum."
            textStyle={{ width: "90%" }}
            checkedIcon={<Icon name="md-checkbox" size={24} color="black" />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color="black" />}
            checked={checkInformations}
          />

          <Button containerStyle={styles.button} title="Devam et" onPress={() => continueSign()} />

        </View>



      </View>
    </SafeAreaView>

  )
}

export default SignupScreen
