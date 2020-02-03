import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  foodList: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 7
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
