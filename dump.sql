CREATE DATABASE pdv;

CREATE TABLE usuarios (
id serial KEY PRIMARY KEY,
 nome varchar(255) NOT NULL,
 email varchar(255) NOT NULL UNIQUE,
 senha text NOT NULL
);

CREATE TABLE categorias (
 id serial PRIMARY KEY,
 descricao text
);

INSERT INTO categorias (descricao) VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');