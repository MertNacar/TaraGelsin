import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, FlatList, Image, ScrollView } from 'react-native'
import { Text, Overlay } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import OrderCard from '../../../../components/Cart/OrderCard'
import { connect } from 'react-redux'
import { updateCart, removeItem } from '../../../../store/cart/actionCreator'
import cartImage from '../../../../assets/images/cartImage.png'
import styles from './style'
import PaymentFooter from '../../../../components/Cart/PaymentFooter'
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'

const CartScreen = props => {

  const initialFood = {
    imagePath: "",
    FoodName: { name: "" },
    quantity: 0,
    calorie: "",
    preperationTime: "",
    Branches: [{ BranchFoods: { cost: 0 } }],
  }

  const [isEmpty, setIsEmpty] = useState(true)
  const [totalCost, setTotalCost] = useState(0)
  const [render, setRender] = useState("")
  const [visibleOverlay, setVisibleOverlay] = useState(false)
  const [overlayFood, setOverlayFood] = useState(initialFood)
  const [overlayExtras, setOverlayExtras] = useState([])


  useEffect(() => {
    if (props.getCart.length === 0) {
      setIsEmpty(true)
      setTotalCost(0)
    } else {
      setIsEmpty(false)
      changeTotalCost()
    }

  }, [props.getCart.length, render, props.isFocused])

  incQuantity = (food) => {
    props.updateCart({ ...food, quantity: 1 })
    setRender(Math.random())
  }

  decQuantity = (id) => {
    props.removeItem(id)
    setRender(Math.random())
  }

  goPayment = () => {
    props.navigation.navigate("Payment", { totalCost })
  }

  changeTotalCost = () => {
    let total = 0;
    props.getCart.map(item => {
      total += item.Branches[0].BranchFoods.cost * item.quantity
    })
    setTotalCost(total)
  }

  openFoodOverlay = (item) => {
    let overlayExtra = item.extras.map((item, i) => {
      return (
        <View style={styles.row}>
          <Text style={styles.text}>
            {(i + 1) + " - " + item.name}
          </Text>
        </View>
      )
    })
    setOverlayExtras(overlayExtra)
    setOverlayFood(item)
    setVisibleOverlay(true)
  }

  closeFoodOverlay = () => {
    setVisibleOverlay(false)
    setOverlayExtras([])
    setOverlayFood(initialFood)
  }

  if (isEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={cartImage} style={styles.image} />
        <View style={{ flex: 2 }}>
          <Text h4 h4Style={styles.h4Text}>Sepetiniz boş gözüküyor</Text>
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
              openFoodOverlay={() => openFoodOverlay(item)}
              incrementQuantity={() => incQuantity(item)}
              decrementQuantity={() => decQuantity(item.foodID)}
            />
          }
        />
        <Overlay
          isVisible={visibleOverlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="80%"
          height="80%"
          onBackdropPress={() => closeFoodOverlay()}
        >
          <View>
            <ScrollView>
              <View style={styles.row}>
                <Image
                  source={{ uri: PREFIX_IMAGEURL + overlayFood.imagePath }}
                  style={styles.overlayImage}
                />
              </View>

              <View style={styles.row}>
                <Text h4 h4Style={styles.h4Text}>
                  {overlayFood.FoodName.name}
                </Text>
              </View>

              <View style={styles.row}>

                <Text h4 h4Style={styles.h4Text}>
                  {overlayFood.Branches[0].BranchFoods.cost * overlayFood.quantity}
                </Text>

                <Icon name="lira-sign" size={18} />

              </View>

              <View style={styles.row}>
                <Text style={styles.text}>
                  {overlayFood.calorie * overlayFood.quantity} Kalori
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>
                  {overlayFood.preperationTime} dakika ve hazır!
                </Text>
              </View>

              <View style={styles.row}>
                <Text h4 h4Style={styles.h4Text}>
                  {
                    overlayExtras.length === 0 ? "" : "Extralar"
                  }
                </Text>
              </View>

              {overlayExtras}

              <View style={styles.row}>
                <Text style={styles.text}>
                  Değerler {overlayFood.quantity} adet üzerinden hesaplanmıştır.
              </Text>
              </View>

            </ScrollView>
          </View>
        </Overlay>

        <PaymentFooter total={totalCost} goPay={() => goPayment()} />
      </SafeAreaView >
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
    removeItem: id => dispatch(removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(CartScreen));


