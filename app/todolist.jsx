import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

const Todolist = () => {
  const router = useRouter();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tulis tugas..."
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Tambah</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={{ color: 'white' }}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footerNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/cuaca')}
        >
          <Text style={styles.navText}>Cuaca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Todolist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Todolist;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 8,
    
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
