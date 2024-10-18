import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Profile from '../screens/ProfileScreen';
import HeaderRight from '../screens/HeaderRight';
import CustomHeader from './CustomHeader';
import CameraScreen from '../screens/CameraScreen';
import MailScreen from '../screens/MailScreen';
import Redirect from '../screens/Redirect';
import MailSend from '../screens/MailSend';
import LanguageScreen from '../screens/LanguageScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import AppInfoScreen from '../screens/AppInfoScreen';
import TermsAndPoliciesScreen from '../screens/TermsAndPoliciesScreen';
import { ThemeProvider } from '../screens/ThemeContext'; // Import your ThemeProvider
import DeviceScreen from '../DeviceScreen';
import CompetitionsScreen from '../screens/CompetitionsScreen';
import QuizScreen from '../screens/quizScreen';


const Stack = createStackNavigator();

const HomeStack = () => (
 
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
            headerTitle: () => (
              <CustomHeader title="Profile" iconSource={require('../screens/images/E325.gif')} />
            ),
          })}
      />
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => <HeaderRight />,
            headerTitle: () => (
              <CustomHeader title="Home" iconSource={require('../screens/images/E325.gif')} />
            ),
          })}
        />
      
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Settings" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Camera" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Select Language" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
      <Stack.Screen
        name="Help"
        component={HelpCenterScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Help" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
      <Stack.Screen
        name="AppInfo"
        component={AppInfoScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="About App" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
      <Stack.Screen
        name="TermsAndPolicies"
        component={TermsAndPoliciesScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Terms and Policies" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
       <Stack.Screen
        name="ContactUs"
        component={MailScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Contact Us" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
     
      <Stack.Screen
        name="Redirect"
        component={Redirect}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Contact Us" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />

         <Stack.Screen
        name="MailSend"
        component={MailSend}/>


        <Stack.Screen
        name="Device"
        component={DeviceScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Device" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />

      <Stack.Screen
        name="Competitions"
        component={CompetitionsScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="Competitions" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />

      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <CustomHeader title="DonationHistory" iconSource={require('../screens/images/E325.gif')} />
          ),
        })}
      />
    </Stack.Navigator>

     
  
);

export default HomeStack;