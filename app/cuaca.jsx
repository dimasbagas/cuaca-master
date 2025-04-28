import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const homescreen = () => {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState("pamekasan");
  const [weather, setWeather] = useState(null);
  const router = useRouter();

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

  const handleCancelInput = () => {
    setShowInput(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (


    <LinearGradient colors={['#643DFF', '#B214A7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={style.gradient}>

        <StatusBar style="light" translucent backgroundColor="transparent" />

        <View
          style={{
            flex: 1,
            paddingTop: 60,
            padding: 20,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {/* input daerah */}
          <View style={style.container}>
            {showInput ? (
              <>
                <TouchableOpacity onPress={handleCancelInput} style={{ marginLeft: 10 }}>
                  <Icon name="times" size={24} color="white" />
                </TouchableOpacity>
                <TextInput
                  style={[style.textInput, { flex: 1, marginLeft: 10 }]}
                  placeholder="Cari lokasi..."
                  placeholderTextColor="#888"
                  autoFocus={true}
                  keyboardType="web-search"
                  value={location}
                  onChangeText={setLocation}
                  onSubmitEditing={getWeather}
                />
              </>
            ) : (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => setShowInput(true)}
              >
                <Icon name="search" size={24} color={"#fff"} />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => router.push('/slidescreen')}>
              <Feather name="bar-chart-2" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* konten */}
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
              />

              {/* bagian bawah */}
              <View>
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
                    <View style={style.infobar}>
                      <View style={{width: weather.clouds.all /2, height: 5, backgroundColor: '#69F0AE'}}></View>
                    </View>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={style.humidityText}>Humidity</Text>
                    <Text style={style.valueText}>{weather.main.humidity}</Text>
                    <Text style={style.humidityText}>%</Text>
                    <View style={style.infobar}>
                      <View style={{width: weather.clouds.all /2, height: 5, backgroundColor: '#69F0AE'}}></View>
                    </View>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={style.humidityText}>Wind</Text>
                    <Text style={style.valueText}>{weather.wind.speed}</Text>
                    <Text style={style.humidityText}>m/s</Text>
                    <View style={style.infobar}>
                      <View style={{width: weather.clouds.all /2, height: 5, backgroundColor: '#69F0AE'}}></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
    </LinearGradient>
  );
};

export default homescreen;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
  },
  resultText: {
    color: "#f0f0f0",
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
  button: {
    padding: 10,
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 8,
  },
  gradient: {
    flex: 1,
  },
  infobar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(225, 225, 225, 0.5)'
  }
});
