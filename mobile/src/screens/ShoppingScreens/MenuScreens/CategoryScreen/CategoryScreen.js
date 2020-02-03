import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
import styles from './style'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import CategoryCard from '../../../../components/Category/CategoryCard'
import { updateCategories, removeCategories } from '../../../../store/category/actionCreator'

const CategoryScreen = props => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading && props.getCategories.length === 0) {
      getCategories()
    }
  }, [loading])

  getCategories = async () => {
    try {
      let res = await Http.get(`shop/menu/categories?cafeID=${props.getCafe.cafeID}`, props.getUser.token)
      if (!res.err) {
        props.updateCategories(res.categories)
        setLoading(false)
      } else throw new Error("Beklenmedik bir hatayla karşılaştık.")
    } catch {
      //Pop up olabilir
    }
  }

  onRefresh = () => {
    setLoading(true)
    props.removeCategories()
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
          data={props.getCategories}
          style={styles.categoryList}
          renderItem={({ item }) =>
            <CategoryCard
              categoryLink={item.categoryImagePath}
              categoryName={item.categoryName}
              categoryID={item.categoryID}
              {...props} />
          }

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
    removeCategories: () => dispatch(removeCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
