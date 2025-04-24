import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const todolist = () => {
    const router = useRouter();

  return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', flex: 1, alignItems: 'center', marginHorizontal: 20}} onPress={() => router.push('/cuaca')}>
            <Text style={{color: '#white'}}>Cuaca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', flex: 1, alignItems: 'center',marginHorizontal: 20, }}>
            <Text style={{color: '#white'}}>todolist</Text>
          </TouchableOpacity>
        </View>
        </View>
  )
}

export default todolist