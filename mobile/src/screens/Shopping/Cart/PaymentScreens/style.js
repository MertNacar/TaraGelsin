import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  orderNote: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 8,
    paddingTop: 30
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "700"
  },
  orderInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2
  },
  creditCard: {
    marginTop: 10,
    flex: 1
  },
  cardList: {
    flex: 1
  },
  text: {
    textAlign: "center"
  },
  orderSummary: {
    flex: 4,
    paddingHorizontal: 15,
    paddingTop: 30
  },
  row: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rowFirst: {
    flex: 6,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rowSecond: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 5
  },
  divider: {
    height: 2
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 3
  },
  containerCheck: {
    flex: 4,
    marginVertical: 15,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center"
  }
})
