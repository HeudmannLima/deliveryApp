import { Product } from "../Orders/types";

export function checkIsSelected(selectedProducts: Product[], product: Product) {
  return selectedProducts.some(item => item.id === product.id);
}