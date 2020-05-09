import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import * as Http from '../../utils/httpHelper'
import { validateRegex, nameRegex, cardNumberRegex, cardDateRegex, cardCvvRegex } from '../../regex/regex'
import Icon from 'react-native-vector-icons/Ionicons'
import addedImage from '../../assets/images/verifiedPassword.png'
import * as Colors from '../../constStyle/colors'
import { connect } from 'react-redux'

const CardForm = (props) => {

  const [credCard, setCredCard] = useState({ name: "", number: "", cvv: "", date: "" });
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [done, setDone] = useState(false)
  const [borderColors, setBorderColors] = useState(
    {
      nameBorder: Colors.COLOR_BACKGROUND,
      numberBorder: Colors.COLOR_BACKGROUND,
      cvvBorder: Colors.COLOR_BACKGROUND,
      dateBorder: Colors.COLOR_BACKGROUND
    })

  setBorders = (verifyName, verifyNumber, verifyDate, verifyCvv) => {
    let nameBorder = verifyName ? Colors.COLOR_BACKGROUND : "red"
    let numberBorder = verifyNumber ? Colors.COLOR_BACKGROUND : "red"
    let dateBorder = verifyDate ? Colors.COLOR_BACKGROUND : "red"
    let cvvBorder = verifyCvv ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ nameBorder, numberBorder, dateBorder, cvvBorder })
  }

  changeCard = (value, type) => {
    setCredCard({ ...credCard, [type]: value })
  };

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
          setDone(true)

        } else throw new Error("Kredi kartı eklenirken bir hatayla karşılaştık")

      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  }
  if (done) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={addedImage} style={styles.image} />
        <View style={styles.doneRow}>
          <Text style={styles.text}>İşleminiz başarıyla tamamlandı.</Text>
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ display: err ? "flex" : "none" }}>
            <Text style={{ color: "red" }}>
              {errMessage}
            </Text>
          </View>

          <View style={styles.form}>

            <View style={styles.row}>

              <Input
                placeholder="Kart Sahibi"
                underlineColorAndroid="transparent"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                maxLength={20}
                inputStyle={{ marginLeft: 5 }}
                containerStyle={[styles.cardContainer, { borderColor: borderColors.nameBorder }]}
                leftIcon={<Icon name="md-person" size={24} color={Colors.COLOR_BACKGROUND} />}
                onChangeText={value => changeCard(value, 'name')}
              />
            </View>
            <View style={styles.row}>

              <Input
                placeholder="Kart Numarası"
                underlineColorAndroid="transparent"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                textContentType="creditCardNumber"
                maxLength={16}
                keyboardType="numeric"
                inputStyle={{ marginLeft: 5 }}
                containerStyle={[styles.cardContainer, { borderColor: borderColors.numberBorder }]}
                leftIcon={<Icon name="md-card" size={24} color={Colors.COLOR_BACKGROUND} />}
                onChangeText={value => changeCard(value, 'number')}
              />

            </View>

            <View style={styles.row}>

              <Input
                placeholder="Son Kullanma Tarihi"
                underlineColorAndroid="transparent"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                inputStyle={{ marginLeft: 5 }}
                maxLength={4}
                keyboardType="numeric"
                containerStyle={[styles.dateContainer, { borderColor: borderColors.dateBorder }]}
                leftIcon={<Icon name="md-calendar" size={24} color={Colors.COLOR_BACKGROUND} />}
                onChangeText={value => changeCard(value, 'date')}
              />

            </View>

            <View style={styles.row}>

              <Input
                placeholder="Cvv"
                underlineColorAndroid="transparent"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                maxLength={3}
                keyboardType="numeric"
                containerStyle={[styles.cvvContainer, { borderColor: borderColors.cvvBorder }]}
                onChangeText={value => changeCard(value, 'cvv')}
              />
            </View>

            <Button
              disabled={disable} disabledStyle={{ opacity: 0.8 }}
              buttonStyle={styles.addButton}
              title="Kredi Kartı Ekle" onPress={() => addCredCard()} />

          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  doneRow: {
    flex: 1.5,
    justifyContent: "center"
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  form: {
    marginTop: 15,
    alignItems: "center"
  },
  row: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardContainer: {
    width: "90%",
    marginBottom: 15,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  dateContainer: {
    width: "90%",
    marginBottom: 15,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },

  cvvContainer: {
    width: "90%",
    marginBottom: 15,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  addButton: {
    backgroundColor: Colors.COLOR_BACKGROUND
  }
})

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(mapStateToProps)(CardForm);
