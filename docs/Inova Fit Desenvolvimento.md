- [Inova Fit](#inova-fit)
  * [Técnologias utilizadas para o desenvolvimento](#t-cnologias-utilizadas-para-o-desenvolvimento)
    + [Banco de dados](#banco-de-dados)
    + [API](#api)
    + [APP Mobile](#app-mobile)
    + [APP Web](#app-web)

# Inova Fit

## Técnologias utilizadas para o desenvolvimento

### Banco de dados

O banco de dados escolhido foi o PostgreSQL devido ser totalmente gratuito.

O banco de dados foi construido baseado no modelo lógico esboçado:

1. Tabela Aluno

    Para cadastro dos alunos, liberação de acesso ao APP mobile e controle das ações dos mesmos na academia.


2. Tabela Administrativo

    Registro dos funcionários da academia que gerenciarão as ações dos alunos.

3. Tabela Entrada e Saída

    Para registrar a liberação da entrada, saída dos alunos na academia e horário que entraram ou saíram.

4. Tabela Pagamento

    Para armazenar os pagamentos pendentes e finalizados de cada aluno de um serviço específico.


<img src="./imgs-docs/Captura de ecrã de 2024-10-22 12-55-41.png" width="500" />

``` sql
create table aluno (
	"id" serial primary key,
	"nome" varchar(255) not null,
	"tipo_documento" varchar(10) not null,
	"n_documento" varchar(20) not null,
	"email" varchar(255) not null,
	"endereco" varchar(255) not null,
	"data_inscricao" timestamp not null,
	"senha" varchar(255) not null,
	"createdAt" timestamp not null,
	"updatedAt" timestamp not null
);

create table administrativo (
	"id" serial primary key,
	"nome" varchar(255) not null,
	"tipo_documento" varchar(10) not null,
	"n_documento" varchar(20) not null,
	"email" varchar(255) not null,
	"endereco" varchar(255) not null,
	"data_admissao" timestamp not null,
	"senha" varchar(255) not null,
	"createdAt" timestamp not null,
	"updatedAt" timestamp not null
);

create table entrada_saida (
	"id" serial primary key,
	"id_aluno" integer not null,
	"entrada_saida" varchar(255) not null,
	"data_hora" timestamp not null,
	"createdAt" timestamp not null,
	"updatedAt" timestamp not null,
	foreign key (id_aluno) references aluno(id) 
);

create table pagamento (
	"id" serial primary key,
	"id_aluno" integer not null,
	"servico" varchar(255) not null,
	"valor" decimal(5, 2) not null,
	"metodo_pagamento" varchar(255),
	"data_vencimento" timestamp not null,
	"data_pagamento" timestamp,
	"createdAt" timestamp not null,
	"updatedAt" timestamp not null,
	foreign key (id_aluno) references aluno(id)
);
```

### API

A API foi escrita utilizando o ecossistema JavaScript com Node.js utilizando as seguintes bibliotecas/frameworks.

1. Express.js

    Express foi utilizado para desenvolver os endpoints do CRUD (Create, Read, Update e Delete) e os middlewares que são funções para manipulação dos dados antes do fim da resposta da requisição.


2. Sequelize

    O ORM foi escolhido para estabelecer conexão com o banco de dados, modelagem das entidades (tabelas) do banco de dados, facilidade ao relacionar as tabelas e operações de CRUD intuitivas.

3. Bcrypt.js

    Escolhido para criação de hash (criptografia) das senhas. Também é muito simples de ser utilizado, por seus dois principais métodos que são hash(), que criptografa a senha e o método compare(), que compara o hash da senha com a senha digitada pelo usuário.

4. JsonWebToken (JWT)

    Para criação de token de autenticação e permissão o escolhido foi o JWT, pois cria um token robusto de segurança baseado em um payload (geralmente dados de cadastro do usuário) e uma chave secreta.


### APP Mobile

O aplicativo do aluno foi devenvolvido utilizando React Native, que é um framework JavaScript para desenvolvimento Android e IOS. Os recursos utilizados foram:

1. UseState

    Hook nativo do framework para armazenamento, monitoramento e alterações no estado da aplicação

2. Axios

    Para fazer as requisições a API para obtenção dos dados

### APP Web

O aplicativo web é idealizado para o gerenciamento do aplicativo do aluno, como por exemplo, gerenciar entradas e saídas, controle de pagamentos e gerenciar cadastro de alunos. Foi desenvolvido com HTML, CSS e JavaScript e foram utilizado:

1. Axios

    Para fazer as requisições a API para obtenção dos dados

2. SweetAlert2

    Para criar os popups interativos

3. Bootstrap

    Para facilitar o desenvolvimento dos componetes visuais.