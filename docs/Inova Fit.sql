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

insert into aluno (
	"nome",
	"tipo_documento",
	"n_documento",
	"email",
	"endereco",
	"data_inscricao",
	"senha",
	"createdAt",
	"updatedAt"
) values (
	'aluno1',
	'cpf',
	'00000000000',
	'aluno1@email.com',
	'rua das ruas, 123, são paulo - sp',
	now(),
	'$2a$10$GKBeiHccImSFCOB1PelNV.IJf1zeASm2NlqZb9Hb8Ri2A5FHWoG1y',
	now(),
	now()
);

select * from aluno order by id;

drop table aluno;

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

insert into administrativo (
	"nome",
	"tipo_documento",
	"n_documento",
	"email",
	"endereco",
	"data_admissao",
	"senha",
	"createdAt",
	"updatedAt"
) values (
	'admin1',
	'cpf',
	'00000000000',
	'admin1@email.com',
	'rua das ruas, 123, são paulo - sp',
	now(),
	'$2a$10$GKBeiHccImSFCOB1PelNV.IJf1zeASm2NlqZb9Hb8Ri2A5FHWoG1y',
	now(),
	now()
);

select * from administrativo order by id;

drop table administrativo;

create table entrada_saida (
	"id" serial primary key,
	"id_aluno" integer not null,
	"entrada_saida" varchar(255) not null,
	"data_hora" timestamp not null,
	"createdAt" timestamp not null,
	"updatedAt" timestamp not null,
	foreign key (id_aluno) references aluno(id) 
);

select * from entrada_saida order by id;

drop table entrada_saida ;

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

select * from pagamento order by id;

drop table pagamento ;































