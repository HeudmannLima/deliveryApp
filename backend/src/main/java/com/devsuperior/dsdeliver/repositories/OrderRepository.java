package com.devsuperior.dsdeliver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsdeliver.entities.Order;

// Interface JpaRepository retorna tipo collection 
// (tipo json) <Entidade, TIPO_da_chave_primaria>
public interface OrderRepository extends JpaRepository<Order, Long>{

}
