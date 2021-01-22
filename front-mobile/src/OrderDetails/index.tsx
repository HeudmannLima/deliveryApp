import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import Header from '../Header';
import { Order } from '../types';
import OrderCard from '../OrderCard';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';

// como o componente está em uma Route do react,
// para poder pegar o objeto { order } que vem de /OrderCard/
// precisa-se extrair de route.params, neste caso route.params.order
type Props = {
  route: {
    params: {
      order: Order;
    }
  }
}

function OrderDetails({ route }: Props) {
  // const order = route.params.order;
  const { order } = route.params;
  const navigation = useNavigation();
 
  function handleConfirmDelivery() {
    Alert.alert(
      "Confirmar entrega",
      `\nConfirma a entrega do Pedido ${order.id}?`,
      [ { text: "OK", onPress: () => confirm(), style: 'cancel' },
        { text: "Não", onPress: () => {}, style: 'destructive' }
      ], { cancelable: false }
    );

    function confirm() {
      confirmDelivery(order.id)
        .then(() => {
          Alert.alert(`Pedido ${order.id} entregue com sucesso!`);
          navigation.navigate('Orders');
        })
        .catch((error) => {
          Alert.alert(`Houve um erro ao confirmar o pedido ${order.id}
            \n\n${error}`);
      } );
    }
  }

  function handleOnCancel() {
    navigation.navigate('Orders');
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button}>
          <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleConfirmDelivery}>
          <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleOnCancel}>
          <Text style={styles.buttonText}>CANCELAR</Text>
        </RectButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
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
  }
});

export default OrderDetails;