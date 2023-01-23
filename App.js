import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

/* Import do pacote de capturaImage */
import * as ImagePicker from "expo-image-picker";

/* Import do pocate de localização  */
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";

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
  /* Configurações da capturar imagens */
  const [text, onChangeText] = React.useState();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [fotoCapt, setFotoCapt] = useState();

  useEffect(() => {
    async function verficarPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus) === "granted";
    }

    verficarPermissoes();
  }, []);

  const capturarFoto = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(imagem);

    setFotoCapt(imagem.assets[0].uri);
  };
  /* Configurações da capturar imagens */

  /* Configuração de mostra localização */
  const [localizacaoReal, setLocalizacaoReal] = useState(nul);

  useEffect(() => {
    async function verficarPermissoes() {
      const { locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      requestPermission(locationStatus === "granted");

      let localizacao = await Location.getCurrentPositionAsync({});
      console.log("Status: " + status.status);
      setLocalizacaoReal(localizacao);
    }
    verficarPermissoes();
  });

  console.log(localizacaoReal);

  /* tenho que continhar aqui fazendo a configuração da Latitude e longitute */

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

          {/* Capturar foto  */}
          <View style={estilo.imageFoto}>
            {fotoCapt && (
              <Image
                source={{ uri: fotoCapt }}
                style={{ width: 350, height: 200 }}
              />
            )}
          </View>
          <Button title="Tirar Foto" onPress={capturarFoto} />
          {/* capturar foto final */}

          {/* Mostra Localização */}
          <View style={estilo.imageFoto}>
            <MapView
              style={estilo.mapa}
              region={localizacao ?? regiaoInicial}
              liteMode={false}
              mapType="standard"
            >
              {localizacao && (
                <Marker
                  coordinate={localizacao}
                  title="Aqui!!!"
                  onPress={(e) => console.log(e.nativeEvent)}
                />
              )}
            </MapView>
          </View>
          <Button title="Localização" onPress={marcarLocal} />
          {/* Mostra Localização - final do codigo */}
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

  imageFoto: {
    marginVertical: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
});
