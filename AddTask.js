import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState('');

  const addTask = () => {
    if (title.length === 0) {
      return;
    }
    db.transaction(tx => {
      tx.executeSql('insert into tasks (title, done) values (?, 0)', [title], () => {
        navigation.navigate('TaskList');
      });
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título da Tarefa"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Adicionar" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
