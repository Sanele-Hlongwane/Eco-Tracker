import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding1 from '../screens/Onboarding1';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

const Onboarding = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Onboarding"
      component={Onboarding1}
    />
    <Stack.Screen
      name="Login"
      component={Login}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
    />
  </Stack.Navigator>
);

export default Onboarding;
