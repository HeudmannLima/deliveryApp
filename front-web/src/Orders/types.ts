import { NumberLiteralType } from "typescript";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUri: string;
}

export type OrderLocationData = {
  latitude: number,
  longitude: number,
  address: string
} 

// Tipos para FORMAR/MONTAR e ENVIAR o pedido/Order
export type ProductId = {
  id: number
}

export type OrderPayload = {
  products: ProductId[];   
} & OrderLocationData; // aqui ele faz um merge, add o obj OrderLocationData
//-------------------------------------------------