CREATE DATABASE pdv;

CREATE TABLE usuarios (
 id serial PRIMARY KEY,
 nome varchar(255) NOT NULL,
 email varchar(255) NOT NULL UNIQUE,
 senha varchar(50) NOT NULL
);

CREATE TABLE categorias (
 id serial PRIMARY KEY,
 descricao text
);