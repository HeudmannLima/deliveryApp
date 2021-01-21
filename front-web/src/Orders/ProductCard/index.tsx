import { Product } from '../types';
import { formatPrice } from '../../utils/helpers';

type Props = {
  product: Product;
  isSelected: boolean;
  onSelectProduct: (product: Product) => void; 
  // uso essa funcao p/ passar pro comp PAI (/ProductsList/) 
  // os dados de product, que do PAI, vou fazer a mesma tratativa
  // de colocar no props essa funcao, pros dados de produtcs
  // irem pro componente PAI do PAI (/Oders/), ou seja:
  // daqui: products => /ProductCard/ => /ProductList/ => /Orders/
}

function ProductCard({ product, onSelectProduct, isSelected }: Props) {
  return (
    <div 
      className={`order-card-container ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectProduct(product)}
    >
      <h3 className="order-card-title">
        {product.name}
      </h3>
      <img 
        src={product.imageUri} 
        className="order-card-image" 
        alt={product.name}
      />
      <h3 className="order-card-price">
        {formatPrice(product.price)}
      </h3>
      <div className="order-card-description">
        <h3>Descrição</h3>
        <p>
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductCard;