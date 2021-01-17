package com.devsuperior.dsdeliver.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliver.dto.OrderDTO;
import com.devsuperior.dsdeliver.dto.ProductDTO;
import com.devsuperior.dsdeliver.entities.Order;
import com.devsuperior.dsdeliver.entities.OrderStatus;
import com.devsuperior.dsdeliver.entities.Product;
import com.devsuperior.dsdeliver.repositories.OrderRepository;
import com.devsuperior.dsdeliver.repositories.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	// metodo pra buscar ordens (GET)
	@Transactional(readOnly = true)
	public List<OrderDTO> buscarOrdens() {
		List <Order> list = orderRepository.findOrdersWithProducts();
	
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	// metodo pra INSERIR ordens (POST)
	@Transactional
	public OrderDTO inserirOrdem(OrderDTO dto) {
		
		// pega-se todo o objeto modelo de uma ordem, pra assim 
		// modelar e inserir uma nova com os dados novos
		Order newOrder = new Order(
				null, 
				dto.getAddress(), 
				dto.getLatitude(), 
				dto.getLongitude(),
				Instant.now(),
				OrderStatus.PENDING);
		
		// detalhes: como estou criando num NOVO order, o timestamp é o de agora (Instant.now(),
		// e a ordemStatus como e um NOVO pedido, ele vai começar como PENDENTE
		// Abaixo, pra pegar a lista de produtos associados, passo por cada produto do DTO
		// e ADD ele na lista do tipo produto na minha newOrder
		for (ProductDTO p: dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			
			newOrder.getProducts().add(product);
		}
		
		// SALVANDO essa alteração/nova order no meu BD
		newOrder = orderRepository.save(newOrder);

		// aqui o meu RETORNO do POST é exatamente a nova ordem criada
		return new OrderDTO(newOrder);
	}
}
