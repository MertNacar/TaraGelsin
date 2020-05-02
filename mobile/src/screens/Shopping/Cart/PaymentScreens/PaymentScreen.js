import React, { useState, useEffect } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text, Button, Overlay, Divider, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './style'
import CreditCard from '../../../../components/Payment/CreditCard'
import { CheckBox } from 'react-native-elements'
import * as Http from '../../../../utils/httpHelper'
import { validateRegex, nameRegex, cardNumberRegex, cardDateRegex, cardCvvRegex, commentRegex } from '../../../../regex/regex'
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import * as Colors from '../../../../constStyle/colors'
import { withNavigationFocus } from 'react-navigation';

const PaymentScreen = props => {
  const [totalCost, setTotalCost] = useState(0)
  const [discountCost, setDiscountCost] = useState(0)
  const [netCost, setNetCost] = useState(0)
  const [user] = useState(props.getUser)
  const [cards, setCards] = useState([])
  const [orderNote, setOrderNote] = useState(null)
  const [condition, setCondition] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [disable, setDisable] = useState(false)

  const [visibleOverlay, setVisibleOverlay] = useState(false)
  const [credCard, setCredCard] = useState({ name: "", number: "", cvv: "", date: "" });
  const [cardErr, setCardErr] = useState(false);
  const [cardErrMessage, setCardErrMessage] = useState("")
  const [cardDisable, setCardDisable] = useState(false)

  const [cardBorderColors, setCardBorderColors] = useState(
    {
      nameBorder: Colors.COLOR_BACKGROUND,
      numberBorder: Colors.COLOR_BACKGROUND,
      cvvBorder: Colors.COLOR_BACKGROUND,
      dateBorder: Colors.COLOR_BACKGROUND
    })

  const [borderColors, setBorderColors] = useState(
    {
      payBorder: Colors.COLOR_BACKGROUND,
      noteBorder: Colors.COLOR_BACKGROUND,
      condBorder: Colors.COLOR_BACKGROUND,
    })

  useEffect(() => {
    if (props.isFocused === true) {
      calculateCosts()
      fetchCreditCards()
    }
  }, [props.isFocused, cards.length])

  fetchCreditCards = async () => {
    try {
      let res = await Http.get(`shop/cart/get-credit-cards?userID=${user.userID}`, user.token)
      if (!res.err) setCards(res.cards)
      else throw new Error()
    } catch {
      //bir hatayla karşılaştık
    }
  }

  setCardBorders = (verifyName, verifyNumber, verifyDate, verifyCvv) => {
    let nameBorder = verifyName ? Colors.COLOR_BACKGROUND : "red"
    let numberBorder = verifyNumber ? Colors.COLOR_BACKGROUND : "red"
    let dateBorder = verifyDate ? Colors.COLOR_BACKGROUND : "red"
    let cvvBorder = verifyCvv ? Colors.COLOR_BACKGROUND : "red"
    setCardBorderColors({ nameBorder, numberBorder, dateBorder, cvvBorder })
  }

  changeCard = (value, type) => {
    setCredCard({ ...credCard, [type]: value })
  };

  addCredCard = async () => {
    try {
      setCardBorders(true, true, true, true)
      setCardDisable(true)
      setCardErrMessage("")
      setCardErr(false)
      let validateName = validateRegex(nameRegex, credCard.name)
      let validateNumber = validateRegex(cardNumberRegex, credCard.number)
      let validateDate = validateRegex(cardDateRegex, credCard.date)
      let validateCvv = validateRegex(cardCvvRegex, credCard.cvv)

      setCardBorders(validateName, validateNumber, validateDate, validateCvv)

      if (validateName && validateNumber && validateDate && validateCvv) {
        let res = await Http.post('main/profile/add-credit-card', { ...credCard, userID: props.getUser.userID }, props.getUser.token)

        if (!res.err) {
          setCardDisable(false)
          setCards([...cards, credCard])
          closeCardOverlay()

        } else throw new Error("Kredi kartı eklenirken bir hatayla karşılaştık")

      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch (err) {
      setCardDisable(false)
      setCardErrMessage(err.message)
      setCardErr(true)
    }
  }

  openCardOverlay = () => {
    setVisibleOverlay(true)
  }

  closeCardOverlay = () => {
    setVisibleOverlay(false)
  }

  calculateCosts = () => {
    let total = 0;
    props.getCart.map(item => {
      total += item.Branches[0].BranchFoods.cost * item.quantity
    })

    let discountAmount = ((props.getCafe.Cafe.discount + props.getCafe.Branch.discount) / 100) * total
    discountAmount = parseFloat(discountAmount.toFixed(2))
    let netSum = total - discountAmount
    setDiscountCost(discountAmount)
    setNetCost(netSum)
    setTotalCost(total)
  };

  changeCondition = () => {
    setCondition(!condition)
  };

  onChangeText = (text) => {
    setOrderNote(text)
  }

  setBorders = (verifyNote, verifyCond, verifyPay) => {
    let noteBorder = verifyNote ? Colors.COLOR_BACKGROUND : "red"
    let payBorder = verifyPay ? Colors.COLOR_BACKGROUND : "red"
    let condBorder = verifyCond ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ noteBorder, condBorder, payBorder })
  }

  giveOrder = async () => {
    try {
      setBorders(true, true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)

      let validateNote = validateRegex(commentRegex, credCard.name)

      setBorders(validateNote, validateCard)

      if (validateNote && validateCard && condition) {
        let res = await Http.post('main/profile/add-credit-card', { ...credCard, userID: props.getUser.userID }, props.getUser.token)

        if (!res.err) {
          setDisable(false)

        } else throw new Error("Kredi kartı eklenirken bir hatayla karşılaştık")

      } else throw new Error("Girdiğiniz bilgiler uygun değildir.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  }

  let cardList = cards.map((item, i) => {
    return (
      <TouchableOpacity key={i}>
        <View style={styles.creditCard}>
          <Divider style={styles.divider} />
          <CreditCard name={item.name} number={item.number} />
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.orderNote}>

          <Text style={styles.orderTitle}>Not Ekle</Text>

          <TextInput
            style={{ height: 80, borderColor: borderColors.noteBorder, borderWidth: 1 }}
            maxLength={120}
            placeholder="Sipariş notunu hemen ekle (en fazla 120 karakter / !?., geçerlidir)"
            onChangeText={text => onChangeText(text)}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.orderNote}>

          <Text style={styles.orderTitle}>Ödeme yöntemi seçiniz</Text>

          <View style={styles.cardList}>
            {cardList}
            <View>
              <Button
                type="clear"
                icon={<Icon name="md-add" size={26} color={Colors.COLOR_BACKGROUND} />}
                titleStyle={{ color: Colors.COLOR_BACKGROUND, marginLeft: 5 }}
                title="Kredi kartı eklemek için tıklayınız."
                onPress={() => openCardOverlay()}
              />
            </View>
          </View>

        </View>

        <Overlay
          isVisible={visibleOverlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="80%"
          height="80%"
          onBackdropPress={() => closeCardOverlay()}
        >
          <SafeAreaView>
            <ScrollView>
              <View style={{ display: cardErr ? "flex" : "none" }}>
                <Text style={{ color: "red" }}>
                  {cardErrMessage}
                </Text>
              </View>

              <View style={styles.form}>

                <View style={styles.row}>

                  <Input
                    placeholder="Card Name"
                    underlineColorAndroid="transparent"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    maxLength={20}
                    inputStyle={{ marginLeft: 5 }}
                    containerStyle={[styles.cardContainer, { borderColor: cardBorderColors.nameBorder }]}
                    leftIcon={<Icon name="md-person" size={24} color={Colors.COLOR_BACKGROUND} />}
                    onChangeText={value => changeCard(value, 'name')}
                  />
                </View>
                <View style={styles.row}>

                  <Input
                    placeholder="Card Number"
                    underlineColorAndroid="transparent"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    textContentType="creditCardNumber"
                    maxLength={16}
                    keyboardType="numeric"
                    inputStyle={{ marginLeft: 5 }}
                    containerStyle={[styles.cardContainer, { borderColor: cardBorderColors.numberBorder }]}
                    leftIcon={<Icon name="md-card" size={24} color={Colors.COLOR_BACKGROUND} />}
                    onChangeText={value => changeCard(value, 'number')}
                  />

                </View>

                <View style={styles.row}>

                  <Input
                    placeholder="Card Date"
                    underlineColorAndroid="transparent"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    inputStyle={{ marginLeft: 5 }}
                    maxLength={4}
                    keyboardType="numeric"
                    containerStyle={[styles.dateContainer, { borderColor: cardBorderColors.dateBorder }]}
                    leftIcon={<Icon name="md-calendar" size={24} color={Colors.COLOR_BACKGROUND} />}
                    onChangeText={value => changeCard(value, 'date')}
                  />

                </View>

                <View style={styles.row}>

                  <Input
                    placeholder="Card Cvv"
                    underlineColorAndroid="transparent"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    maxLength={3}
                    keyboardType="numeric"
                    containerStyle={[styles.cvvContainer, { borderColor: cardBorderColors.cvvBorder }]}
                    onChangeText={value => changeCard(value, 'cvv')}
                  />
                </View>

                <Button
                  disabled={cardDisable} disabledStyle={{ opacity: 0.8 }}
                  buttonStyle={styles.addButton}
                  title="Add Credit Card" onPress={() => addCredCard()} />

              </View>
            </ScrollView>
          </SafeAreaView>
        </Overlay>

        <View style={styles.orderSummary}>

          <View style={styles.row}>
            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>Sepette indirim</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{props.getCafe.Cafe.discount}</Text>
              <IconAwe name="percentage" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>Şube özel indirim</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{props.getCafe.Branch.discount}</Text>
              <IconAwe name="percentage" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>

            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>Toplam tutar</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{totalCost}</Text>
              <IconAwe name="lira-sign" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>

            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>İndirim miktarı</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{discountCost}</Text>
              <IconAwe name="lira-sign" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>

            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>Net tutar</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{netCost}</Text>
              <IconAwe name="lira-sign" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <CheckBox
            containerStyle={styles.containerCheck}
            wrapperStyle={{}}
            textStyle={{ color: borderColors.condBorder }}
            title="Satış sözlemesini okudum ve onaylıyorum."
            checkedIcon={<Icon name="md-checkbox" size={24} color={Colors.COLOR_BACKGROUND} />}
            uncheckedIcon={<Icon name="md-checkbox-outline" size={24} color={Colors.COLOR_BACKGROUND} />}
            checked={condition}
            onPress={() => changeCondition()}
          />

          <Button
            containerStyle={{ flex: 4, marginTop: 10 }} buttonStyle={{ width: "100%", backgroundColor: Colors.COLOR_BACKGROUND }}
            titleStyle={{ textAlign: "center" }} title="Sipariş Ver" onPress={() => giveOrder()} />

        </View>

      </ScrollView>
    </View>
  )
}


mapStateToProps = state => {
  return {
    getUser: state.user,
    getCafe: state.cafe,
    getFoods: state.foods,
    getCart: state.cart
  };
};


/*mapDispatchToProps = dispatch => {
  return {
    
  };
};*/

export default connect(mapStateToProps)(withNavigationFocus(PaymentScreen));


