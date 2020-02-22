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
const ProfileUpdateScreen = props => {

  const [countryName, setCountryName] = useState(props.getUser.countryName)
  const [country, setCountry] = useState({ callingCode: props.getUser.phoneCode })
  const [user, setUser] = useState({ phone: "", email: "", firstname: "", surname: "", });
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(true)
  const [initial, setInitial] = useState({})
  const [borderColors, setBorderColors] = useState(
    {
      firstBorder: Colors.COLOR_BACKGROUND,
      surBorder: Colors.COLOR_BACKGROUND,
      phoneBorder: Colors.COLOR_BACKGROUND,
      mailBorder: Colors.COLOR_BACKGROUND,
    })

  useEffect(() => {
    let full = props.getUser.fullname.split(" ")
    let phone = props.getUser.phone.substr(props.getUser.phoneCode.length)
    let newUser = {
      phone: phone, email: props.getUser.email,
      firstname: full[0], surname: full[1],
      countryName: props.getUser.countryName, phoneCode: props.getUser.phoneCode
    }
    setUser(newUser)
    setInitial(newUser)
    return () => {
      setDisable(false)
    };
  }, [])

  changeText = (value, type) => {
    if (type === 'country') {
      setUser({ ...user, countryName: value.cca2, phoneCode: value.callingCode })
    } else {
      let newUser = Object.assign({}, user, { [type]: value })
      setUser(newUser)
    }
    setDisable(false)
  };

  setBorders = (verifyFirst, verifySur, verifyPhone, verifyMail) => {
    let firstBorder = verifyFirst ? Colors.COLOR_BACKGROUND : "red"
    let surBorder = verifySur ? Colors.COLOR_BACKGROUND : "red"
    let phoneBorder = verifyPhone ? Colors.COLOR_BACKGROUND : "red"
    let mailBorder = verifyMail ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ firstBorder, surBorder, phoneBorder, mailBorder })
  }

  updateInfos = async () => {
    try {
      console.log('user', user)
      console.log('initialr', initial)
      let unchanging = Object.values(initial) === Object.values(user)
      console.log('unchanging', unchanging)
      setBorders(true, true, true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)

      let firstValidation = validateRegex(nameRegex, user.firstname)
      let surValidation = validateRegex(nameRegex, user.surname)
      let phoneValidation = validateRegex(phoneRegex, user.phoneCode + user.phone)
      let emailValidation = validateRegex(emailRegex, user.email)

      setBorders(firstValidation, surValidation, phoneValidation, emailValidation)

      let validation = phoneValidation && firstValidation && surValidation && emailValidation

      if (unchanging) props.navigation.goBack()
      else {
        if (validation) {
          let res = await Http.put(`main/profile/update-user`, { user, initial }, props.getUser.token)

          if (res.err) throw new Error("Girdiğiniz bilgiler kullanılmaktadır.")
          else {
            props.updateUser({ ...res.user, countryName: user.countryName, phoneCode: user.phoneCode })
            props.navigation.goBack()
          }

        } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
      }
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
            defaultValue={user.firstname}
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
            defaultValue={user.surname}
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
              containerButtonStyle={{ alignItems: "center", paddingTop: "7%" }}
              countryCode={countryName}
              withCallingCodeButton={true}
              withCallingCode={true}
              withAlphaFilter={true}
              withFilter={true}
              onSelect={value => changeText(value, 'country')}
              visible
            />
          </View>

          <Input
            placeholder="Phone"
            textContentType="telephoneNumber"
            defaultValue={user.phone}
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

        <View style={styles.row}>
          <Input
            placeholder="Email"
            textContentType="emailAddress"
            defaultValue={user.email}
            containerStyle={[styles.password, { borderColor: borderColors.mailBorder }]}
            maxLength={40}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ marginLeft: 5 }}
            leftIcon={<Icon name="md-mail" size={24} color={Colors.COLOR_BACKGROUND} />}
            onChangeText={value => changeText(value, 'email')}
          />
        </View>

        <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={{ backgroundColor: Colors.COLOR_BACKGROUND }} containerStyle={styles.button} title="Güncelle" onPress={() => updateInfos()} />

      </View>


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
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdateScreen);
