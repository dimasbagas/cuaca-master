import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'blue' }}
        onPress={() => router.push('/cuaca')}
      >
        <Text style={{ color: 'white' }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
