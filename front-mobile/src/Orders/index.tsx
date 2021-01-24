import React, { useEffect, useState } from 'react';
import { Text, Alert, Image, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Header from '../Header';
import OrderCard from '../OrderCard';

import { Order } from '../types';
import { API_URL, fetchOrders } from '../api';
import { styles } from './styles';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoadind] = useState<boolean>();
  const [connected, setConnected] = useState<boolean>();
  const [socketStatus, setSocketStatus] = useState<string>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  var stompClient: Stomp.Client;

  async function connect() {
    setConnected(true);
    var socket = new SockJS(`${API_URL}/stomp`);
    stompClient = Stomp.over(socket);
    await stompClient.connect({}, function() {
      stompClient.subscribe('/topic/newOrder', (data) => {
        setSocketStatus(data.body);
      })
    }, (error) => {
      console.log("Erro de comunicação com Socket: ", error);
      setConnected(false);
    });
  }

  useEffect(() => {
    if(!connected) {
      connect();
    }
    isFocused && fetchData();
}, [isFocused, socketStatus]);

  function fetchData() {    
    setIsLoadind(true);
    fetchOrders()
      .then(response => setOrders(response.data))
      .catch(error => 
      Alert.alert(`Houve um erro \n ao listar os pedidos\n\n${error}`))
    .finally(() => setIsLoadind(false));
  }

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
