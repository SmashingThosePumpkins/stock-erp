DROP DATABASE stock_erp;
CREATE DATABASE stock_erp;
USE stock_erp;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    senha VARCHAR(30),
    administrador BOOLEAN,
    data_criacao TIMESTAMP,
    ultimo_login TIMESTAMP
);

CREATE TABLE perfil_cliente (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    telefone VARCHAR(15)
);

CREATE TABLE categoria_peca (
	id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200)
);

CREATE TABLE perfil_peca (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT,
    valor FLOAT,
    descricao VARCHAR(200),
    FOREIGN KEY (id_categoria) REFERENCES categoria_peca(id)
);

CREATE TABLE movimento_peca (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_peca INT,
    id_cliente INT,
    id_vendedor INT,
    tipo_conta INT(1),
    valor FLOAT,
    horario TIMESTAMP,
   	FOREIGN KEY (id_peca) REFERENCES perfil_peca(id),
    FOREIGN KEY (id_cliente) REFERENCES perfil_cliente(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuario(id)
);

INSERT INTO usuario VALUES
	(null, "admin", "1234", true, NOW(), null),
    (null, "usuario_1", "1234", false, NOW(), null),
    (null, "usuario_2", "1234", false, NOW(), null),
    (null, "User2392", "1234", true, NOW(), null),
    (null, "LeUserArio", "1234", false, NOW(), null);
    