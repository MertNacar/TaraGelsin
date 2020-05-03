import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import * as Http from '../../../../utils/httpHelper'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import { connect } from 'react-redux'
import { Button, Text, Divider } from 'react-native-elements'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import IngredientCard from '../../../../components/FoodDetail/IngredientCard';
import ExtraCard from '../../../../components/FoodDetail/ExtraCard';
import { updateCart } from '../../../../store/cart/actionCreator';
const FoodDetailScreen = props => {
  const [loading, setLoading] = useState(true)
  const [food, setFood] = useState({})
  const [extras, setExtras] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [disable, setDisable] = useState(false)
  const [quantity, SetQuantity] = useState(1)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
    if (loading) {
      getFoodDetails()
    }
  }, [update])

  getFoodDetails = async () => {
    try {
      setLoading(true)
      let foodID = props.navigation.state.params.foodID
      let res = await Http.get(`shop/menu/categories/foods/foodDetails?foodID=${foodID}`, props.getUser.token)

      if (!res.err) {
        let selectedFood = props.getFoods.filter(item => item.foodID === foodID)
        let extras = res.food.Extras.map(item => {
          return { ...item, disable: false }
        })
        setExtras(extras)
        setIngredients(res.food.Ingredients)
        setFood(selectedFood[0])
        setLoading(false)

      } else throw new Error()
    } catch (err) {
      setLoading(false)
    }
  }

  addExtra = (id, disable) => {
    extras.find(item => item.extraID === id).disable = !disable
    setExtras(extras)
    setUpdate(Math.random())
  }


  addCart = () => {
    setDisable(true)
    let newFoodID = food.foodID
    let newCost = parseFloat(food.Branches[0].BranchFoods.cost)
    let selectedExtras = extras.filter(item => {
      if (item.disable === true) {
        newFoodID += ":" + item.extraID
        newCost += parseFloat(item.cost)
        return item
      } else return null
    })

    let newFood = Object.assign({}, food, { foodID: newFoodID, Branches: [{BranchFoods: { cost: newCost }}], extras: selectedExtras, quantity: quantity })
    props.updateCart(newFood)
    props.navigation.goBack()
  }

  changeQuantity = (type) => {
    if (type === "decrement") {
      if (quantity > 1) SetQuantity(quantity - 1)
    }
    else SetQuantity(quantity + 1)
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </SafeAreaView>
    )
  } else {
    let ingredientList = ingredients.map(item => {
      return (
        <View key={item.ingredientID}>
          <IngredientCard item={item} />
        </View>
      )
    })
    let extraList = extras.map(item => {
      return (
        <View key={item.extraID}>
          <ExtraCard item={item} disable={item.disable} addExtra={() => addExtra(item.extraID, item.disable)} />
        </View>
      )
    })
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>

          <View style={styles.card}>
            <Image style={styles.images} source={{ uri: PREFIX_IMAGEURL + food.imagePath }} />

            <View style={styles.rowMain}>

              <Text h4 h4Style={{ flex: 3 }}>{food.FoodName.name}</Text>
              <View style={styles.rowSecond}>
                <Text h4>{food.Branches[0].BranchFoods.cost} </Text>
                <IconAwe name="lira-sign" size={22} />
              </View>

            </View>

            <View style={styles.rowMain}>
              <Text style={{ fontWeight: "bold" }}>{food.description}}</Text>
            </View>

            <View style={styles.rowMain}>

              <Text h4 h4Style={{ flex: 3 }}>{food.calorie} kalori</Text>
              <View style={styles.rowSecond}>
                <Text h4>{food.preperationTime} dk </Text>
                <Icon name="md-time" size={26}></Icon>
              </View>

            </View>

            <Divider style={{ height: 2 }} />

          </View>

          <View style={styles.ingExtraMain}>

            <Text h4Style={{ textAlign: "center" }} h4>İçindekiler</Text>

            {
              ingredientList.length === 0 ?
                <Text>İçindekiler hakkında bir bilgi bulunamadı.</Text>
                :
                <View style={styles.list}>
                  {ingredientList}
                </View>
            }


            <Text h4Style={{ marginTop: 20, textAlign: "center" }} h4>Ekstralar</Text>

            {
              extraList.length === 0 ?
                <Text>Herhangi bir eklenecek ekstra bulunamadı.</Text>
                :
                <View style={styles.list}>
                  {extraList}
                </View>
            }


          </View>


          <View style={styles.rowMain}>

            <View style={{ flex: 1 }}>

              <Button buttonStyle={styles.buttonSmall} containerStyle={styles.buttonSmallContainer} title="-" onPress={() => changeQuantity("decrement")} />
            </View>

            <View style={{ flex: 1 }}>
              <Text h4 h4Style={{ textAlign: "center" }}>{quantity} Adet</Text>
            </View>


            <View style={{ flex: 1 }}>
              <Button buttonStyle={styles.buttonSmall} containerStyle={styles.buttonSmallContainer} title="+" onPress={() => changeQuantity("increment")} />
            </View>
          </View>

          <Button disabled={disable} disabledStyle={[styles.button, { opacity: 0.8 }]} containerStyle={styles.button} title="Sepete Ekle" onPress={() => addCart()} />

        </ScrollView >
      </SafeAreaView>
    )
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user,
    getFoods: state.foods,
    getCart: state.cart
  };
};


mapDispatchToProps = dispatch => {
  return {
    updateCart: food => dispatch(updateCart(food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);
