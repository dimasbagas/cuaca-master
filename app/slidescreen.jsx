import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";


const Slidescreen = () => {
  const router = useRouter();
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState(["surabaya", "jakarta"]);
  const [showInput, setShowInput] = useState(false);
  const [newLocation, setNewLocation] = useState('');


  const getWeather = async () => {
    try {
      const responses = await Promise.all(
        location.map((city) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=44be9e79396d022e0b9503a4fe80ea26&units=metric`).then((res) => res.json())
        )
      );
      setWeather(responses);
    } catch (error) {
      console.error("error cuaca", error)
    }
  };

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=44be9e79396d022e0b9503a4fe80ea26&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) { 
        setWeather((prevWeather) => [...prevWeather, data]);
        setLocation((prevLocation) => [...prevLocation, newLocation]);
      } else {
        console.error("Kota tidak ditemukan:", data.message);
      }
    } catch (error) {
      console.error("Error menambahkan cuaca", error);
    }

    setNewLocation(''); 
    setShowInput(false); 
  };

  const handleCancelInput = () => {
    setNewLocation('');
    setShowInput(false);
  };

  useEffect(() => {
    getWeather();
  },
    []);

  return (
    <LinearGradient colors={['#643DFF', '#B214A7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={style.gradient}>

      <View style={{ flex: 1, padding: 20, gap: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            gap: 10,
          }}
        >
          {!showInput ? (
            <>
              <TouchableOpacity onPress={() => router.push('/cuaca')}>
                <Feather name="arrow-left" size={40} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                Manage Location
              </Text>
              <TouchableOpacity
                style={{ marginLeft: 'auto' }}
                onPress={() => setShowInput(true)}
              >
                <Icon name="plus" size={24} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <TextInput
                style={[style.textInput, { flex: 1 }]}
                placeholder="Cari lokasi..."
                placeholderTextColor="white"
                autoFocus={true}
                keyboardType="web-search"
                value={newLocation}
                onChangeText={setNewLocation}
                onSubmitEditing={handleAddLocation}
              />
              <TouchableOpacity onPress={handleCancelInput} style={{ marginLeft: 10 }}>
                <Icon name="times" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* menambahkan cuaca */}
        {weather.map((weather, index) => (
          <View key={index} style={{ width: 372, height: 84, borderRadius: 10, borderRadius: 9, backgroundColor: 'rgba(225, 225, 225, 0.1)', justifyContent: 'center', paddingHorizontal: 20 }}>
            {weather.main && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                {/* kiri */}
                <View>
                  <Text style={{ fontSize: 20, color: "white", }}>
                    {weather.name}
                    <Text style={style.resultText}> {weather.sys.country}</Text>
                  </Text>
                  <Text style={style.humidityText}>Wind: {weather.wind.speed} m/s</Text>
                </View>

                {/* kanan */}
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontSize: 30, color: "white", }}>
                      {weather.main.temp}
                    </Text>
                    <Text style={{ marginTop: 5, color: 'white', fontSize: 20 }}>°C</Text>
                  </View>
                  <Text style={style.resultText}>
                    Cuaca: {weather.weather[0].description}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

export default Slidescreen

const style = StyleSheet.create({
  resultText: {
    fontSize: 16,
    color: 'white',
  },
  humidityText: {
    fontSize: 14,
    color: 'white',
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
  }
});
