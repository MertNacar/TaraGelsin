import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, FlatList, Image } from 'react-native'
import { Text, Button } from 'react-native-elements'
import OrderCard from '../../../../components/Cart/OrderCard'
import { connect } from 'react-redux'
import { updateCart, removeCart } from '../../../../store/cart/actionCreator'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import cartImage from '../../../../assets/images/cartImage.png'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './style'

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

  incrementQuantity = (id, quantity) => {
    props.getCart.find(item => item.foodID === id).foodQuantity = quantity + 1
    setUpdate("increment")
  }

  decrementQuantity = (id, quantity) => {
    if (quantity === 1) {
      props.removeCart()
      let newCart = props.getCart.filter(item => item.foodID !== id)
      props.updateCart(newCart)
    } else {
      props.getCart.find(item => item.foodID === id).foodQuantity = quantity - 1
    }
    setUpdate("decrement")
  }

  goPayment = () => {
    props.navigation.navigate("Payment")
  }

  changeTotalCost = () => {
    let total
    if (props.getCart.length > 1) {
      total = props.getCart.reduce((acc, current) => {
        (acc.foodCost * acc.foodQuantity) + (current.foodCost * current.foodQuantity)
        setTotalCost(total)
      })
    } else {
      total = props.getCart[0].foodCost * props.getCart[0].foodQuantity
      setTotalCost(total)
    }
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
              incrementQuantity={() => incrementQuantity(item.foodID, item.foodQuantity)}
              decrementQuantity={() => decrementQuantity(item.foodID, item.foodQuantity)}
            />
          }
          ListFooterComponent={
            <View style={styles.footerContainer}>
              <View>
                <Icon name="md-cart" size={16} />
                <Text>{totalCost}</Text>
              </View>
              <Button
                /*buttonStyle={styles.buttonStyle} 
                containerStyle={styles.buttonContainer} */
                title="Ödemeye geç"
                onPress={() => goPayment()} />
            </View>
          }
        />
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


