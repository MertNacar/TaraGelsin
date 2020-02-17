import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between"
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