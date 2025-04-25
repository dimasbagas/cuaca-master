import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';


const Index = () => {
  const router = useRouter();

  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
      <Text style={{fontSize: 48, fontWeight: 'bold', color: '#ffffff'}}>Weather</Text>
      <Text style={{fontSize: 64, fontWeight: 'bold', color: '#D6B900'}}>ForeCast</Text>
      <TouchableOpacity
        style={{ padding: 20, backgroundColor: 'blue', cursor: 'pointer', borderRadius: 30, elevation: 3, width: 200, height: 55, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => router.push('/cuaca')}
      >
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
