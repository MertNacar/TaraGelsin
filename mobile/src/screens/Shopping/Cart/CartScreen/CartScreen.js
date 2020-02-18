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

  useEffect(() => {
    if (props.getCart.length === 0) setIsEmpty(true)
    else setIsEmpty(false)
  }, [props.getCart.length])

  incrementQuantity = (id, quantity) => {
    props.getCart.find(item => item.foodID === id).foodQuantity = quantity + 1
  }

  decrementQuantity = (id, quantity) => {
    if (quantity === 1) {
      props.removeCart()
      let newCart = props.getCart.filter(item => item.foodID !== id)
      props.updateCart(newCart)
    } else {
      props.getCart.find(item => item.foodID === id).foodQuantity = quantity - 1
    }
  }

  goPayment = () => {
    props.navigation.navigate("Payment")
  }

  getTotalCost = () => {
    let cart = props.getCart
    if (cart.length > 1) {
      return a.reduce((acc, current) => {
        (acc.foodCost * acc.foodQuantity) + (current.foodCost * current.foodQuantity)
      })
    } else return cart[0].foodCost * cart[0].foodQuantity
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
                <Text>{getTotalCost()}</Text>
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


