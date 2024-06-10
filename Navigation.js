import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './screens/TaskList';
import AddTask from './screens/AddTask';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskList} options={{ title: 'Lista de Tarefas' }} />
      <Stack.Screen name="AddTask" component={AddTask} options={{ title: 'Adicionar Tarefa' }} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
