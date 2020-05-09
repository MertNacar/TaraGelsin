import React, { useEffect } from 'react'
import { View, SafeAreaView, Image } from 'react-native'
import { Text, Button } from 'react-native-elements'
import styles from './style'
import verifiedUser from '../../../../assets/images/orderConfirmed.png'
import { removeCafe } from '../../../../store/cafe/actionCreator'
import { removeCart } from '../../../../store/cart/actionCreator'
import { removeCategories } from '../../../../store/category/actionCreator'
import { removeFoods } from '../../../../store/food/actionCreator'
import { connect } from 'react-redux'

PaymentFinishScreen = props => {

  goMain = () => {
    props.removeCafe()
    props.removeCart()
    props.removeCategories()
    props.removeFoods()
    props.navigation.navigate("Main")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={verifiedUser} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.text}>Ödeme işleminiz başarıyla gerçekleşmiştir.</Text>
        <Text style={styles.text}>Ana Ekrana direkt olarak dönmek için "Ana Ekrana dön" butonuna basabilirsiniz.</Text>
      </View>
      <Button buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} title="Ana Ekrana dön" onPress={() => goMain()} />
    </SafeAreaView>
  )
}
mapDispatchToProps = dispatch => {
  return {
    removeCafe: () => dispatch(removeCafe()),
    removeCart: () => dispatch(removeCart()),
    removeCategories: () => dispatch(removeCategories()),
    removeFoods: () => dispatch(removeFoods())
  };
};

export default connect(null, mapDispatchToProps)(PaymentFinishScreen);