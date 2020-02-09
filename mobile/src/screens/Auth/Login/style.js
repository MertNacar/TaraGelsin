import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    flex: 2,
    width: "70%",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  inputs: {
    flex: 8,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  switch: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  link: {
    flex: 3,
    justifyContent: "flex-start"
  }
})
export default styles 