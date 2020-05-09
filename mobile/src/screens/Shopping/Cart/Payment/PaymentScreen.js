import React, { useState, useEffect } from 'react'
import { View, ScrollView, TextInput, SafeAreaView } from 'react-native'
import { Text, Button, Overlay, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './style'
import CreditCard from '../../../../components/Payment/CreditCard'
import { CheckBox } from 'react-native-elements'
import * as Http from '../../../../utils/httpHelper'
import { validateRegex, commentRegex } from '../../../../regex/regex'
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import * as Colors from '../../../../constStyle/colors'
import { withNavigationFocus } from 'react-navigation'
import CardForm from '../../../../components/Cart/CardForm'

const PaymentScreen = props => {
  const [totalCost, setTotalCost] = useState(0)
  const [discountCost, setDiscountCost] = useState(0)
  const [netCost, setNetCost] = useState(0)
  const [user] = useState(props.getUser)
  const [cards, setCards] = useState([])
  const [orderNote, setOrderNote] = useState(null)
  const [condition, setCondition] = useState(false)
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [visibleOverlay, setVisibleOverlay] = useState(false)

  const [borderColors, setBorderColors] = useState(
    {
      payBorder: Colors.COLOR_BACKGROUND,
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
      let res = await Http.get(`main/profile/credit-cards?userID=${user.userID}`, user.token)
      if (!res.err) {
        let cards = res.cards.map(item => {
          return { ...item, selected: false }
        })
        setCards(cards)
      }
      else throw new Error()
    } catch {
      //bir hatayla karşılaştık
    }
  }

  openCardOverlay = () => {
    setVisibleOverlay(true)
  }

  closeCardOverlay = () => {
    setVisibleOverlay(false)
    fetchCreditCards()
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

  setBorders = (verifyPay, verifyCond) => {
    let payBorder = verifyPay ? Colors.COLOR_BACKGROUND : "red"
    let condBorder = verifyCond ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ payBorder, condBorder })
  }

  giveOrder = async () => {
    try {
      setBorders(true, true)
      setDisable(true)
      setErrMessage("")
      setErr(false)

      let selectedCard = cards.filter(item => item.selected === true)
      console.log('selectedCard', selectedCard)
      let validateCard = selectedCard.length === 1
      setBorders(validateCard, condition)

      let validateNote = validateRegex(commentRegex, orderNote)

      if (validateNote && validateCard && condition) {

        let foods = props.getCart.map(item => {
          return { foodID: item.foodID, quantity: item.quantity }
        })

        let place = {
          cafeID: props.getCafe.Cafe.cafeID,
          branchID: props.getCafe.Branch.branchID,
          sectionID: props.getCafe.Section.sectionID,
          tableID: props.getCafe.Table.tableID,
        }

        let userID = props.getUser.userID
        let cardID = selectedCard[0].cardID

        let res = await Http.post('shop/cart/make-payment', { place, cost: netCost, note: orderNote, foods, userID, cardID }, props.getUser.token)

        if (!res.err) {
          setDisable(false)
          props.navigation.navigate("PaymentFinish")

        } else throw new Error("Ödeme işlemimde bir hatayla karşılaştık")

      } else throw new Error("Bilgileri eksiksiz olarak doldurunuz.")
    } catch (err) {
      setDisable(false)
      setErrMessage(err.message)
      setErr(true)
    }
  }

  selectCard = (id) => {
    let newCards = cards.map(item => {
      if (id === item.cardID)
        return { ...item, selected: true }
      else
        return { ...item, selected: false }
    })
    setCards(newCards)
  }

  let cardList = cards.map((item, i) => {
    return (
      <CreditCard key={i} item={item} selectCard={() => selectCard(item.cardID)} />
    )
  })


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={{ display: err ? "flex" : "none" }}>
          <Text style={{ color: "red" }}>
            {errMessage}
          </Text>
        </View>

        <View style={styles.orderNote}>

          <Text style={styles.orderTitle}>Not Ekle</Text>

          <TextInput
            style={{ height: 80, borderWidth: 1 }}
            maxLength={120}
            placeholder="Sipariş notunu hemen ekle (en fazla 120 karakter / !?., geçerlidir)"
            onChangeText={text => onChangeText(text)}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.orderNote}>

          <Text style={[styles.orderTitle, { color: borderColors.payBorder }]}>Ödeme yöntemi seçiniz</Text>

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
          width="75%"
          height="65%"
          onBackdropPress={() => closeCardOverlay()}
        >
          <CardForm />
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
            containerStyle={{ flex: 4, marginVertical: 12 }} buttonStyle={{ width: "100%", backgroundColor: Colors.COLOR_BACKGROUND }}
            disabled={disable} disabledStyle={{ opacity: 0.8 }} titleStyle={{ textAlign: "center" }} title="Sipariş Ver" onPress={() => giveOrder()} />

        </View>

      </ScrollView>
    </SafeAreaView>
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



export default connect(mapStateToProps)(withNavigationFocus(PaymentScreen));


