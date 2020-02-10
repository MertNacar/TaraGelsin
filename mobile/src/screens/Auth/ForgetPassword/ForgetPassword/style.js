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
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inputCountry: {
    width: "28%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 10
  },
  inputPhone: {
    width: "68%",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
  },

  button: {
    marginTop: "10%",
    alignSelf: "center",
    width: "50%"
  },

})
export default styles 