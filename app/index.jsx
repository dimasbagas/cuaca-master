import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=44be9e79396d022e0b9503a4fe80ea26&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/images/night2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <View
          style={{
            flex: 1,
            paddingTop: 60,
            padding: 20,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View style={style.container}>
            {!showInput ? (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => setShowInput(true)}
              >
                <Icon name="search" size={24} color={"#fff"} />
              </TouchableOpacity>
            ) : (
              <TextInput
                style={style.textInput}
                placeholder="Cari lokasi..."
                placeholderTextColor="#888"
                autoFocus={true}
                keyboardType="web-search"
                value={location}
                onChangeText={setLocation}
                onSubmitEditing={getWeather}
                onBlur={() => setShowInput(false)}
              />
            )}
          </View>

          {/* Konten Cuaca */}
          {weather && weather.main && (
            <View style={{ flex: 1 }}>
              {/* Bagian atas */}
              <View>
                <Text style={{ fontSize: 40, color: "#ffffff" }}>
                  {weather.name}
                  <Text style={style.resultText}> {weather.sys.country}</Text>
                </Text>
                <Text style={style.resultText}>
                  Temperatur Min: {weather.main.temp_min}°C
                </Text>
                <Text style={style.resultText}>
                  Temperatur Max: {weather.main.temp_max}°C
                </Text>
                <Text style={style.resultText}>
                  Koordinat: [{weather.coord.lat}, {weather.coord.lon}]
                </Text>
              </View>

              <View style={{ marginTop: "auto" }}>
                <Text style={{ fontSize: 50, color: "#ffffff" }}>
                  {weather.main.temp}°C
                </Text>
                <Text style={style.resultText}>
                  Cuaca: {weather.weather[0].description}
                </Text>
              </View>

              <View
                style={{
                  borderBottomColor: "rgba(225,225,225,0.7)",
                  borderBottomWidth: 1,
                  marginTop: 20,
                }}
              ></View>

              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={style.humidityText}>Clouds</Text>
                    <Text style={style.valueText}>{weather.clouds.all}</Text>
                    <Text style={style.humidityText}>%</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={style.humidityText}>Humadity</Text>
                    <Text style={style.valueText}>{weather.main.humidity}</Text>
                    <Text style={style.humidityText}>°C</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={style.humidityText}>Wind</Text>
                    <Text style={style.valueText}>{weather.wind.speed}</Text>
                    <Text style={style.humidityText}>m/s</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </>
  );
};

export default Index;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#f0f0f0f0",
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 40,
    color: "#000",
  },
  resultText: {
    color: "#f0f0f0f0",
    fontSize: 14,
    marginVertical: 4,
  },
  humidityText: {
    color: "#f0f0f0",
    fontSize: 14,
  },
  valueText: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
