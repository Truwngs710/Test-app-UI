import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import Home from './src/Home';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import GamePlay from './src/GamePlay';
import {createStackNavigator} from '@react-navigation/stack';

enableScreens();
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="GamePlay"
          component={GamePlay}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
