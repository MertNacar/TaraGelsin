import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ActivityIndicator, Image, FlatList, RefreshControl, Text } from 'react-native'
import empty from '../../../../assets/images/empty.png'
import OrderCard from '../../../../components/Profile/OrderCard'
import * as Http from '../../../../utils/httpHelper'
import { COLOR_PRIMARY } from '../../../../constStyle/colors'
import { connect } from 'react-redux'
import styles from './style'

const OrderHistoryScreen = props => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      getHistory()
    }
  }, [loading])

  onRefresh = () => {
    setLoading(true)
    //setPage(0)
  }
  getHistory = async () => {
    try {
      let res = await Http.get(
        `main/profile/order-history?userID=${props.getUser.userID}&page=${0}#`,
        props.getUser.token)
      if (!res.err) {
        setOrders(res.orders)
        setLoading(false)
      } else throw new Error()
    } catch{
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </View>
    )
  } else if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={empty} style={styles.image} />
        <Text style={styles.text}>Geçmiş herhangi bir siparişiniz bulunamamıştır</Text>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          style={styles.historyList}
          keyExtractor={item => item.orderID}
          renderItem={({ item }) =>
            <OrderCard
              item={item}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />}
        />
      </SafeAreaView>
    )
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen);
