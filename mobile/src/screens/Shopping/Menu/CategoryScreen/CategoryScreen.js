import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
import styles from './style'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import CategoryCard from '../../../../components/Category/CategoryCard'
import { updateCategories, removeCategories } from '../../../../store/category/actionCreator'
import { removeFoods } from '../../../../store/food/actionCreator'

const CategoryScreen = props => {

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [threshold, setThreshold] = useState(0.25)

  useEffect(() => {
    if (loading && props.getCategories.length === 0) {
      getCategories()
    }
  }, [loading])

  handleLoadMore = () => { }
  getCategories = async () => {
    try {
      let res = await Http.get(`shop/menu/categories?cafeID=${props.getCafe.cafeID}&page=${page}#`, props.getUser.token)
      if (!res.err) {
        props.updateCategories(res.categories)
        setLoading(false)
      } else throw new Error("Beklenmedik bir hatayla karşılaştık.")
    } catch {
      //Pop up olabilir
    }
  }

  onRefresh = () => {
    props.removeCategories()
    setLoading(true)
  };

  goFood = (categoryID) => {
    props.removeFoods()
    props.navigation.navigate("Foods", { categoryID })
  }

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
          data={props.getCategories}
          showsVerticalScrollIndicator={false}
          style={styles.categoryList}
          renderItem={({ item }) =>
            <CategoryCard
              item={item}
              goFood={() => goFood(item.categoryID)}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={threshold}
          keyExtractor={item => item.categoryID}
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
    getCafe: state.cafe,
    getCategories: state.categories
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateCategories: category => dispatch(updateCategories(category)),
    removeCategories: () => dispatch(removeCategories()),
    removeFoods: () => dispatch(removeFoods())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
