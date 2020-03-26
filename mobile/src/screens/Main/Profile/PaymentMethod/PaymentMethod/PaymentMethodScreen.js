import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList, RefreshControl, Image } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Http from '../../../../../utils/httpHelper'
import { connect } from 'react-redux'
import creditCardImage from '../../../../../assets/images/creditCard.png'
import CreditCard from '../../../../../components/Profile/CreditCard'
import * as Colors from '../../../../../constStyle/colors'
import styles from './style'

const PaymentMethodScreen = props => {

  const [credCards, setCredCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")

  useEffect(() => {
    if (loading) getCredCards()
  }, [loading])

  getCredCards = async () => {
    try {
      setErr(false)
      setErrMessage("")
      let res = await Http.get(`main/profile/credit-cards?userID=${props.getUser.userID}`, props.getUser.token)

      if (!res.err) {
        setCredCards(res.credCards)
        setLoading(false)
      }
      else throw new Error("Bir hatayla karşılaştık. Lütfen sayfayı yenileyiniz.")

    } catch (err) {
      setErr(true)
      setErrMessage(err.message)
      setLoading(false)
    }
  }

  goAddCardScreen = () => {
    props.navigation.navigate("AddPaymentMethod")
  }

  goProfileMenu = () => {
    props.navigation.navigate("Profile")
  }
  onRefresh = () => {
    setCredCards([])
    setLoading(true)
  };

  removeCard = async (cardID) => {
    try {
      setErr(false)
      setErrMessage("")
      let res = await Http.delete(`main/profile/delete-credit-card?cardID=${cardID}`)

      if (!res.err) {
        setLoading(true)
      }
      else throw new Error("Bir hatayla karşılaştık. Lütfen sayfayı yenileyiniz.")

    } catch (err) {
      setErr(true)
      setErrMessage(err.message)
      setLoading(true)
    }
  }

  let main = credCards.length === 0 ?
    (
      <>
        <Image source={creditCardImage} style={styles.image} />
        <View style={styles.row}>
          <Text style={styles.text}>Tanımlı hiçbir kredi kartınızı bulamadık</Text>
          <Text style={styles.text}>Kart eklemek için kredi kartı ekle butonuna basabilirsiniz.</Text>
        </View>
      </>
    ) : (
      <FlatList
        data={credCards}
        showsVerticalScrollIndicator={false}
        style={styles.cardList}
        keyExtractor={item => item.cardID}
        renderItem={({ item }) =>
          <CreditCard
            titleText={item.name}
            subTitleText={item.number}
            removeClick={() => removeCard(item.cardID)} />
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />}
      />
    )

  return (
    <SafeAreaView style={styles.container}>

      {main}

      <Button
        icon={<Icon name="md-add" size={20} color="white" />}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        title="Add Credit Card"
        onPress={() => goAddCardScreen()}
        iconRight
      />

      <Button
        buttonStyle={{ backgroundColor: "red" }} containerStyle={styles.backButtonContainer}
        title="Go back" onPress={() => goProfileMenu()} />


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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen);
