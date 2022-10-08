CREATE DATABASE stock_erp;
USE stock_erp;

CREATE TABLE usuario (
	id INT PRIMARY KEY,
    tipo_conta INT(1),
    nome VARCHAR(30),
    login_hash VARCHAR(16),
    ultimo_login DATETIME
);

CREATE TABLE perfil_cliente (
	id INT PRIMARY KEY,
    nome VARCHAR(30),
    telefone VARCHAR(15)
);

CREATE TABLE categoria_peca (
	id INT PRIMARY KEY,
    descricao VARCHAR(200)
);

CREATE TABLE perfil_peca (
	id INT PRIMARY KEY,
    id_categoria INT,
    valor FLOAT,
    descricao VARCHAR(200),
    FOREIGN KEY (id_categoria) REFERENCES categoria_peca(id)
);

CREATE TABLE movimento_peca (
	id INT PRIMARY KEY,
    id_peca INT,
    id_cliente INT,
    id_vendedor INT,
    tipo_conta INT(1),
    valor FLOAT,
    horario DATETIME,
   	FOREIGN KEY (id_peca) REFERENCES perfil_peca(id),
    FOREIGN KEY (id_cliente) REFERENCES perfil_cliente(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuario(id)
);

INSERT INTO usuario VALUES
	(1, 0, "Fulaninho", "1icx2js985mcjei1", "2022-09-23 11:43:32"),
    (2, 1, "Cicraninho", "o9ih6f9md3xg5rd8", "2022-09-23 11:21:43");
    
INSERT INTO perfil_cliente VALUES
	(1, "Marcos Silva", "14999079926"),
    (2, "Andrea Santos", "11913292019");
    
INSERT INTO categoria_peca VALUES
	(1, "Parafuso"),
    (2, "Suspensão dianteira");
    
INSERT INTO perfil_peca VALUES
	(1, 1, 5, "Parafuso Fenda 4.5 cm"),
    (2, 2, 400, "Suspensão dianteira esquerda gol quadrado");
    
INSERT INTO movimento_peca VALUES
	(1, 1, 1, 1, 1, 5, "2022-09-23 11:43:32"),
    (2, 2, 2, 2, 0, 500, "2022-09-22 16:31:22");

DROP DATABASE stock_erp;