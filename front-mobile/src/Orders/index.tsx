import React, { useEffect, useState } from 'react';
import { Text, Alert, Image, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Header from '../Header';
import OrderCard from '../OrderCard';

import { Order } from '../types';
import { fetchOrders } from '../api';
import { styles } from './styles';

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
        { isLoading ? (
            <View style={styles.imgContainer}>
              <Text style={styles.text}>Buscando pedidos...</Text>
              <Image 
                style={styles.loadImg} 
                source={require('../../assets/deliveryman.png')} 
              />
            </View>
          ) :
          orders.map(order =>
            <TouchableWithoutFeedback 
              key={order.id}
              onPress={() => handleOnPress(order)}
            >
              {/* // esse {order} tá vindo/RECEBENDO do filho /OrderCard/ */}
              <OrderCard order={order} />  
            </TouchableWithoutFeedback>
          )}
        { orders.length === 0 && !isLoading && (
          <View style={styles.imgContainer}>
            <Text style={styles.text}>Não há pedidos no momento.</Text>
            <Image 
              style={styles.loadImg} 
              source={require('../../assets/deliveryman.png')}
            />
          </View> 
        )}
      </ScrollView>
    </>
  );
}

export default Orders;
