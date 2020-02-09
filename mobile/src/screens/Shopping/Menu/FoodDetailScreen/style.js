import { StyleSheet, Dimensions } from 'react-native'
import { COLOR_BACKGROUND } from '../../../../constStyle/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 6,
    padding: 5
  },
  images: {
    flex: 1,
    width: screenWidth,
    height: 250,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: COLOR_BACKGROUND
  },
  rowMain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10
  },
  rowSecond: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  list: {
    flex: 1,
    width: screenWidth,
    padding: 5
  },

  button: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 4
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
