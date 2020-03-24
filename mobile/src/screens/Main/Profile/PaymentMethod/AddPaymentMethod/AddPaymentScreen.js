import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { validateRegex, cardNumberRegex, cardCvvRegex, cardDateRegex, nameRegex } from '../../../../../regex/regex'
import * as Http from '../../../../../utils/httpHelper'
import { updateUser } from '../../../../../store/user/actionCreator'
import { connect } from 'react-redux'
import styles from './style'
import * as Colors from '../../../../../constStyle/colors'

const AddPaymentScreen = props => {

  const [credCard, setCredCard] = useState({ name: "", number: "", cvv: "", date: "" });
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [borderColors, setBorderColors] = useState(
    {
      nameBorder: Colors.COLOR_BACKGROUND,
      numberBorder: Colors.COLOR_BACKGROUND,
      cvvBorder: Colors.COLOR_BACKGROUND,
      dateBorder: Colors.COLOR_BACKGROUND
    })

  changeText = (value, type) => {
    setCredCard({ ...credCard, [type]: value })
  };

  setBorders = (verifyName, verifyNumber, verifyDate, verifyCvv) => {
    let nameBorder = verifyName ? Colors.COLOR_BACKGROUND : "red"
    let numberBorder = verifyNumber ? Colors.COLOR_BACKGROUND : "red"
    let dateBorder = verifyDate ? Colors.COLOR_BACKGROUND : "red"
    let cvvBorder = verifyCvv ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ nameBorder, numberBorder, dateBorder, cvvBorder })
  }

  addCredCard = async () => {
    try {
      setBorders(true, true, true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)
      let validateName = validateRegex(nameRegex, credCard.name)
      let validateNumber = validateRegex(cardNumberRegex, credCard.number)
      let validateDate = validateRegex(cardDateRegex, credCard.date)
      let validateCvv = validateRegex(cardCvvRegex, credCard.cvv)
      setBorders(validateName, validateNumber, validateDate, validateCvv)

      if (validateName && validateNumber && validateDate && validateCvv) {
        let res = await Http.post('main/profile/add-credit-card', { ...credCard, userID: props.getUser.userID }, props.getUser.token)

        if (!res.err) {
          setDisable(false)
          props.navigation.goBack()

        } else throw new Error("Kredi kartı eklenirken bir hata ile karşılaştık")

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

        <View style={styles.inputs}>

          <Input
            placeholder="Card Name"
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            maxLength={20}
            inputStyle={{ marginLeft: 5 }}
            containerStyle={[styles.cardContainer, { borderColor: borderColors.nameBorder }]}
            leftIcon={<Icon name="md-person" size={24} color={Colors.COLOR_BACKGROUND} />}
            onChangeText={value => changeText(value, 'name')}
          />

          <Input
            placeholder="Card Number"
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            textContentType="creditCardNumber"
            maxLength={16}
            keyboardType="numeric"
            inputStyle={{ marginLeft: 5 }}
            containerStyle={[styles.cardContainer, { borderColor: borderColors.numberBorder }]}
            leftIcon={<Icon name="md-card" size={24} color={Colors.COLOR_BACKGROUND} />}
            onChangeText={value => changeText(value, 'number')}
          />


          <View style={styles.row}>

            <Input
              placeholder="Card Date"
              underlineColorAndroid="transparent"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={{ marginLeft: 5 }}
              maxLength={4}
              keyboardType="numeric"
              containerStyle={[styles.dateContainer, { borderColor: borderColors.dateBorder }]}
              leftIcon={<Icon name="md-calendar" size={24} color={Colors.COLOR_BACKGROUND} />}
              onChangeText={value => changeText(value, 'date')}
            />

            <Input
              placeholder="Card Cvv"
              underlineColorAndroid="transparent"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              maxLength={3}
              keyboardType="numeric"
              containerStyle={[styles.cvvContainer, { borderColor: borderColors.cvvBorder }]}
              onChangeText={value => changeText(value, 'cvv')}
            />

          </View>

        </View>

        <Button
          disabled={disable} disabledStyle={{ opacity: 0.8 }}
          buttonStyle={styles.addButton}
          title="Add Credit Card" onPress={() => addCredCard()} />

      </View>


    </SafeAreaView>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentScreen);
