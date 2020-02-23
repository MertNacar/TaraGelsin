import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  historyList: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 8,
  },
  list: {
    flex: 3,
  },
  row: {
    flex: 1,
    alignSelf: "center"
  },

  button: {
    width: "50%"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center"
  },
  buttonText: {
    color: "red",
    marginRight: 5
  }
})
export default styles 