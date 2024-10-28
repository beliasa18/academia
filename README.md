- [Inova Fit](#inova-fit)
  * [Técnologias utilizadas para o desenvolvimento](#t-cnologias-utilizadas-para-o-desenvolvimento)
    + [Banco de dados](#banco-de-dados)
    + [API](#api)
    + [APP Mobile](#app-mobile)
    + [APP Web](#app-web)
  * [Documentação](#documenta-o)
    + [API](#api-1)
      - [Autenticar aluno](#autenticar-aluno)
      - [Adicionar aluno](#adicionar-aluno)
      - [Exibir todos os alunos](#exibir-todos-os-alunos)
      - [Exibir aluno por ID](#exibir-aluno-por-id)
      - [Atualizar aluno](#atualizar-aluno)
      - [Deletar aluno](#deletar-aluno)
      - [Autenticar administrativo](#autenticar-administrativo)
      - [Adicionar administrativo](#adicionar-administrativo)
      - [Exibir todos os administrativos](#exibir-todos-os-administrativos)
      - [Exibir administrativo por id](#exibir-administrativo-por-id)
      - [Atualizar administrativo](#atualizar-administrativo)
      - [Deletar administrativo](#deletar-administrativo)
      - [Adicionar entrada e saída](#adicionar-entrada-e-sa-da)
      - [Exibir todos as entradas e saídas](#exibir-todos-as-entradas-e-sa-das)
      - [Adicionar pagamento](#adicionar-pagamento)
      - [Exibir todos os pagamentos](#exibir-todos-os-pagamentos)
      - [Exibir todos os pagamentos por id do aluno](#exibir-todos-os-pagamentos-por-id-do-aluno)
      - [Exibir pagamento por id do pagamento](#exibir-pagamento-por-id-do-pagamento)
      - [Atualizar pagamento](#atualizar-pagamento)
      - [Efetuar pagamento](#efetuar-pagamento)
      - [Deletar pagamento](#deletar-pagamento)
    + [APP Mobile](#app-mobile-1)
      - [Acesso ao app](#acesso-ao-app)
      - [Liberar entrada](#liberar-entrada)
      - [Liberar saída](#liberar-sa-da)
      - [Acesso ao financeiro](#acesso-ao-financeiro)
    + [APP Web](#app-web-1)
      - [Acesso a ferramento](#acesso-a-ferramento)
      - [Controle de entrada e saída dos alunos](#controle-de-entrada-e-sa-da-dos-alunos)
      - [Controle de pagamentos](#controle-de-pagamentos)
      - [Gerar uma cobrança](#gerar-uma-cobran-a)
      - [Visualizar as cobranças](#visualizar-as-cobran-as)
      - [Atualizar uma cobrança](#atualizar-uma-cobran-a)
      - [Deletar uma cobrança](#deletar-uma-cobran-a)
      - [Cadastrar um novo aluno](#cadastrar-um-novo-aluno)
      - [Visualizar todos os alunos](#visualizar-todos-os-alunos)
      - [Atualizar cadastro de um aluno](#atualizar-cadastro-de-um-aluno)
      - [Deletar o cadastro de um aluno](#deletar-o-cadastro-de-um-aluno)

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


<img src="./docs/imgs-docs/Captura de ecrã de 2024-10-22 12-55-41.png" width="500" />

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

## Documentação

Inova Fit possui três serviços:

1. Aplicativo mobile para acesso à academia, saída da academia e controle de pagamentos;
2. Aplicativo web para procedimentos administrativos como o controle de entrada e saída dos alunos, controle de pagamento dos alunos e cadastro de novos alunos; 
3. API para fazer a interface tanto com app mobile, quanto app web armazenando e manipulando os dados do banco.

---

### API

#### Autenticar aluno

|  |  |
|-|-|
| **Método** | POST |
| **Endpoint** | /inova-fit/api/aluno |

```BODY:```

``` json
{
  "email": "string",
  "senha": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Aluno autorizado",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwibm9tZSI6IkJydW5vIiwiZW1haWwiOiJicnVub0BlbWFpbC5jb20iLCJpYXQiOjE3MjkyNjc0MjQsImV4cCI6MTcyOTI3ODIyNH0.ZwzOPT0-xObOWoIWHpvQer-nTWNAhUXVwaK-Oc9o4xk",
  "payload": {
    "id": 6,
    "nome": "string",
    "email": "string"
  }
}
```

---

#### Adicionar aluno

|  |  |
|-|-|
| **Método** | POST |
| **Endpoint** | /inova-fit/api/aluno |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "nome": "string",
  "tipoDocumento": "string",
  "nDocumento": "string",
  "email": "string",
  "endereco": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Aluno cadastrado com sucesso",
  "dados": {
    "id": 1,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_inscricao": "2024-10-10T22:44:59.788Z",
    "senha": "$2a$10$xd3wh7rGJ3prGcyMmRHR6OQODtCHlVlFGhpviDI/s/w3ssdvDpgai",
    "updatedAt": "2024-10-10T22:44:59.909Z",
    "createdAt": "2024-10-10T22:44:59.909Z"
  }
}
```

---

#### Exibir todos os alunos

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/aluno |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
[
  {
    "id": 6,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_inscricao": "2024-10-16T23:48:53.335Z",
    "senha": "$2a$10$4.vvA6ArE0zu69CiYKNrouowUenvEnLB/KlNHk7vGLJ3GcbFioYNa",
    "createdAt": "2024-10-16T23:48:53.487Z",
    "updatedAt": "2024-10-16T23:48:53.487Z"
  },
  {
    "id": 7,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_inscricao": "2024-10-18T19:06:55.713Z",
    "senha": "$2a$10$adFNHiIHshCFmbSjNdM7x.eVeeLkekjPSWD9jFEMQ3HKZ66dC1M8S",
    "createdAt": "2024-10-18T19:06:55.838Z",
    "updatedAt": "2024-10-18T19:06:55.838Z"
  }
]
```

---

#### Exibir aluno por ID

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/aluno/:id |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
{
    "id": 7,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_inscricao": "2024-10-18T19:06:55.713Z",
    "senha": "$2a$10$adFNHiIHshCFmbSjNdM7x.eVeeLkekjPSWD9jFEMQ3HKZ66dC1M8S",
    "createdAt": "2024-10-18T19:06:55.838Z",
    "updatedAt": "2024-10-18T19:06:55.838Z"
  }
```


---

#### Atualizar aluno

|  |  |
|-|-|
| **Método** | PUT |
| **Endpoint** | /inova-fit/api/aluno/:id |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "nome": "string",
  "tipoDocumento": "string",
  "nDocumento": "string",
  "email": "string",
  "endereco": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Aluno atualizado com sucesso"
}
```

---

#### Deletar aluno

|  |  |
|-|-|
| **Método** | DELETE |
| **Endpoint** | /inova-fit/api/aluno/:id |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
{
  "mensagem": "Aluno deletado com sucesso"
}
```

---

#### Autenticar administrativo

|  |  |
|-|-|
| **Método** | POST |
| **Endpoint** | /inova-fit/api/auth/admin |

```BODY:```

``` json
{
  "email": "string",
  "senha": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Admin autorizado",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4xQGVtYWlsLmNvbSIsImlhdCI6MTcyOTExMTc1MywiZXhwIjoxNzI5MTIyNTUzfQ.cArFRvolgwvSWrQGGhjk2eHACL8g7Jkw64f_wA4mtfI",
  "payload": {
    "id": 1,
    "nome": "string",
    "email": "string"
  }
}
```

---

#### Adicionar administrativo

|  |  |
|-|-|
| **Método** | POST |
| **Endpoint** | /inova-fit/api/administrativo |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "nome": "string",
  "tipoDocumento": "string",
  "nDocumento": "string",
  "email": "string",
  "endereco": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Perfil administrativo cadastrado com sucesso",
  "dados": {
    "id": 1,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_admissao": "2024-10-10T22:45:38.384Z",
    "senha": "$2a$10$5TLYeH.KheP.UoeUd1D4MeZqc7tRmBX9RwXGQVGnOBJWlcMPGaFpe",
    "updatedAt": "2024-10-10T22:45:38.501Z",
    "createdAt": "2024-10-10T22:45:38.501Z"
  }
}
```

---

#### Exibir todos os administrativos

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/administrativo |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
[
  {
    "id": 1,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_admissao": "2024-10-10T20:38:10.680Z",
    "senha": "$2a$10$GKBeiHccImSFCOB1PelNV.IJf1zeASm2NlqZb9Hb8Ri2A5FHWoG1y",
    "createdAt": "2024-10-10T20:38:10.680Z",
    "updatedAt": "2024-10-10T20:38:10.680Z"
  },
  {
    "id": 2,
    "nome": "string",
    "tipo_documento": "string",
    "n_documento": "string",
    "email": "string",
    "endereco": "string",
    "data_admissao": "2024-10-18T19:36:50.545Z",
    "senha": "$2a$10$Xsp2yOAC/CA733jVkxlBLuDOobObywollbcEWvu4uYDmXHL.eOydu",
    "createdAt": "2024-10-18T19:36:50.671Z",
    "updatedAt": "2024-10-18T19:36:50.671Z"
  }
]
```

---

#### Exibir administrativo por id

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/administrativo/:id |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
{
  "id": 1,
  "nome": "string",
  "tipo_documento": "string",
  "n_documento": "string",
  "email": "string",
  "endereco": "string",
  "data_admissao": "2024-10-10T22:45:38.384Z",
  "senha": "$2a$10$5TLYeH.KheP.UoeUd1D4MeZqc7tRmBX9RwXGQVGnOBJWlcMPGaFpe",
  "createdAt": "2024-10-10T22:45:38.501Z",
  "updatedAt": "2024-10-10T22:45:38.501Z"
}
```

---

#### Atualizar administrativo

|  |  |
|-|-|
| **Método** | PUT |
| **Endpoint** | /inova-fit/api/administrativo/:id |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "nome": "string",
  "tipoDocumento": "string",
  "nDocumento": "string",
  "email": "string",
  "endereco": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Perfil administrativo atualizado com sucesso"
}
```

---

#### Deletar administrativo

|  |  |
|-|-|
| **Método** | DELETE |
| **Endpoint** | /inova-fit/api/administrativo/:id |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
{
  "mensagem": "Administrador deletado com sucesso"
}
```

---

#### Adicionar entrada e saída

|  |  |
|-|-|
| **Método** | POST |
| **Endpoint** | /inova-fit/api/entrada-saida |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "idAluno": 1,
  "entradaSaida": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Entrada ou saída cadastrado com sucesso",
  "dados": {
    "id": 7,
    "id_aluno": 1,
    "entrada_saida": "string",
    "data_hora": "2024-10-15T22:37:57.830Z",
    "updatedAt": "2024-10-15T22:37:57.833Z",
    "createdAt": "2024-10-15T22:37:57.833Z"
  }
}
```

---

#### Exibir todos as entradas e saídas

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/entrada-saida |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
[
  {
    "id": 1,
    "entrada_saida": "string",
    "data_hora": "2024-10-15T22:29:31.265Z",
    "createdAt": "2024-10-15T22:29:31.265Z",
    "updatedAt": "2024-10-15T22:29:31.265Z",
    "id_aluno": 1,
    "aluno": {
      "nome": "string"
    }
  },
  {
    "id": 2,
    "entrada_saida": "string",
    "data_hora": "2024-10-15T22:29:33.804Z",
    "createdAt": "2024-10-15T22:29:33.805Z",
    "updatedAt": "2024-10-15T22:29:33.805Z",
    "id_aluno": 1,
    "aluno": {
      "nome": "string"
    }
  }
]
```

---

#### Adicionar pagamento

|  |  |
|-|-|
| **Método** | POST |
| **Endpoint** | /inova-fit/api/pagamento |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "idAluno": 1,
  "servico": "string",
  "valor": 80,
  "dataVencimento": "2025-01-10T00:00:00.000Z"
}
```

```Resposta:```

``` json
{
  "mensagem": "Pagamento gerado com sucesso",
  "dados": {
    "id": 5,
    "id_aluno": 1,
    "servico": "string",
    "valor": "80.00",
    "metodo_pagamento": null,
    "data_vencimento": "2025-01-10T03:00:00.000Z",
    "data_pagamento": null,
    "updatedAt": "2024-10-16T19:20:43.566Z",
    "createdAt": "2024-10-16T19:20:43.566Z"
  }
}
```

---

#### Exibir todos os pagamentos

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/pagamento |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
[
  {
    "id": 1,
    "servico": "string",
    "valor": "80.00",
    "metodo_pagamento": null,
    "data_vencimento": "2025-01-10T03:00:00.000Z",
    "data_pagamento": null,
    "createdAt": "2024-10-16T19:20:38.447Z",
    "updatedAt": "2024-10-16T19:20:38.447Z",
    "id_aluno": 1,
    "aluno": {
      "id": 1,
      "nome": "string"
    }
  },
  {
    "id": 2,
    "servico": "string",
    "valor": "80.00",
    "metodo_pagamento": null,
    "data_vencimento": "2025-01-10T03:00:00.000Z",
    "data_pagamento": null,
    "createdAt": "2024-10-16T19:20:40.866Z",
    "updatedAt": "2024-10-16T19:20:40.866Z",
    "id_aluno": 1,
    "aluno": {
      "id": 1,
      "nome": "string"
    }
  }
]
```

---

#### Exibir todos os pagamentos por id do aluno

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/pagamento/aluno/:idAluno |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
[
  {
    "id": 1,
    "servico": "string",
    "valor": "80.00",
    "metodo_pagamento": null,
    "data_vencimento": "2025-01-10T03:00:00.000Z",
    "data_pagamento": null,
    "createdAt": "2024-10-16T19:20:38.447Z",
    "updatedAt": "2024-10-16T19:20:38.447Z",
    "id_aluno": 1,
    "aluno": {
      "id": 1,
      "nome": "string"
    }
  },
  {
    "id": 2,
    "servico": "string",
    "valor": "80.00",
    "metodo_pagamento": null,
    "data_vencimento": "2025-01-10T03:00:00.000Z",
    "data_pagamento": null,
    "createdAt": "2024-10-16T19:20:40.866Z",
    "updatedAt": "2024-10-16T19:20:40.866Z",
    "id_aluno": 1,
    "aluno": {
      "id": 1,
      "nome": "string"
    }
  }
]
```

---

#### Exibir pagamento por id do pagamento

|  |  |
|-|-|
| **Método** | GET |
| **Endpoint** | /inova-fit/api/pagamento/:id |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
{
  "id": 1,
  "servico": "string",
  "valor": "80.00",
  "metodo_pagamento": null,
  "data_vencimento": "2025-01-10T03:00:00.000Z",
  "data_pagamento": null,
  "createdAt": "2024-10-16T19:20:38.447Z",
  "updatedAt": "2024-10-16T19:20:38.447Z",
  "id_aluno": 1,
  "aluno": {
    "id": 1,
    "nome": "string"
  }
}
```

---

#### Atualizar pagamento

|  |  |
|-|-|
| **Método** | PUT |
| **Endpoint** | /inova-fit/api/pagamento/:id |
| **Header** | Authorization: ```Token JWT``` |

```BODY:```

``` json
{
  "idAluno": 1,
  "servico": "string",
  "valor": 80,
  "dataVencimento": "2025-01-10T00:00:00.000Z"
}
```

```Resposta:```

``` json
{
  "mensagem": "Pagamento atualizado com sucesso"
}
```

---

#### Efetuar pagamento

|  |  |
|-|-|
| **Método** | PATCH |
| **Endpoint** | /inova-fit/api/pagamento/pagar |
| **Header** | Authorization: ```Token JWT``` |

``` json
{
  "idPagamento": 1,
  "metodoPagamento": "string"
}
```

```Resposta:```

``` json
{
  "mensagem": "Pagamento efetuado com sucesso",
  "metodoPagamento": "pix",
  "dataPagamento": "2024-10-14T21:30:39.782Z"
}
```

---

#### Deletar pagamento

|  |  |
|-|-|
| **Método** | DELETE |
| **Endpoint** | /inova-fit/api/pagamento/:id |
| **Header** | Authorization: ```Token JWT``` |

```Resposta:```

``` json
{
  "mensagem": "Pagamento deletado com sucesso"
}
```

---

### APP Mobile

#### Acesso ao app

1. Abaixo está a tela de login do app. Aqui, em conjunto com a API será validado as credenciais de acesso do aluno.
2. Caso o aluno tente logar sem o email, receberá mensagem de que o email é obrigatório.
3. O mesmo acontece com a senha.
4. Se algum usuário tentar entrar sem ter cadastro na ferramenta, também recebera uma mensagem de erro.

<img src="./docs/imgs-app/Screenshot_20241018-144953.png" width="250" />
<img src="./docs/imgs-app/Screenshot_20241018-142454.png" width="250" />
<img src="./docs/imgs-app/Screenshot_20241018-142519.png" width="250" />
<img src="./docs/imgs-app/Screenshot_20241018-142550.png" width="250" />

---

#### Liberar entrada

- Quando aluno clicar no botão "Entrar na academia", essa ação será registrada no banco de dados para que assim ele tenha acesso a academia.

<img src="./docs/imgs-app/Screenshot_20241018-142638.png" width="250" />

---

#### Liberar saída

- Ao clicar em "Sair da academia", também será registrado no banco para que o usuário possa sair da academia.

<img src="./docs/imgs-app/Screenshot_20241018-142643.png" width="250" />

---

#### Acesso ao financeiro

1. Nessa tela busca os dados dos pagamentos pendentes como mensalidade, produtos ou qualquer outro serviço que o aluno consumiu da academia.
2. Quando gerado o pagamento pelo administrativo da academia a data de pagamento retornará "N/A"
3. Selecionando uma forma de pagamento o aluno pagará o serviço e será cadastrado no banco com a data em que foi feito o pagamento. 

<img src="./docs/imgs-app/Screenshot_20241018-143253.png" width="250" />
<img src="./docs/imgs-app/Screenshot_20241018-143300.png" width="250" />
<img src="./docs/imgs-app/Screenshot_20241018-152607.png" width="250" />

---

### APP Web

O APP Web tem como objetivo administrar as ações dos alunos no APP Mobile da academia.

#### Acesso a ferramento

- O acesso a ferramenta funciona de forma similar ao do mobile.
- Caso não seja preenchido o campo email, senha ou um usuário desconhecido tente acesssar a ferramenta retornará uma mensagem de erro.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-18 14-44-08.png" width="500" />
<img src="./docs/imgs_web/Captura de ecrã de 2024-10-18 14-44-17.png" width="500" />
<img src="./docs/imgs_web/Captura de ecrã de 2024-10-18 14-44-57.png" width="500" />
<img src="./docs/imgs_web/Captura de ecrã de 2024-10-18 14-45-03.png" width="500" />

#### Controle de entrada e saída dos alunos

- Nessa página estão os registros de entrada e saída dos usuários.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-18 15-43-38.png" width="500" />

#### Controle de pagamentos

- Página responsável por vizualizar pagamentos pendentes.
- Gerar um novo pagamento.
- Atualizar o pagamento.
- Deletar pagamento.

#### Gerar uma cobrança

- Para gerar um novo pagamento basta selecionar o aluno pré cadastrado no banco.
- Preencher o campo serviço.
- O valor do serviço, pode ser um valor inteiro ou um número decimal separado por ponto.
- E por fim a data de vencimento da fatura.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-35-38.png" width="500" />

#### Visualizar as cobranças

- Quando gerado data de pagamento e método de pagamento ficarão com status "Pendente".
- Quando o aluno selecionar a forma de pagamento no aplicativo, a data de pagamento e o método de pagamento será preenchido por seus respectivos dados.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-40-35.png" width="500" />
<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-44-39.png" width="500" />

#### Atualizar uma cobrança

- Funciona da mesma forma como o formulário para gerar nova cobrança, porém com os dados carregados do banco.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-41-50.png" width="500" />

#### Deletar uma cobrança

- Ao clicar na lixeira o registro será deletado permanentemente do banco de dados

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-50-46.png" width="500" />

#### Cadastrar um novo aluno

Para cadastrar um novo aluno é necessário preencher os campos:
- Nome, com o nome completo do aluno;
- Tipo de documento, sendo "RG" ou "CPF";
- O número do documento, email e endereço.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-53-44.png" width="500" />

#### Visualizar todos os alunos

- Página para vizualização de todos os clientes registrados.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-56-50.png" width="500" />

#### Atualizar cadastro de um aluno

- Funciona da mesma forma que a página para cadastrar um novo aluno, porém com os dados do registro do aluno que será atulizado pré carregados.

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-53-44.png" width="500" />

#### Deletar o cadastro de um aluno

- Ao clicar no ícone da lixeira os dados serão deletados definitivamente do banco de dados

<img src="./docs/imgs_web/Captura de ecrã de 2024-10-21 19-59-09.png" width="500" />
