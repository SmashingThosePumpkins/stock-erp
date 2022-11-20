DROP DATABASE stock_erp;
CREATE DATABASE stock_erp;
USE stock_erp;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    senha VARCHAR(30),
    administrador BOOLEAN,
    data_criacao DATETIME,
    ultimo_login DATETIME
);

CREATE TABLE perfil_cliente (
	id INT PRIMARY KEY AUTO_INCREMENT,
    cpf VARCHAR(11),
    nome VARCHAR(60),
    telefone VARCHAR(20)
);

CREATE TABLE perfil_peca (
	id INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT,
    descricao VARCHAR(200),
    setor VARCHAR(1),
    prateleira INTEGER(30)
);

CREATE TABLE movimento_peca (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_peca INT,
    id_cliente INT,
    id_vendedor INT,
    valor FLOAT,
    horario DATETIME,
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
    
INSERT INTO perfil_cliente VALUES
    (null, "20303479817", "Kauê Cauê Carlos Melo", "1429940374"),
    (null, "01060414015", "Hugo Marcos Vinicius Thales Martins", "14986789520"),
    (null, "02049545681", "Francisco Thiago Miguel Moraes", "14989454962"),
    (null, "38115200670", "Iago Fernando Felipe Barros", "11985675232"),
    (null, "15932132124", "Vitor Cauã Hugo Figueiredo", "14998352862"),
    (null, "40808009591", "Rua Manoel Fernandes de Carvalho", "14998660366"),
    (null, "13358625524", "Cláudio Caio Monteiro", "11992825961"),
    (null, "57881419580", "Igor Renato Castro", "1493867223"),
    (null, "25349449168", "Pedro Ricardo Gustavo Rezende", "11982193853");

INSERT INTO perfil_peca VALUES
    (null, 65.0, "cilindro roda traseira palio", "C",1),
    (null, 70.0, "pneu aro 13 continental", "C",2),
    (null, 70.0, "pneu aro 14 michelin", "C",2),
    (null, 45.0, "sensor temperatura corsa", "B",3),
    (null, 63.0, "interruptor radiador", "A",4),
    (null, 250.0, "servo freio hidrovácuo", "A",3),
    (null, 45.0, "interruptor pressao oleo", "B", 1),
    (null, 200.0, "cilindro mestre freio", "A",2),
    (null, 120.0, "pinça do freio palio", "A",2),
    (null, 120.0, "tubo de injeção ford fiesta", "B",4),
    (null, 120.0, "tubo injeção combustivel", "B",4),
    (null, 75.0, "eixo motor uno", "B", 1),
    (null, 100.0, "vidro porta traseira xsara d", "F", 3),
    (null, 100.0, "vidro porta traseira xsara e", "F", 3);
