# Stock ERP

Este é o repositório do website para o trabalho de conclusão de curso de desenvolvimento de sistemas de alunos da ETEC MAM, Garça/SP

## Proposta

A proposta principal da Stock ERP, é desenvolver um sistema de gestão de estoque.

Esse website será acessível para funcionários da empresa, e terá como função gerenciar aspectos do software, como itens dentro do estoque, clientes, vendas e compras.

## Executando o projeto

### Requisitos

- `Node.js` instalado na máquina
- `npm` instalado na máquina
- `MySQL` instalado e configurado na máquina
    - Para executar o website, é necessário ter um serviço MySQL Server funcionando.

### Configurar MySQL

Para o projeto funcionar devidamente, deve-se ter um banco de dados configurado corretamente. Para isso, execute o script `stock_erp.sql` que se encontra no diretório raiz do projeto para criar o banco e suas tabelas.

### Passo 1 - Clonar o repositório

O primeiro passo para executar o projeto é... ter acesso ao projeto.

Navegue com o terminal até um diretório de sua escolha para armazenar o código fonte do projeto e execute o seguinte comando:

```
git clone https://github.com/SmashingThosePumpkins/stock-erp.git
```

### Passo 2 - Mover instância local do projeto para o branch `dev`

A versão *default* do projeto (no branch master) possui apenas o código enviado ao servidor no momento da criação do repositório, ou seja, ele não possui implementações. Para usar a versão de desenvolvimento do código, deve-se executar o seguinte comando no diretório raíz do projeto.

```
git checkout dev
```

### Passo 3 - Adicionar variáveis de ambiente

Após possuir o código fonte de desenvolvimento do projeto em mãos, o próximo passo é adicionar as variáveis de ambiente. Dentro do diretório raíz, **crie um arquivo com o nome `.env`**.

Dentro desse arquivo, insira as seguintes configurações:

```
MYSQL_HOST="127.0.0.1"
MYSQL_USER="your-username-here"
MYSQL_PASSWORD="your-password-here"
MYSQL_DATABASE="stock_erp"
SERVER_PORT=7075
```

- MYSQL_HOST: Essa configuração define em qual máquina o serviço MySQL Server está rodando. Caso esteja na mesma máquina em que o código será rodado, defina-a como `localhost` ou `127.0.0.1`.

- MYSQL_USER: Usuário do MySQL.

- MYSQL_PASSWORD: Senha desse usuário.

- MYSQL_DATABASE: É o nome do banco do projeto. Sempre defina esse campo como `stock_erp`.

- SERVER_PORT: Essa configuração define a porta que será disponibilizada para o site receber requests. Pode ser inserida qualquer porta não ocupada da máquina.

### Passo 4 - Iniciar servidor

Para iniciar o servidor do website, basta executar o seguinte comando no diretório raiz do projeto:

```
node server.js
```

### Passo 5 - Conectar

Tudo pronto!

Agora basta inserir a URL do site em seu navegador e acessá-lo.

```
http://[seu-host]:[sua-porta]
http://127.0.0.1:7075
```

## Desenvolvedores

- pablo.silva194@etec.sp.gov.br - Pablo Antonio Garcia Silva Junior
- matheus.rodrigues225@etec.sp.gov.br - Matheus Sanches Rodrigues
- joao.rodrigues292@etec.sp.gov.br - João Pedro da Silva Rodrigues