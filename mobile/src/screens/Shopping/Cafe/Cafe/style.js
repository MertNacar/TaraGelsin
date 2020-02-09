import { StyleSheet, Dimensions } from 'react-native'
import { COLOR_TERTIARY } from '../../../../constStyle/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 2,
    width: screenWidth,
    maxHeight: 500
  },
  row: {
    flex: 1,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    flex: 1,
    paddingHorizontal: 5,
  },

})
