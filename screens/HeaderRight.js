import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

const HeaderRight = ({ setIsAppStarted }) => {
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();

  const toggleContainer = () => {
    setIsContainerOpen(!isContainerOpen);
  };

  const navigateToProfile = () => {
    setIsContainerOpen(false);
    navigation.navigate('Profile');
  };

  const navigateToSettings = () => {
    setIsContainerOpen(false);
    navigation.navigate('Settings');
  };

  const navigateToCamera = () => {
    setIsContainerOpen(false);
    navigation.navigate('Camera');
  };

  const navigateToCompetitions = () => {
    setIsContainerOpen(false);
    navigation.navigate('Competitions');
  };

  const logOut = () => {
    
    navigation.navigate('Login'); // Navigate to the welcome screen or login screen
  };

  return (
  
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleContainer}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>

        {isContainerOpen && (
          <View style={[styles.dropdownContainer, { backgroundColor: theme.containerColor }]}>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={navigateToProfile}>
              <Ionicons name="person" size={24} color={theme.backgroundColor} />
              <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={navigateToSettings}>
              <Ionicons name="settings" size={24}color={theme.backgroundColor} />
              <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={navigateToCamera}>
              <Ionicons name="camera" size={24}color={theme.backgroundColor} />
              <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Scan Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={navigateToCompetitions}>
              <Ionicons name="trophy" size={24} color={theme.backgroundColor} />
              <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Competitions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={logOut}>
              <Ionicons name="log-out" size={24} color={theme.backgroundColor} />
              <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: 'green', // Change to a nature-inspired green color
    padding: 10,
    width: 250,
    borderRadius: 10,
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'lightblue', // Change to a nature-inspired blue color
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  },
});

export default HeaderRight;



