import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const Index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
      <LinearGradient colors={['#643DFF','#B214A7']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={style.gradient}>
        <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff' }}>Weather</Text>
        <Text style={{ fontSize: 64, fontWeight: 'bold', color: '#D6B900' }}>ForeCast</Text>
        <TouchableOpacity
          style={{ padding: 20, backgroundColor: 'blue', cursor: 'pointer', borderRadius: 30, elevation: 3, width: 200, height: 55, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => router.push('/cuaca')}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Index;

const style = StyleSheet.create({
  gradient: {
    width: 300,
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})