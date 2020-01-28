import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
import styles from './style'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'

const CategoryScreen = props => {

  const [categories, setCategories] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      getCategories()
    }
  }, [loading])

  getCategories = async () => {
    try {
      let res = await Http.get(`shop/menu/categories?cafeID=${props.getCafe.cafeID}`, props.getUser.token)
      if (!res.err) {
        setCategories(res.categories)
        setLoading(false)
      } else throw new Error("Beklenmedik bir hatayla karşılaştık.")
    } catch {
      //Pop up olabilir
    }
  }

  //adding to ıcon
  goTopList = () => {
    listRef.scrollToOffset({ x: 0, y: 0 })
  }

  onRefresh = () => {
    setLoading(true)
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </View>
    )
  } else {
    return (
      <View>
        <Text>CategoryScreen</Text>
        <View>
          <FlatList
            data={categories}
            ref={(ref) => { listRef = ref }}
            renderItem={({ item }) => <Text>{item.categoryName}</Text>}
            keyExtractor={item => item.categoryID}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
              />}
          />
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user,
    getCafe: state.cafe
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateCategory: category => dispatch(updateCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
