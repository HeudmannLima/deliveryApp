import axios from "axios";
import { OrderPayload } from "./Orders/types";

// const API_URL = 'http://localhost:8080';
const API_URL = 'https://dsdeliver-heud.herokuapp.com';
const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

export function fetchProducts() {
  return axios.get(`${API_URL}/products`);
};
  
export function fetchLocalMapBox(local: string) {
  return axios.get(`http://api.mapbox.com/geocoding/v5/mapbox.places/
    ${local}.json?access_token=${mapboxToken}`);
};

export function saveOrder(payload: OrderPayload) {
  return axios.post(`${API_URL}/orders`, payload);
}
