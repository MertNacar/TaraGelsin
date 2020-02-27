import React, { useState, useEffect } from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { Text, Button, ListItem, Overlay, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './style'
import CreditCard from '../../../../components/Payment/CreditCard'
import { CheckBox } from 'react-native-elements'
import * as Http from '../../../../utils/httpHelper'
import { validateRegex, commentRegex } from '../../../../regex/regex'
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import * as Colors from '../../../../constStyle/colors'

const PaymentScreen = props => {
  const [totalCost, setTotalCost] = useState(null)
  const [orderNote, setOrderNote] = useState(null)
  const [cards, setCards] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [condition, setCondition] = useState(false)
  const [borderColors, setBorderColors] = useState(
    {
      noteBorder: Colors.COLOR_BACKGROUND,
      condBorder: Colors.COLOR_BACKGROUND,
    })

  useEffect(() => {
    console.log('props', props)
    setTotalCost(props.navigation.state.params.totalCost)
    fetchCreditCards()
  }, [])

  fetchCreditCards = async () => {
    try {
      let res = await Http.get("shop/cart/credit-card", props.getUser.token)
      if (!res.err) setCards(res.cards)
      else throw new Error()
    } catch {
      //bir hatayla karşılaştık
    }
  }

  changeCondition = () => {
    setCondition(!condition)
  };

  onChangeText = (text) => {
    setOrderNote(text)
  }

  setBorders = (verifyNote, verifyCond) => {
    let noteBorder = verifyNote ? Colors.COLOR_BACKGROUND : "red"
    let condBorder = verifyCond ? Colors.COLOR_BACKGROUND : "red"
    setBorderColors({ noteBorder, condBorder })
  }


  giveOrder = () => {

  }

  addCredCard = () => {

  }

  let cardList = cards.map(item => {
    return (
      <View style={styles.creditCard}>
        <CreditCard name={item.cardName} />
        <Divider style={styles.divider} />
      </View>
    )
  })

  let discountAmount = props.getCafe.cafeDiscount * totalCost
  let netSum = totalCost - (props.getCafe.cafeDiscount * totalCost)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View><Text> Cafe: {props.getCafe.cafeName}</Text></View>

        <View><Text> Table: {props.getCafe.tableName}</Text></View>

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
              <ListItem
                leftIcon={<Icon name="md-add" size={26} color={Colors.COLOR_BACKGROUND} />}
                title="Kredi kartı eklemek için tıklayınız."
                onPress={() => addCredCard()}
              />
            </View>
          </View>

        </View>

        <View style={styles.orderSummary}>

          <View style={styles.row}>
            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>Sepette indirim yüzdesi</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{props.getCafe.cafeDiscount}</Text>
              <IconAwe name="percentage" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>

            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>İndirim miktarı</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{discountAmount}</Text>
              <IconAwe name="lira-sign" size={14} />
            </View>

          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>

            <View style={styles.rowFirst}>
              <Text style={styles.summaryText}>Ödenecek net tutar</Text>
            </View>

            <View style={styles.rowSecond}>
              <Text style={styles.summaryText}>{netSum}</Text>
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

export default connect(mapStateToProps)(PaymentScreen);


