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
  const [statusImage, permissionImage] = ImagePicker.useCameraPermissions();
  const [fotoCapt, setFotoCapt] = useState();

  useEffect(() => {
    async function verficarPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      permissionImage(cameraStatus) === "granted";
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
  /* -------------------------------------------------------- */
  /* Configuração de mostra localização */
  const [meuLocal, setMeulocal] = useState(null);
  const [localizacao, setLocalizacao] = useState();

  useEffect(() => {
    async function obterLocalizacao() {
      const { obterStatus } = Location.requestForegroundPermissionsAsync();

      let localizacaoAtual = await Location.getCurrentPositionAsync();
      setMeulocal(localizacaoAtual);
    }

    obterLocalizacao();
  }, []);

  console.log(meuLocal);

  const regiaoInicial = {
    latitude: -10,
    longitude: -55,
    latitudeDelta: 40,
    longitudeDelta: 40,
  };
  const marcarLocal = (e) => {
    setLocalizacao({
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      ...meuLocal.coords,
    });

    console.log(localizacao);
  };

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
              liteMode={false}
              mapType="standard"
              region={localizacao ?? regiaoInicial}
              onPress={(e) => {
                setLocalizacao({
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                  latitude: meuLocal.coords.latitude,
                  longitude: meuLocal.coords.longitude,
                });
                console.log(localizacao);
              }}
            >
              {localizacao && (
                <Marker
                  coordinate={localizacao}
                  title="estou aqui!"
                  draggable
                  onPress={(event) => {
                    console.log(event.nativeEvent);
                  }}
                ></Marker>
              )}
            </MapView>
          </View>

          {meuLocal && <Button title="Localização" onPress={marcarLocal} />}
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
    borderRadius: 5,
  },

  mapa: {
    height: 300,
  },
});
