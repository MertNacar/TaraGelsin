import React, { useState } from 'react'
import { View, Image, SafeAreaView } from 'react-native'
import { AirbnbRating, Text } from 'react-native-elements'
import { PREFIX_IMAGEURL } from 'react-native-dotenv'
import { connect } from 'react-redux'
import styles from './style'
const RatingScreen = props => {
  const [cafe, setCafe] = useState(props.getCafe)

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: PREFIX_IMAGEURL + cafe.cafeImagePath }} />

      <View style={styles.row}>
        <Text h4>
          {cafe.cafeName}
        </Text>
        <Text h4>
          {cafe.cafePoint}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={{ fontWeight: "bold" }}>
          {cafe.cafeDescription}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={{ fontWeight: "bold" }}>
          Cafeye oyunuzu bekliyoruz.
          </Text>

        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
          defaultRating={Math.round(cafe.cafePoint)}
          size={20}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(RatingScreen);
