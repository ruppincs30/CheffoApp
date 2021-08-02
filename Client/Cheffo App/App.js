//@refresh reset
import React, { createContext, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer, YellowBox } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme'
import { UserProvider } from './src/UserContext'

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  DishesScreen,
  FriendsScreen
} from './screens'

console.disableYellowBox = true;



const Stack = createStackNavigator()

export const emailContext = createContext();

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Provider theme={theme}>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="StartScreen"
              component={StartScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen} />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen} />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
            />
            <Stack.Screen
              name="DishesScreen"
              component={DishesScreen}
            />
            <Stack.Screen
              name="FriendsScreen"
              component={FriendsScreen}
            />
            {<Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen} />}
          </Stack.Navigator>
        </Provider>
      </UserProvider>
    </NavigationContainer>
  )
}

export default App;

