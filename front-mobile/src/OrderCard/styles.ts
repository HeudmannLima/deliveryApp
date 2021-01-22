import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '2%',
    padding: 20,
    paddingBottom: 23,
    backgroundColor: '#FFF',
    shadowOpacity: 0.15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    fontFamily: 'OpenSans_400Regular'
  },
  textTime: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    fontFamily: 'OpenSans_700Bold'
  },
  orderName: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#263238',
    fontFamily: 'OpenSans_700Bold'
  },
  orderPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'right',
    letterSpacing: -0.24,
    color: '#DA5C5C',
    fontFamily: 'OpenSans_700Bold'
  },
  productsList: {
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 15
  },
  textAddress: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: -0.15,
    lineHeight: 15,
    color: '#9E9E9E',
  },
});