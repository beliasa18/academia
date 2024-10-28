import { Button, StatusBar, Text, TextInput, View } from "react-native";
import Header from "../components/header";
import Mensagem from "../components/mensagem";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { estilos } from "../estilos";
import TabelaFinanceiro from "../components/tabelaFinanceiro";
import axios from 'axios';
import env from '../config/env'

export default function Inicio() {
  const [logado, setLogado] = useState(false)
  const [entraAcademia, setEntraAcademia] = useState(false);
  const [saiAcademia, setSaiAcademia] = useState(false);
  const [acessaFinanceiro, setAcessaFinanceiro] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [token, setToken] = useState('');
  const [idAluno, setIdAluno] = useState('')
  const [nomeAluno, setNomeAluno] = useState('')
  const [dadosFinanceiro, setDadosFinanceiro] = useState([]);
  const [loadingFinanceiro, setLoadingFinanceiro] = useState(true);
  
  const logar = async () => {    
    await axios.post(`${env.urlApi}/auth/aluno`, {
      email: inputEmail.toLowerCase() || '',
      senha: inputSenha || '',
    })
      .then(response => {
        setToken(response.data.token);
        setIdAluno(response.data.payload.id);
        setNomeAluno(response.data.payload.nome);
        setLogado(true);
      })
      .catch(error => {
        console.log(error.response.data.mensagem);
        alert(error.response.data.mensagem)
      })
  }

  const entrarNaAcademia = async () => {
    axios.post(`${env.urlApi}/entrada-saida/`, {
      idAluno,
      entradaSaida: 'entrada',
    }, {
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      console.log(response.data.mensagem);
    })
    .catch(error => {
      console.log(error.response.data.mensagem);
    });
  }

  const sairDaAcademia = async () => {
    axios.post(`${env.urlApi}/entrada-saida/`, {
      idAluno,
      entradaSaida: 'saida',
    }, {
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      console.log(response.data.mensagem);
    })
    .catch(error => {
      console.log(error.response.data.mensagem);
    });
  }

  const pegaDadosFinanceiro = async () => {
    await axios.get(`${env.urlApi}/pagamento/aluno/${idAluno}`, {
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      setLoadingFinanceiro(true);
      setDadosFinanceiro(response.data);
      setLoadingFinanceiro(false);
    })
    .catch(error => {
      console.log(error.response.data.mensagem);
    })
  }

  const storeData = async (chave: string, valor: string) => {
    await SecureStore.setItemAsync(chave, valor);
  }

  const getData = async (chave: string) => {
    const valor = await SecureStore.getItemAsync(chave);

    return valor
  } 

  if (!logado) return (
    <View style={{
      height: '100%',
      display: 'flex',
      justifyContent: "center",
      padding: 30,
    }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <Text style={[
        estilos.titulo1,
        estilos.bg1,
        estilos.corTxt3,
        {
          padding: 10,
          textAlign: "center",
          borderRadius: 3,
          marginBottom: 10,
        }
      ]}>Inova Fit</Text>
      <View>
        <Text>Email</Text>
        <TextInput onChangeText={email => setInputEmail(email)} id="email" style={estilos.input} placeholder="Digite seu email" />
      </View>

      <View>
        <Text>Senha</Text>
        <TextInput onChangeText={senha => setInputSenha(senha)} id="senha" style={estilos.input} secureTextEntry={ true } placeholder="Digite sua senha" />
      </View>

      <Button onPress={() => logar()} title="Acessar" />
    </View>
  )

  if (logado) return (
    <View>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />

      <Header />

      <Text style={{
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        padding: 5,
      }}>Olá, { nomeAluno.toUpperCase() || '' }</Text>

      <View style={{ padding: 10 }}>
        <Button title='Entrar na academia' color={'#384B70'} onPress={() => {
          setSaiAcademia(false);
          setAcessaFinanceiro(false);
          setEntraAcademia(true);
          entrarNaAcademia();
        }} />
      </View>
      <View style={{ padding: 10 }}>
        <Button title='Sair da academia' color={'#B8001F'} onPress={() => {
          setAcessaFinanceiro(false);
          setEntraAcademia(false);
          setSaiAcademia(true);
          sairDaAcademia();
        }} />
      </View>
      <View style={{ padding: 10 }}>
        <Button title='Financeiro' color={'#507687'} onPress={() => {
          setSaiAcademia(false);
          setEntraAcademia(false);
          setAcessaFinanceiro(true);
          pegaDadosFinanceiro();
        }} />
      </View>

      { entraAcademia ? <Mensagem corBg='#384B70' titulo='Entrada' conteudo='Acesso liberado!' /> : undefined }
      { saiAcademia ? <Mensagem corBg='#B8001F' titulo='Saída' conteudo='Saída liberada! Obrigado pela preferência.' /> : undefined }
      { acessaFinanceiro 
        ? loadingFinanceiro ? <Text style={{ paddingLeft:15 }}>Carregando...</Text>  : <TabelaFinanceiro dados={ dadosFinanceiro } token={ token } />
        : undefined }
    </View>
  );
}