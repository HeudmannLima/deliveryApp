import React from 'react';
import { View, Text } from 'react-native';

import { Order } from '../types';
import { dateFromNow, formatPrice } from '../utils/helpers';

import { styles } from './styles';

type Props = {
  order: Order;
}

function OrderCard({ order }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderName}>Pedido {order.id}</Text>
        <Text style={styles.orderPrice}>{formatPrice(order.total)}</Text>
      </View>
      <Text style={styles.textTime}>{dateFromNow(order.moment)}</Text>
      <View style={styles.productsList}>
        <Text style={styles.textAddress}>{order.address}</Text>
      </View>
      <View style={styles.productsList}>
      {order.products.map(product => (
        <Text key={product.id} style={styles.text}>{product.name}</Text>
      ))}
      </View>
    </View>
  );
}

export default OrderCard;
