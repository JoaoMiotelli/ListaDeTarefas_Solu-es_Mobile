import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Checkbox, List, FAB } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export default function TaskList({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists tasks (id integer primary key not null, title text, done int);'
      );
    });
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    db.transaction(tx => {
      tx.executeSql('select * from tasks', [], (_, { rows }) =>
        setTasks(rows._array)
      );
    });
  };

  const toggleTaskDone = (id, done) => {
    db.transaction(tx => {
      tx.executeSql(`update tasks set done = ? where id = ?`, [done ? 1 : 0, id], () => {
        fetchTasks();
      });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            left={() => (
              <Checkbox
                status={item.done ? 'checked' : 'unchecked'}
                onPress={() => toggleTaskDone(item.id, !item.done)}
              />
            )}
          />
        )}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
