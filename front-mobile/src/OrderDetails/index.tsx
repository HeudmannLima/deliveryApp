import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, Alert, Linking } from 'react-native';

import Header from '../Header';
import OrderCard from '../OrderCard';

import { Order } from '../types';
import { styles } from './styles';
import { confirmDelivery } from '../api';

// como o componente está em uma Route do react,
// para poder pegar o objeto { order } que vem de /OrderCard/
// precisa-se extrair de route.params, neste caso route.params.order
type Props = {
  route: {
    params: { order: Order }
  }
}

function OrderDetails({ route }: Props) {
  // const order = route.params.order;
  const { order } = route.params;
  const navigation = useNavigation();
 
  function handleStartGPSNavigation() {
    
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`);
    console.log(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`);

  }
  function handleConfirmDelivery() {
    Alert.alert(
      "Confirmar entrega",
      `\nConfirma a entrega do Pedido ${order.id}?`,
      [{ text: "OK", onPress: () => confirm(), style: 'cancel' },
      { text: "Não", onPress: () => {}, style: 'destructive' } ],
      { cancelable: false }
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
    // navigation.navigate('OrderMap', { order });
    navigation.navigate('Orders');
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button} onPress={handleStartGPSNavigation}>
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

export default OrderDetails;