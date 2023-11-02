CREATE DATABASE pdv;

CREATE TABLE usuarios (
    id serial PRIMARY KEY,
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

CREATE TABLE produtos (
    id serial PRIMARY KEY,
    descricao text NOT NULL,
    quantidade_estoque int NOT NULL,
    valor int NOT NULL,
    categoria_id int NOT NULL REFERENCES categorias(id)
);