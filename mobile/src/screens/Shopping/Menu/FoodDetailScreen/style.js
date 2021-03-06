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
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: COLOR_BACKGROUND
  },
  rowMain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10
  },
  ingExtraMain: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10
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
  ingredientCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 4,
    marginVertical: 15
  },
  buttonSmallContainer: {
    flex: 1,
    alignSelf: "center"
  },
  buttonSmall: {
    width: 50,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
