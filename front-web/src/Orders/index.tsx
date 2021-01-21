import { useEffect, useState } from 'react';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import { OrderLocationData, Product } from './types';

import { fetchProducts, saveOrder } from '../Api'
import OrderLocation from './OrderLocation';

import './styles.css';
import OrderSumary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from '../utils/helpers';
import { toast } from 'react-toastify';

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

  // reduce: percorre o array, com o valor inicial de 0, e soma
  // cada um item.price do array de selectedProducts
  const totalPrice = selectedProducts.reduce((sum, item) => sum+item.price, 0);
  
  useEffect(() => {
    fetchProducts()
      .then(response => setProducts(response.data))
      .catch(err => {
        toast.error(`Erro ao listar os Produtos`);
        toast.error(`${err}`);
      });
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

  function handleSubmitOrder() {
    // em .map, extras tds os id's de selectedProducts e armazena em extracted
    const extractedProductdsIds = selectedProducts.map(({id}) => ({id}))
    const payloadData = {
      ...orderLocation!, // como há alguns opcionais'?', tenho q indicar q venha dados'!' 
      // aqui estou concatenando ... MERGEANDO td que existe em orderLocation,
      // ou seja, a minha localização atual que peguei em /OrderLocation/ atraves
      // de onChangeLocation, que populou esse meu orderLocation, junto com
      // a minha lista de products ids
      products: extractedProductdsIds
    }

    saveOrder(payloadData)
      .then((response) => {
        toast.info(`Pedido N.${response.data.id} enviado com sucesso!`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSelectedProducts([]);
      })
      .catch((err) => {
        toast.error(`Erro ao enviar o Pedido!`);
        toast.error(`${err}`);
      }
    );
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
        <OrderSumary 
          selectedProductsQty={selectedProducts.length}
          totalPrice={totalPrice}
          onSubmit={handleSubmitOrder}
        />
        <Footer />
      </div>
    </>
  )
}

export default Orders;
