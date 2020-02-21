import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  orderList: {
    flex: 8,
    width: screenWidth,
    paddingHorizontal: 7
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  row: {
    flex: 2
  },
  text: {
    textAlign: "center"
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
