import { StyleSheet } from 'react-native'
import * as Colors from '../../../constStyle/colors'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    flex: 2,
    width: "90%",
    justifyContent: "flex-start",

  },
  inputs: {
    flex: 8,
    width: "100%",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  inputPassword: {
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  switch: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  loginButton: {
    width: "100%",
    backgroundColor: Colors.COLOR_BACKGROUND
  },
  link: {
    flex: 3,
    justifyContent: "flex-start"
  }
})
export default styles 