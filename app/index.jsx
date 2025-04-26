import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const Index = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={['#643DFF', '#B214A7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={style.gradient}>

    {/* Status bar */}
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>

    {/* Konten */}
      <Text style={style.weather}>Weather</Text>
      <Text style={{ fontSize: 64, fontWeight: 'bold', color: '#D6B900' }}>ForeCast</Text>
      <TouchableOpacity
        style={style.botton}
        onPress={() => router.push('/cuaca')}
      >
        <Text style={style.get}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Index;

const style = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  weather: {
    fontSize: 48, 
    fontWeight: 'bold', 
    color: '#ffffff'
  },
  botton: { 
    backgroundColor: 'blue', 
    borderRadius: 30, 
    levation: 3, 
    width: 200, height: 55, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  get: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold' 
  }
})