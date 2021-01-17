package com.devsuperior.dsdeliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsdeliver.entities.Product;

// Interface JpaRepository retorna tipo collection 
// (tipo json) <Entidade, TIPO_da_chave_primaria>
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	// metodo pra buscar todos ordenando em forma crescente pelo Nome, usando um
	// recurso do JPA com query personalizada, trazendo ordenado pelo campo 'name':
	List<Product> findAllByOrderByNameAsc();

}
