import { StyleSheet } from 'react-native'
import { COLOR_BACKGROUND } from '../../../../constStyle/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  row: {
    flex: 1.5,
    justifyContent: "center"
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 1.5
  },
  buttonStyle: {
    paddingHorizontal: 5,
    backgroundColor: COLOR_BACKGROUND
  }
})
