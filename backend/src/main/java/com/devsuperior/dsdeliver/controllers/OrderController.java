package com.devsuperior.dsdeliver.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dsdeliver.dto.OrderDTO;
import com.devsuperior.dsdeliver.services.OrderService;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	@Autowired
	private OrderService service;
	
	
	@GetMapping
	public ResponseEntity<List<OrderDTO>> getOrders() {
		List<OrderDTO> list = service.buscarOrdens();
		
		// aqui vai retornar GET a lista dos itens
		return ResponseEntity.ok().body(list);
	}
	
	
	// Como o que vem do FRONTEND vai ser um JSON contendo os dados de Order,
	// é necessario usar o @RequestBody pois assim vai converter o body json pra objeto java (dto)
	@PostMapping
	public ResponseEntity<OrderDTO> postOrder(@RequestBody OrderDTO dto) {
		dto = service.inserirOrdem(dto);
		
		// Boas praticas: qdo se INSERE/POST um recurso o certo é retornar cod.201 (recurso criado)
		// pra poder retornar o codigo 201, e tambem o endereço criado no HEAD da resposta, usa URI
		// aqui é uma chamada que se faz pra criar a URI que corresponde ao RECURSO do post que criamos
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(dto.getId()).toUri();
		
		// pra retornar a resposta 201, passa a URI criada, e por fim passa o objeto(body) criado
		return ResponseEntity.created(uri).body(dto);
	}

}
