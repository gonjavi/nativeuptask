import 'react-native-gesture-handler';
import React from 'react';
import { Root } from 'native-base';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Iniciar Sesión",
                headerShown: false
              }}
            />

            <Stack.Screen
              name="CrearCuenta"
              component={CrearCuenta}
              options={{
                title: "Crear Cuenta",
                headerStyle: {
                  backgroundColor: '#28303b'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
