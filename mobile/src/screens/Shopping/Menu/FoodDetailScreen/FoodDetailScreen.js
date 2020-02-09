import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import * as Http from '../../../../utils/httpHelper'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import { connect } from 'react-redux'
import { Button, Text } from 'react-native-elements'
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

  useEffect(() => {
    if (loading) {
      getFoodDetails()
    }
  }, [])

  getFoodDetails = async () => {
    try {
      setLoading(true)
      let foodID = props.navigation.state.params.foodID
      let res = await Http.get(`shop/menu/categories/foods/foodDetails?foodID=${foodID}`, props.getUser.token)

      if (!res.err) {
        let selectedFood = props.getFoods.filter(item => item.foodID === foodID)
        let extras = res.food.extras.map(item => {
          return { ...item, disable: false }
        })
        setExtras(extras)
        setIngredients(res.food.ingredients)
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
  }

  addCart = () => {
    setDisable(true)
    let selectedExtras = extras.filter(item => {
      return item.disable === true
    })
    let newFood = Object.assign({}, food, { extras: selectedExtras })
    props.updateCart([newFood])
    props.navigation.goBack()
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </SafeAreaView>
    )
  } else {
    let ingredientList = ingredients.map(item => {
      return <IngredientCard item={item} />
    })

    let extraList = extras.map(item => {
      return <ExtraCard extras={extras} item={item} addExtra={() => addExtra(item.extraID, item.disable)} />
    })
    console.log("hey")
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>

          <View style={styles.card}>
            <Image style={styles.images} source={{ uri: PREFIX_IMAGEURL + food.foodImagePath }} />

            <View style={styles.rowMain}>

              <Text h4>{food.foodName}</Text>
              <View style={styles.rowSecond}>
                <Text h4>{food.foodCost} </Text>
                <IconAwe name="lira-sign" size={22} />
              </View>

            </View>

            <View style={styles.rowMain}>
              <Text style={{ fontWeight: "bold" }}>{food.foodDescription}}</Text>
            </View>

            <View style={styles.rowMain}>

              <Text h4>{food.foodCal} calorie</Text>
              <View style={styles.rowSecond}>
                <Text h4>{food.foodPreperationTime} min </Text>
                <Icon name="md-time" size={26}></Icon>
              </View>

            </View>

          </View>

          <View style={{ flex: 1 }}>

            <View style={styles.list}>
              {ingredientList}
            </View>

            <View style={styles.list}>
              {extraList}
            </View>
            <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} containerStyle={styles.button} title="Sepete Ekle" onPress={() => addCart()} />
          </View>

        </ScrollView >
      </SafeAreaView>
    )
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user,
    getFoods: state.foods,
  };
};


mapDispatchToProps = dispatch => {
  return {
    updateCart: food => dispatch(updateCart(food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);
