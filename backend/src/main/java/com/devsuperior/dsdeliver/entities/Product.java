package com.devsuperior.dsdeliver.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


// Com essa annotation @Entity, fazem os Products como ENTIDADE 
// de bd que vai ser gerenciado pelo JPA, ou seja, a classe Products
// vai representar uma TABELA do Banco de dados, nesse caso a tb_product
@Entity
@Table(name = "tb_product")
public class Product implements Serializable {
	// Serializable é uma boa medida, pra as info do objeto do tipo produto
	// possam ser transformados em sequencia de bytes, padrão, evitar problemas ao salvar/rede

	// padrao, versao 1, pra o serializable funcionar
	private static final long serialVersionUID = 1L;
	
	// @Id informa ao JPA que vai ser a chave primaria, @generatedvalue vai autoincrementar no BD
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private Double price;
	private String description;
	private String imageUri;
	
	public Product() {
	}

	public Product(Long id, String name, Double price, String description, String imageUri) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.imageUri = imageUri;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUri() {
		return imageUri;
	}

	public void setImageUri(String imageUri) {
		this.imageUri = imageUri;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	// Source -> Generate hashCode e equals
	// É uma implementacao padrao pra comparar um objeto com outro
	// Para comparar um ID com outro ID, um produto com outro
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}


	
	
	
}
