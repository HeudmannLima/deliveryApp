import axios from "axios";

// export const API_URL = "http://192.168.0.26:8080";
const API_URL = 'https://dsdeliver-heud.herokuapp.com';

export async function fetchOrders() {
  return await axios.get(`${API_URL}/orders`);
}

export async function confirmDelivery(orderId: number) {
  return await axios.put(`${API_URL}/orders/${orderId}/delivered`);
}
