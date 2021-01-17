package com.devsuperior.dsdeliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dsdeliver.entities.Order;

// Interface JpaRepository retorna tipo collection 
// (tipo json) <Entidade, TIPO_da_chave_primaria>
public interface OrderRepository extends JpaRepository<Order, Long>{
	
	// metodo pra buscar todos ordenando por PENDENTES do mais ANTIGO pro mais recente
	// aqui como é mais especifico que o do produtcRepository, vamos usar uma query JPQL
	
	// no JPQL temos que dar um apelido (obj) pros objetos a serem buscados,
	// e aqui buscamos pelo nome da CLASSE da entidade (Order)
	// JOIN FETCH aqui é o mesmo que INNER JOIN, vai uma vez so no BD e 
	// traz os registros correspondentes ao Set de products da entidade Order,
	// e obj.status = 0 é meu status PENDING, e obj.moment é o instant/timestamp de cada ordem
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.products "
			+ "WHERE obj.status = 0 ORDER BY obj.moment ASC")
	List<Order> findOrdersWithProducts();
}
