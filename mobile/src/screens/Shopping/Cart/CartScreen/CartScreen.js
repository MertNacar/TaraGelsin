import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, FlatList, Image } from 'react-native'
import { Text, Button } from 'react-native-elements'
import OrderCard from '../../../../components/Cart/OrderCard'
import { connect } from 'react-redux'
import { updateCart, removeCart } from '../../../../store/cart/actionCreator'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import cartImage from '../../../../assets/images/cartImage.png'

import styles from './style'
import PaymentFooter from '../../../../components/Cart/PaymentFooter'

const CartScreen = props => {

  const [isEmpty, setIsEmpty] = useState(true)
  const [totalCost, setTotalCost] = useState(0)
  const [update, setUpdate] = useState("")

  useEffect(() => {
    if (props.getCart.length === 0) {
      setIsEmpty(true)
      setTotalCost(0)
    }
    else {
      setIsEmpty(false)
      changeTotalCost()
    }
  }, [props.getCart.length, update])

  incQuantity = (id, quantity) => {
    props.getCart.find(item => item.foodID === id).foodQuantity = quantity + 1
    setUpdate(quantity)
  }

  decQuantity = (id, quantity) => {
    if (quantity === 1) {
      props.removeCart()
      let newCart = props.getCart.filter(item => item.foodID !== id)
      props.updateCart(newCart)
    } else {
      props.getCart.find(item => item.foodID === id).foodQuantity = quantity - 1
    }
    setUpdate(quantity)
  }

  goPayment = () => {
    props.navigation.navigate("Payment", { totalCost })
  }

  changeTotalCost = () => {
    let total = 0;
    props.getCart.map(item => {
      total += +(item.foodCost) * item.foodQuantity
    })
    setTotalCost(total)
  }

  if (isEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={cartImage} style={styles.image} />
        <View style={styles.row}>
          <Text h4 h4Style={styles.text}>Sepetiniz boş gözüküyor</Text>
          <Text style={styles.text}>Yiyecek ve içecek eklemek için menu ekranına gidiniz.</Text>
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={props.getCart}
          showsVerticalScrollIndicator={false}
          style={styles.orderList}
          keyExtractor={item => item.foodID}
          renderItem={({ item }) =>
            <OrderCard
              item={item}
              incrementQuantity={() => incQuantity(item.foodID, item.foodQuantity)}
              decrementQuantity={() => decQuantity(item.foodID, item.foodQuantity)}
            />
          }
        />
        <PaymentFooter total={totalCost} goPay={() => goPayment()} />
      </SafeAreaView>
    )
  }
}


mapStateToProps = state => {
  return {
    getCart: state.cart
  };
};


mapDispatchToProps = dispatch => {
  return {
    updateCart: food => dispatch(updateCart(food)),
    removeCart: () => dispatch(removeCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);


