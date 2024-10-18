import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from '../screens/quizScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import HeaderRight from '../screens/HeaderRight';
import CustomHeader from './CustomHeader';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ChallengesStack = () => (
 
    <Stack.Navigator initialRouteName="Challenges" screenOptions={{ headerShown: false }}>


      <Stack.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={({ navigation }) => ({
            headerTitle: () => (
              <CustomHeader title="Quiz" iconSource={require('../screens/images/E325.gif')} />
            ),
          })}
      />
      
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={({ navigation }) => ({
            headerTitle: () => (
              <CustomHeader title="Quiz" iconSource={require('../screens/images/E325.gif')} />
            ),
          })}
      />
      
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
            headerTitle: () => (
              <CustomHeader title="Profile" iconSource={require('../screens/images/E325.gif')} />
            ),
          })}
      />
    </Stack.Navigator>
);

export default ChallengesStack;