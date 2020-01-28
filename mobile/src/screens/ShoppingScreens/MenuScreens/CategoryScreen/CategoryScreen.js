import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import * as Http from '../../../../utils/httpHelper'
import { connect } from 'react-redux'
const CategoryScreen = props => {

  const [categories, setCategories] = useState("")

  useEffect(() => {
    getCategories()
    console.log(categories)
  }, [categories])

  getCategories = async () => {
    try {
      let res = await Http.get(`shop/menu/categories?cafeID=${props.getCafe.cafeID}`, props.getUser.token)
      if (!res.err) {
        //props.updateCategory(res.categories)
        setCategories(res.categories)
      } else throw new Error("Beklenmedik bir hatayla karşılaştık.")
    } catch {

    }
  }

  return (
    <View>
      <Text>CategoryScreen</Text>
      <View>
        <FlatList
          data={categories}
          renderItem={({ item }) => <Text>{item.categoryName}</Text>}
          keyExtractor={item => item.categoryID}
        />
      </View>
    </View>
  )
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
