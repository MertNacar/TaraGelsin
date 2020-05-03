import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, ActivityIndicator, SafeAreaView } from 'react-native'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
import styles from './style'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import FoodCard from '../../../../components/Food/FoodCard'
import { updateFoods, removeFoods } from '../../../../store/food/actionCreator'

const FoodScreen = props => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      getFoods()
    }
  }, [loading])

  getFoods = async () => {
    try {
      let categoryID = props.navigation.state.params.categoryID
      let res = await Http.get(`shop/menu/categories/foods?categoryID=${categoryID}&page=${0}`, props.getUser.token)
      if (!res.err) {
        props.updateFoods(res.foods)
        setLoading(false)
      } else throw new Error("Beklenmedik bir hatayla karşılaştık.")
    } catch {
    }
  }

  goFoodDetails = (foodID) => {
    props.navigation.navigate("FoodDetails", { foodID })
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={props.getFoods}
          style={styles.foodList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <FoodCard
              food={item}
              goFoodDetails={() => goFoodDetails(item.foodID)}
            />
          }
          keyExtractor={item => item.foodID}
        />
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
    updateFoods: food => dispatch(updateFoods(food)),
    removeFoods: () => dispatch(removeFoods())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen);
