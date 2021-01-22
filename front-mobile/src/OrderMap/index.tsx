import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, Alert, Linking, ActivityIndicator } from 'react-native';

import Header from '../Header';
import OrderCard from '../OrderCard';

import { Order } from '../types';
import { confirmDelivery } from '../api';
import WebView from 'react-native-webview';
import { dateFromNow } from '../utils/helpers';

// como o componente está em uma Route do react,
// para poder pegar o objeto { order } que vem de /OrderCard/
// precisa-se extrair de route.params, neste caso route.params.order
type Props = {
  route: {
    params: { order: Order }
  }
}

function OrderMap({ route }: Props) {
  // const order = route.params.order;
  const { order } = route.params;
  const navigation = useNavigation();
 
  function goBack() {
    navigation.goBack();
  }

  const linkMap = `https://www.google.com/maps/dir/?api=1
  &travelmode=driving&dir_action=navigate
  &destination=${order.latitude},${order.longitude}`;

  return (
    <>
      <Header />

      <View style={styles.orderContainer}>
        <View style={styles.header}>
          <Text style={styles.orderName}>Pedido {order.id}</Text>
          <Text style={styles.textTime}>{dateFromNow(order.moment)}</Text>
        </View>
        <Text style={styles.textAddress}>{order.address}</Text>
      </View>
      <View style={styles.orderMap}>
        <WebView 
          source={{ uri: linkMap }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color='#DA5C5C'
              size='large'
              style={styles.orderMap}
            /> 
          )}
        />
      </View>
      <View style={styles.container}>
        <RectButton style={styles.button}>
          <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>VOLTAR</Text>
        </RectButton>
        <Text style={styles.buttonText}></Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  orderContainer: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '1%',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    shadowOpacity: 0.10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 1
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    marginBottom: -3,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    fontFamily: 'OpenSans_400Regular'
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
    marginTop: 20,
    paddingTop: 15
  },
  orderMap: {
    flex: 1,
  },
  textTime: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    fontFamily: 'OpenSans_700Bold'
  },
  textAddress: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: -0.15,
    lineHeight: 20,
    color: '#9E9E9E',
  },
});

export default OrderMap;