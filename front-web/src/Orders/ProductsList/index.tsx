import ProductCard from "../ProductCard";
import { Product } from "../types";

type Props = {
  products: Product[];
}

function ProductsList({ products }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        {products.map(item => (
          <ProductCard 
            key={item.id}
            product={item} 
          /> 
        ))}
      </div>
    </div>
  )
}

export default ProductsList;