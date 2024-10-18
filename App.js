import React, { useState,View } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native'; // Import StatusBar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import MainTabNavigator from './screens/MainTabNavigator';
import HeaderRight from './screens/HeaderRight';
import { ThemeProvider } from './screens/ThemeContext';
import { TrackingProvider } from './screens/TrackingContext';
import { PointsProvider} from './screens/PointsContext';
import { UserProvider } from './screens/UserContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Onboarding1 from './screens/Onboarding1';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  return (
    <>
    <StatusBar hidden={true} />
     <TrackingProvider>
      
        <UserProvider>
          <PointsProvider>
            <ThemeProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false, }}>
                  <Stack.Screen name="Onboarding" component={Onboarding1} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Main" component={MainTabNavigator} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </PointsProvider>
        </UserProvider>
      
    </TrackingProvider>
  </>
  );
}
