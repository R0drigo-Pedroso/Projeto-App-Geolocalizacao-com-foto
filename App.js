import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  View,
  Button,
  Image,
} from "react-native";

export default function App() {
  const [text, onChangeText] = React.useState("");

  const [foto, setFoto] = useState();

  const acessarCamera = async () => {
    const fotoTirada = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 05,
    });

    console.log(fotoTirada);

    setFoto(fotoTirada.assets[0].uri);
  };

  return (
    <SafeAreaView style={estilo.container}>
      <View style={estilo.areaTotal}>
        <ScrollView>
          <StatusBar />
          <Text style={estilo.textTitulo}>App 01 Foto / Localização</Text>
          <TextInput
            style={estilo.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Digite o Local da foto"
          />

          <View style={estilo.imageFoto}>
            <Image style={estilo.foto}>
              {foto && (
                <Image
                  source={{ uri: foto }}
                  style={{ width: 300, height: 200 }}
                />
              )}
            </Image>
            <Button title="Tirar Foto" onPress={acessarCamera} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  areaTotal: {
    margin: 10,
  },

  textTitulo: {
    marginTop: 50,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 24,
  },

  input: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },

  foto: {
    height: 300,
    marginVertical: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
});
