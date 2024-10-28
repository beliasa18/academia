const env = {
  urlApi: 'http://127.0.0.1:3000/inova-fit/api'
}

async function autorizacao() {
  await axios.get(env.urlApi, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data.mensagem);
  })
  .catch(error => {
    console.log(error.response.data.mensagem);
    if (location.pathname.includes('login.html')) {
      return 0;
    } else if (location.pathname.includes('pages')) {
      location.href = './login.html';
    } else {
      location.href = './src/pages/login.html';
    }
  });
}

function popUpSucesso(mensagem) {
  Swal.fire({
    title: "Sucesso!",
    text: mensagem,
    icon: "success"
  });
}

function popUpErro(mensagem) {
  Swal.fire({
    title: "Erro!",
    text: mensagem,
    icon: "error"
  });
}

function converteDataHora(dataHora) {
  let data = dataHora
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');
  let hora = dataHora
    .split('T')[1]
    .split('Z')[0]
    .split('.')[0]
    .split(':');
  
  hora[0] = hora[0] - 6;

  hora = hora.join(':');
  return {
    data,
    hora,
  };
}

function recarregaPagina() {
  setTimeout(() => {
    location.reload();
  }, 2000);
}

autorizacao();

async function logar() {
  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;

  await axios.post(`${env.urlApi}/auth/admin`, {
    email,
    senha,
  })
  .then(response => {
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('payload', JSON.stringify(response.data.payload));
    popUpSucesso(response.data.mensagem);
    setTimeout(() => {
      location.href = '../../index.html'
    }, 2000);
  })
  .catch(error => {
    popUpErro(error.response.data.mensagem)
  })
}

// CONTROLE DE ENTRADA E SAÍDA DOS ALUNOS

async function pegaEntradaSaida() {
  const tabelaEntradaSaida = document.querySelector('#tabela-entrada-saida');

  await axios.get(`${env.urlApi}/entrada-saida`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    if (response.data.length === 0) {
      tabelaEntradaSaida.textContent = 'Não há dados no momento';
      tabelaEntradaSaida.className = 'text-primary'
    }

    response.data.map(item => {
      const tr = document.createElement('tr');
      tabelaEntradaSaida.appendChild(tr);
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = item.id;
      tr.appendChild(th);
      const tdAluno = document.createElement('td');
      tdAluno.textContent = item.aluno.nome;
      tdAluno.className = 'captalize';
      tr.appendChild(tdAluno);
      const tdEntradaSaida = document.createElement('td');
      tdEntradaSaida.textContent = item.entrada_saida;
      tdEntradaSaida.className = 'captalize';
      tr.appendChild(tdEntradaSaida);
      const tdDataHora = document.createElement('td');
      tdDataHora.textContent = converteDataHora(item.data_hora).data + ' ' + converteDataHora(item.data_hora).hora;
      tr.appendChild(tdDataHora);      
    })
  })
  .catch(error => {
    console.log(error);
    
  })
}

// CONTROLE DE PAGAMENTOS

async function pegaPagamentos() {
  const tabelaPagamentos = document.querySelector('#tabela-pagamentos')
  
  await axios.get(`${env.urlApi}/pagamento`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    if (response.data.length === 0) {
      tabelaPagamentos.textContent = 'Não há dados no momento';
      tabelaPagamentos.className = 'text-primary'
    }

    response.data.map(item => {
      const tr = document.createElement('tr');
      tabelaPagamentos.appendChild(tr);
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = item.id;
      tr.appendChild(th);
      const tdAluno = document.createElement('td');
      tdAluno.textContent = item.aluno.nome;
      tdAluno.className = 'captalize';
      tr.appendChild(tdAluno);
      const tdServico = document.createElement('td');
      tdServico.textContent = item.servico;
      tdServico.className = 'captalize';
      tr.appendChild(tdServico);
      const tdValor = document.createElement('td');
      tdValor.textContent = 'R$ ' + item.valor.replace('.', ',');
      tr.appendChild(tdValor);
      const tdDataVencimento = document.createElement('td')
      tdDataVencimento.textContent = converteDataHora(item.data_vencimento).data;
      tr.appendChild(tdDataVencimento);
      const tdDataPagamento = document.createElement('td');
      tdDataPagamento.textContent = item.data_pagamento ? converteDataHora(item.data_pagamento).data : 'pendente';
      tdDataPagamento.className = 'captalize'
      tr.appendChild(tdDataPagamento);
      const tdMetodoPagamento = document.createElement('td');
      tdMetodoPagamento.textContent = item.metodo_pagamento ? item.metodo_pagamento : 'pendente';
      tdMetodoPagamento.className = 'captalize'
      tr.appendChild(tdMetodoPagamento)
      const tdButtons = document.createElement('td')
      tr.appendChild(tdButtons);
      const buttonAtualizar = document.createElement('button');
      buttonAtualizar.type = 'button';
      buttonAtualizar.className = 'btn btn-primary bi bi-pencil-square me-2';
      buttonAtualizar.addEventListener('click', () => location.href = './form-alterar-pagamento.html?idPagamento=' + item.id);
      tdButtons.appendChild(buttonAtualizar);
      const buttonDeletar = document.createElement('button');
      buttonDeletar.type = 'button';
      buttonDeletar.className = 'btn btn-danger bi bi-trash';
      buttonDeletar.addEventListener('click', () => deletaPagamento(item.id));
      tdButtons.appendChild(buttonDeletar)
    });
  })
  .catch(error => {
    console.log(error);
  });
}

async function pegaAlunosParaPagamento() {
  const idAluno = document.querySelector('#idAluno');

  await axios.get(`${env.urlApi}/aluno`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data);
    response.data.map(item => {
      const selectAluno = document.createElement('option');
      selectAluno.value = item.id;
      selectAluno.textContent = item.nome;
      selectAluno.classList = 'captalize';
      idAluno.appendChild(selectAluno);
    })
  })
  .catch(error => {
    console.log(error);
  });
}

async function novoPagamento() {
  const idAluno = document.querySelector('#idAluno').value;
  const servico = document.querySelector('#servico').value;
  const valor = document.querySelector('#valor').value;
  const dataVencimento = document.querySelector('#dataVencimento').value;

  await axios.post(`${env.urlApi}/pagamento`, {
    idAluno,
    servico,
    valor,
    dataVencimento,
  }, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    popUpSucesso(response.data.mensagem);
  })
  .catch(error => {
    popUpErro(error.response.data.mensagem);
  });
}

async function deletaPagamento(id) {
  await axios.delete(`${env.urlApi}/pagamento/${id}`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    popUpSucesso(response.data.mensagem);
    recarregaPagina();
  })
  .catch(error => {
    console.log(error);
    popUpErro(error.response.data.mensagem);
  });
}

async function preencheFormPagamento() {
  const idAluno = document.querySelector('#idAluno');
  const servico = document.querySelector('#servico');
  const valor = document.querySelector('#valor');
  const dataVencimento = document.querySelector('#dataVencimento');

  const idPagamento = location.search
    .split('=')[1];

  console.log(idPagamento);

  await axios.get(`${env.urlApi}/pagamento/${idPagamento}`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data);
    idAluno.value = response.data.id_aluno;
    servico.value = response.data.servico;
    valor.value = response.data.valor;
    dataVencimento.value = response.data.data_vencimento
      .split('T')[0];
  })
  .catch(error => {
    console.log(error);
  })
}

async function atualizaPagamento() {
  const idAluno = document.querySelector('#idAluno').value;
  const servico = document.querySelector('#servico').value;
  const valor = document.querySelector('#valor').value;
  const dataVencimento = document.querySelector('#dataVencimento').value;

  const idPagamento = location.search
    .split('=')[1];

  console.log(idPagamento);

  await axios.put(`${env.urlApi}/pagamento/${idPagamento}`, {
    idAluno,
    servico,
    valor,
    dataVencimento,
  }, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    popUpSucesso(response.data.mensagem);
  })
  .catch(error => {
    popUpErro(error.response.data.mensagem);
  })
}

// CADASTRO DOS ALUNOS

async function pegaAlunos() {
  const tabelaAlunos = document.querySelector('#tabela-alunos')
  
  await axios.get(`${env.urlApi}/aluno`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data);
    if (response.data.length === 0) {
      tabelaAlunos.textContent = 'Não há dados no momento';
      tabelaAlunos.className = 'text-primary'
    }

    response.data.map(item => {
      const tr = document.createElement('tr');
      tabelaAlunos.appendChild(tr);
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = item.id;
      tr.appendChild(th);
      const tdNome = document.createElement('td');
      tdNome.textContent = item.nome;
      tdNome.className = 'captalize'
      tr.appendChild(tdNome);
      const tdTipoDocumento = document.createElement('td');
      tdTipoDocumento.textContent = item.tipo_documento.toUpperCase();
      tr.appendChild(tdTipoDocumento);
      const tdNumDocumento = document.createElement('td');
      tdNumDocumento.textContent = item.n_documento;
      tr.appendChild(tdNumDocumento);
      const tdEmail = document.createElement('td');
      tdEmail.textContent = item.email;
      tr.appendChild(tdEmail);
      const tdEndereco = document.createElement('td');
      tdEndereco.textContent = item.endereco;
      tdEndereco.className = 'captalize';
      tr.appendChild(tdEndereco);
      const tdDataInscriao = document.createElement('td');
      tdDataInscriao.textContent = converteDataHora(item.data_inscricao).data;
      tr.appendChild(tdDataInscriao);
      const tdButtons = document.createElement('td')
      tr.appendChild(tdButtons);
      const buttonAtualizar = document.createElement('button');
      buttonAtualizar.type = 'button';
      buttonAtualizar.className = 'btn btn-primary bi bi-pencil-square me-2';
      buttonAtualizar.addEventListener('click', () => location.href = './form-alterar-aluno.html?idAluno=' + item.id);
      tdButtons.appendChild(buttonAtualizar);
      const buttonDeletar = document.createElement('button');
      buttonDeletar.type = 'button';
      buttonDeletar.className = 'btn btn-danger bi bi-trash';
      buttonDeletar.addEventListener('click', () => deletaAluno(item.id));
      tdButtons.appendChild(buttonDeletar);
    })
  })
  .catch(error => {
    console.log(error);
  });
}

async function novoAluno() {
  const nome = document.querySelector('#nome').value;
  const tipoDocumento = document.querySelector('#tipoDocumento').value;
  const nDocumento = document.querySelector('#nDocumento').value;
  const email = document.querySelector('#email').value;
  const endereco = document.querySelector('#endereco').value;
  
  await axios.post(`${env.urlApi}/aluno`, {
    nome,
    tipoDocumento,
    nDocumento,
    email,
    endereco,
  }, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data);
    popUpSucesso(response.data.mensagem);
  })
  .catch(error => {
    console.log(error);
    popUpErro(error.response.data.mensagem);
  });
}

async function deletaAluno(id) {
  await axios.delete(`${env.urlApi}/aluno/${id}`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    popUpSucesso(response.data.mensagem);
    recarregaPagina();
  })
  .catch(error => {
    console.log(error);
    
    popUpErro(error.response.data.mensagem);
  });
}

async function preencheFormAluno() {
  const idAluno = location.search
    .split('=')[1];
  const nome = document.querySelector('#nome');
  const tipoDocumento = document.querySelector('#tipoDocumento');
  const nDocumento = document.querySelector('#nDocumento');
  const email = document.querySelector('#email');
  const endereco = document.querySelector('#endereco');
  

  await axios.get(`${env.urlApi}/aluno/${idAluno}`, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data);
    nome.value = response.data.nome;
    tipoDocumento.value = response.data.tipo_documento;
    nDocumento.value = response.data.n_documento;
    email.value = response.data.email;
    endereco.value = response.data.endereco;
  })
  .catch(error => {
    console.log(error.response.data);
    
  })
}

async function atualizaAluno() {
  const idAluno = location.search
    .split('=')[1];
  const nome = document.querySelector('#nome').value;
  const tipoDocumento = document.querySelector('#tipoDocumento').value;
  const nDocumento = document.querySelector('#nDocumento').value;
  const email = document.querySelector('#email').value;
  const endereco = document.querySelector('#endereco').value;
  
  await axios.put(`${env.urlApi}/aluno/${idAluno}`, {
    nome,
    tipoDocumento,
    nDocumento,
    email,
    endereco,
  }, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  })
  .then(response => {
    console.log(response.data);
    popUpSucesso(response.data.mensagem);
  })
  .catch(error => {
    console.log(error);
    popUpErro(error.response.data.mensagem);
  });
}
