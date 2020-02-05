import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import * as Http from '../../../../utils/httpHelper'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import { connect } from 'react-redux'
const FoodDetailScreen = props => {
  const [loading, setLoading] = useState(true)
  const [food, setFood] = useState({})

  useEffect(() => {
    getFoodDetails()
  }, [])

  getFoodDetails = async () => {
    try {
      setLoading(true)
      let foodID = props.navigation.state.params.foodID
      let res = await Http.get(`shop/menu/categories/foods/foodDetails?foodID=${foodID}`, props.getUser.token)

      if (!res.err) {
        let selectedFood = props.getFoods.filter(item => item.foodID === foodID)
        setFood({ ...selectedFood[0], extras: res.food.extras, ingredients: res.food.ingredients })
        setLoading(false)

      } else throw new Error()
    } catch (err) {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </View>
    )
  } else {
    console.log("food", food)
    return (
      <View>
        <View style={{ flex: 1 }}>

        </View>
        <Image style={{ width: 300, height: 250 }} source={{ uri: PREFIX_IMAGEURL + food.foodImagePath }} />
        <Text>foodName : {food.foodName}</Text>
        <Text>foodCost : {food.foodCost}</Text>
        <Text>foodDescription : {food.foodDescription}</Text>
        <Text>food is new :{food.isNewFood}</Text>
        <Text>food preparation time : {food.foodPreperationTime}</Text>
        <Text>food calori : {food.foodCal}</Text>
        <FlatList
          data={food.ingredients}
          style={{ flex: 1 }}
          renderItem={({ item }) =>
            <View style={{ flex: 1 }}>
              <Text>{item.ingredientName}</Text>
            </View>
          }
          keyExtractor={item => item.ingredientID}
        /*refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />}*/
        />

        <FlatList
          data={food.extras}
          style={{ flex: 1 }}
          renderItem={({ item }) =>
            <View style={{ flex: 1 }}>
              <Text>{item.extraName}</Text>
              <Text>{item.extraCost}</Text>
            </View>
          }
          keyExtractor={item => item.extraID}
        /*refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />}*/
        />

      </View >
    )
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user,
    getFoods: state.foods,
  };
};


export default connect(mapStateToProps)(FoodDetailScreen);
