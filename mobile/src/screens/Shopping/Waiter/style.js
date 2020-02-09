import { StyleSheet } from 'react-native'
import { COLOR_BACKGROUND } from '../../../constStyle/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 3,
    width: "70%",
    height: "80%",
    resizeMode: "contain"
  },
  row: {
    flex: 1.5,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center"
  },
  buttonStyle: {
    paddingHorizontal: 5,
    backgroundColor: COLOR_BACKGROUND
  }
})
