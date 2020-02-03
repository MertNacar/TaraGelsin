import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
import styles from './style'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import FoodCard from '../../../../components/Food/FoodCard'
import { updateFoods, removeFoods } from '../../../../store/food/actionCreator'

const FoodScreen = props => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('getParam', props.navigation.getParam("categoryID"))
    console.log('props.getFoods', props.getFoods)
    if (loading) {
      getFoods()
    }
    return () => {
      props.removeFoods()
    }
  }, [loading])

  getFoods = async () => {
    try {
      categoryID = props.navigation.getParam("categoryID")
      let res = await Http.get(`shop/menu/categories/foods?categoryID=${categoryID}`, props.getUser.token)
      if (!res.err) {
        props.updateFoods(res.foods)
        setLoading(false)
      } else throw new Error("Beklenmedik bir hatayla karşılaştık.")
    } catch {
      //Pop up olabilir
    }
  }

  onRefresh = () => {
    setLoading(true)
    props.removeFoods()
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={props.getFoods}
          style={styles.foodList}
          renderItem={({ item }) =>
            <FoodCard
              foodLink={item.foodImagePath}
              foodName={item.foodName}
              foodID={item.foodID}
              {...props} />
          }
          numColumns={2}
          keyExtractor={item => item.foodID}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />}
        />
      </View>
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
