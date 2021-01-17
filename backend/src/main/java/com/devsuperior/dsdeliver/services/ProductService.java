package com.devsuperior.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliver.dto.ProductDTO;
import com.devsuperior.dsdeliver.entities.Product;
import com.devsuperior.dsdeliver.repositories.ProductRepository;

@Service
public class ProductService {
	
	// O productService é um componente que depende do componente productRepository
	// pra isso ele precisa ter uma instancia do productrepository dentro dele
	// injecao de dependencia, pode ser feito assim com construtor:
	//
	// private ProductRepository repository;
	//
	// public ProductService(ProductRepository repository) {
	// 		this.repository = repository;
	// }
	//
	// mas o Spring tem a annotation @Autowired
	
	@Autowired
	private ProductRepository repository;

	// Para garantir o Transaction com o BD, readOnly pra evitar o locking do bd
	
	@Transactional(readOnly = true)
	public List<ProductDTO> buscarProdutos() {
		List<Product> list = repository.findAllByOrderByNameAsc();
		
		// Pra mandar pra REST tem que ser array (list), porem
		// o que vem de DTO é uma collection, pra manipular, usa o stream
		
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
}
