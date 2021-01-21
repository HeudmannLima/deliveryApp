import { useEffect, useState } from 'react';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import { OrderLocationData, Product } from './types';

import { fetchProducts } from '../Api'
import OrderLocation from './OrderLocation';

import './styles.css';
import OrderSumary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from '../utils/helpers';

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

  useEffect(() => {
    fetchProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  function handleSelectProduct(product: Product) {
    // .some: Pelo menos UM item da lista tem q ser TRUE na condiçao, retornando TRUE
    // const isAlreadySelected = selectedProducts.some(item => item.id === product.id);
    const isAlreadySelected = checkIsSelected(selectedProducts, product);

    if (isAlreadySelected) {
      // .filter: se o item clicado já estiver selecionado no momento,
      // retorno todos os outros items SELECIONADOS que NÃO sejam ele
      const selected = selectedProducts.filter(item => item.id !== product.id);      
      setSelectedProducts(selected);
    } else {
      // caso seja selecionado OUTRO(S) além do que já estava,
      // pega-se todos os que já estavam selecionados (previous), e ADD este (product)
      setSelectedProducts(previous => [...previous, product]);
    }
  }

  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductsList 
          products={products}
          onSelectProduct={handleSelectProduct} // onSelectProduct, ta VINDO de P.card -> P,List-> aqui Orders
          selectedProducts={selectedProducts} // SelectedProductd ta INDO pra P.list->P.card
        />
        <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
        <OrderSumary />
        <Footer />
      </div>
    </>
  )
}

export default Orders;