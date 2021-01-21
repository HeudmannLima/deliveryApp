import { formatPrice } from "../../utils/helpers";

type Props = {
  selectedProductsQty: number,
  totalPrice: number,
  onSubmit: () => void // vai enviar p /ORDERS/ função ao clicar FAZER PEDIDO
}

function OrderSumary({ selectedProductsQty, totalPrice, onSubmit }: Props) {
  return (
    <div className="order-summary-container">
      <div className="order-summary-content">
        <div>
          <span className="amount-selected-container">
            <strong className="amount-selected">{selectedProductsQty}</strong>
            PEDIDO(S) SELECIONADO(S)
          </span>
          <span className="order-summary-total">
            <strong className="amount-selected">{formatPrice(totalPrice)}</strong>
            VALOR TOTAL
          </span>
        </div>
        <button 
          className="order-summary-make-order"
          onClick={onSubmit}
        >
          FAZER PEDIDO
        </button>
      </div>
    </div>
  )
}

export default OrderSumary;