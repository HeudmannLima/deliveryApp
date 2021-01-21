function StepsHeader() {
  return (
    <header className="orders-steps-container">
      <div className="orders-steps-content">
        <h1 className="steps-title">
          SIGA AS <br /> ETAPAS
        </h1>
        <ul className="steps-items">
          <li>
            <span className="steps-number">1</span>
            Selecione o(s) <strong>produto(s)</strong>.
          </li>
          <li>
            <span className="steps-number">2</span>
            Busque a <strong>localização/endereço</strong> para entrega.
          </li>
          <li>
            <span className="steps-number">3</span>
            Confira qtd e valor, depois finalize em <strong>"ENVIAR PEDIDO"</strong>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default StepsHeader;