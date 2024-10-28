import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { estilos } from "../estilos";
import axios from "axios";
import env from "../config/env";

type TipoDadosPagamento = {
  id: number;
  servico: string;
  valor: string;
  metodo_pagamento: string | null;
  data_vencimento: string;
  data_pagamento: string | null;
  createdAt: string;
  updatedAt: string;
  id_aluno: number;
}

export default function TabelaFinanceiro(props: {
  dados: Array<TipoDadosPagamento>,
  token: string,
}) {
  function efetuarPagamento(idPagamento: number, metodoPagamento: string) {
    axios.patch(`${env.urlApi}/pagamento/pagar`, {
      idPagamento,
      metodoPagamento,
    }, {
      headers: {
        Authorization: props.token,
      }
    })
    
    alert('Boleto pago com sucesso!')
  }
  
  return (
    <View style={{
      margin: 10,
    }}>
      <Text style={[
        estilos.titulo1, 
        estilos.bg2, 
        estilos.corTxt3,
        {
          padding: 10
        }
      ]}>Financeiro</Text>
        <ScrollView horizontal>
          <View style={[estiloTabela.table]}>
            <View style={[estiloTabela.tr]}>
              <Text style={[estiloTabela.th]}>Serviço</Text>
              <Text style={[estiloTabela.th]}>Valor</Text>
              <Text style={[estiloTabela.th]}>Data do Vencimento</Text>
              <Text style={[estiloTabela.th]}>Pago</Text>
              <Text style={[estiloTabela.th]}>Data de Pagamento</Text>
              <Text style={[estiloTabela.th]}>Forma de Pagamento</Text>
            </View>
            { props.dados.length === 0 
              ? <Text style={{ paddingLeft: 10 }}>Não há pagamentos pendentes</Text>
              : props.dados.map(dado => (
                <View style={[estiloTabela.tr]} key={ dado.id }>
                  <Text style={[estiloTabela.td]}>{ dado.servico }</Text>
                  <Text style={[estiloTabela.td]}>R$ { dado.valor.replaceAll('.', ',') }</Text>
                  <Text style={[estiloTabela.td]}>{ dado.data_vencimento.split('T')[0].split('-').reverse().join('/') }</Text>
                  <Text style={[estiloTabela.td]}>{ dado.data_pagamento ? 'Sim' : 'Não' }</Text>
                  <Text style={[estiloTabela.td]}>{ dado.data_pagamento ? dado.data_pagamento.split('T')[0].split('-').reverse().join('/') : 'N/A' }</Text>
                  <Text style={[estiloTabela.td]}>
                    <Text style={estiloTabela.link} onPress={() => efetuarPagamento(dado.id, 'pix')}>Pix</Text>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Text style={estiloTabela.link} onPress={() => efetuarPagamento(dado.id, 'boleto')}>Boleto</Text>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Text style={estiloTabela.link} onPress={() => efetuarPagamento(dado.id, 'credito')}>Crédito</Text>
                  </Text>
                </View>
              ))
            }
          </View>
        </ScrollView>
    </View>
  )
}

const estiloTabela = StyleSheet.create({
  table: {
    padding: 5
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
  },
  td: {
    padding: 5,
    fontSize: 14,
    width: 200,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 3,
    margin: 1,
  },
  th: {
    padding: 5,
    fontSize: 14,
    width: 200,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 3,
    margin: 1
  },
  link: {
    textDecorationLine: 'underline',
    color: '#507687'
  }
})