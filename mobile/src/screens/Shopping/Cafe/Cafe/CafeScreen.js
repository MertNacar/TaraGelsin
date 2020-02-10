import React, { useState } from 'react'
import { View, Image, SafeAreaView } from 'react-native'
import { AirbnbRating, Text } from 'react-native-elements'
import { PREFIX_IMAGEURL } from 'react-native-dotenv'
import { connect } from 'react-redux'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'

const CafeScreen = props => {
  const [cafe, setCafe] = useState(props.getCafe)

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: PREFIX_IMAGEURL + cafe.cafeImagePath }} />

      <View style={styles.row}>
        <Text h4>
          {cafe.cafeName}
        </Text>
        <View>
          <Text h4>
            {cafe.cafePoint}
          </Text>
          <Icon name="md-star" size={30} color="orange" />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={{ fontWeight: "bold" }}>
          {cafe.cafeDescription}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={{ fontWeight: "bold" }}>
          {cafe.cafeAddress}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={{ fontWeight: "bold" }}>
          Oy VER
        </Text>
      </View>

    </SafeAreaView>
  )
}
mapStateToProps = state => {
  return {
    getUser: state.user,
    getCafe: state.cafe,
  };
};


mapDispatchToProps = dispatch => {
  return {
    updateCart: food => dispatch(updateCart(food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CafeScreen);