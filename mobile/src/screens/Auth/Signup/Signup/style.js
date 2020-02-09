import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    justifyContent: "center",
    alignItems: "center"
  },

  form: {
    flex: 1,
    paddingTop: "5%",
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  row: {
    flex: 1,
    flexDirection: "row",
  },

  username: {
    flex: 1,
    width: "100%"
  },

  checks: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  buttons: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    marginTop: "10%",
    alignSelf: "center",
    width: "50%"
  }
})
export default styles 