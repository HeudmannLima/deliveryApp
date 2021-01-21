import { checkIsSelected } from "../../utils/helpers";
import ProductCard from "../ProductCard";
import { Product } from "../types";

type Props = {
  products: Product[],
  selectedProducts: Product[]; // esse tá SAINDO do pai /Orders/ pra cá
  onSelectProduct: (product: Product) => void;
  // veio de /ProductCard/ e vai pra /Orders/
}

function ProductsList({ products, selectedProducts, onSelectProduct }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        {products.map(item => (
          <ProductCard 
            key={item.id}
            product={item}
            onSelectProduct={onSelectProduct}
            isSelected={checkIsSelected(selectedProducts, item)}
            // aqui eu passo true/false pro meu productCard, pra dizer
            // se esse card tá ou náo já selecionado, alterado sua classe css
          /> 
        ))}
      </div>
    </div>
  )
}

export default ProductsList;