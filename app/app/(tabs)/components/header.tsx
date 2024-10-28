import { StyleSheet, Text, View } from "react-native";
import { estilos } from "../estilos";

export default function Header() {
  return (
    <View style={[estilos.container, estilos.bg1]}>
      <Text style={[estilos.titulo1, estilos.corTxt3]}>Inova Fit</Text>
    </View>
  )
}