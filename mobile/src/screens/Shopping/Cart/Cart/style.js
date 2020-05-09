import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  orderList: {
    flex: 12,
    width: screenWidth,
    marginBottom: "15%"
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  row: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 16
  },
  h4Text: {
    textAlign: "center"
  },
  overlayImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain"
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
