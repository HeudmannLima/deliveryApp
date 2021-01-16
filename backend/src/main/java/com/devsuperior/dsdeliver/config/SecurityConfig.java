package com.devsuperior.dsdeliver.config;

// Arquivo de config de Segurança .5 - config do CORS 
// para acesso do app de qqr outro lugar onde posso acessar o app no heroku
// ou seja, o cors tem que ser config aqui para o front acessar o backend

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// essa parte eh pra se for test, liberar acesso ao H2, banco de testes para testes
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			http.headers().frameOptions().disable();
		}
		
		// http.cors -> libera o cors baseado na config do CorsConfigurationSource logo abaixo
		// and().csrf -> desabilita protecao contra ataque de CSFR que é de sessão, 
		// mas como usa aqui vamos usar REST, nao guarda dados em sessao, nao tem perigo este ataque
		http.cors().and().csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // sessao n armazena estado
		http.authorizeRequests().anyRequest().permitAll(); //liberando acesso a tds as requisicoes
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
