import { StyleSheet, Dimensions } from 'react-native'
import * as Colors from '../../../../../constStyle/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardList: {
    flex: 4,
    width: screenWidth,
    paddingHorizontal: 7
  },
  image: {
    flex: 2,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  row: {
    flex: 2,
    justifyContent: "flex-start"
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700"
  },
  buttonContainer: {
    flex: 2,
    bottom: 55,
    position: "absolute",
    width: "90%",
  },
  backButtonContainer: {
    flex: 2,
    bottom: 5,
    position: "absolute",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: Colors.COLOR_BACKGROUND
  },
  titleStyle: {
    marginRight: 14
  }
})
