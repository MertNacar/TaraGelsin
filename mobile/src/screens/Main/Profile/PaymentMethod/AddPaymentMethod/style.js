import { StyleSheet } from 'react-native'
import * as Colors from '../../../../../constStyle/colors'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  form: {
    width: "80%",
    marginTop: 15
  },
  inputs: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "100%",
    marginBottom: 15,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  dateContainer: {
    width: "55%",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },

  cvvContainer: {
    width: "40%",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  addButton: {
    backgroundColor: Colors.COLOR_BACKGROUND
  }
})
export default styles 