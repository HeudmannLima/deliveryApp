import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Alert } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import { Order } from '../types';
import Header from '../Header';
import OrderCard from '../OrderCard';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoadind] = useState<boolean>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  function fetchData() {
    setIsLoadind(true);
    fetchOrders()
    .then(response => setOrders(response.data))
    .catch(error => 
      Alert.alert(`Houve um erro \n ao listar os pedidos\n\n${error}`))
    .finally(() => setIsLoadind(false));
  }

  useEffect(() => {
    isFocused && fetchData();
    // if (isFocused) fetchData();
    // isFocused ? fetchData() : null;
  }, [isFocused]);

  function handleOnPress(order: Order) {
    navigation.navigate('OrderDetails', { order });
  }

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {isLoading ? (<Text style={styles.text}>Buscando pedidos...</Text>) :
          orders.map(order =>
            <TouchableWithoutFeedback 
              key={order.id}
              onPress={() => handleOnPress(order)}
            >
              {/* // esse {order} tá vindo/RECEBENDO do filho /OrderCard/ */}
              <OrderCard order={order} />  
            </TouchableWithoutFeedback>
          )
        }
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  text: {
    marginTop: '55%',
    marginLeft: '25%',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#263238',
    fontFamily: 'OpenSans_700Bold'
  }
});

export default Orders;