import { Text, View } from "react-native";
import { estilos } from "../estilos";

type TipoPropsMensagem = { 
  corBg: string; 
  titulo: string; 
  conteudo: string;
 }

export default function Mensagem(props: TipoPropsMensagem) {
  return (
    <View style={{
      margin: 10,
    }}>
      <Text style={[
        estilos.titulo1,
        estilos.corTxt3,
        {
          padding: 10,
          backgroundColor: props.corBg,
        }
        ]}>{ props.titulo }</Text>
      <Text style={[
        estilos.bg3,
        {
          padding: 10,
          fontSize: 20
        }
      ]}>{ props.conteudo }</Text>
    </View>
  )
}