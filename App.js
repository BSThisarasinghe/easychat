import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login.screen';
import SignUp from './src/screens/sign-up.screen';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'transparent',
                height: 0
              },
              headerLeft: null
            }}
          />
          <Stack.Screen
            name="register"
            component={SignUp}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'transparent',
                height: 0
              },
              headerLeft: null
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
