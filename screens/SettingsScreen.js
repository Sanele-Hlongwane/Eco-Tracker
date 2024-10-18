import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext'; // Import the useTheme hook from your ThemeContext


const SettingsScreen = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); // Use the useTheme hook to access the theme

  const changeTheme = (newTheme) => {
    toggleTheme(newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.heading, { color: theme.titleColor }]}>Themes</Text>

      <View style={styles.themeButtons}>
        <Button
          title="Default  |"
          onPress={() => changeTheme('default')}
          color= { theme.buttonColor } // Eco-friendly color
        />
        <Button
          title="Dark  |"
          onPress={() => changeTheme('dark')}
          color= { theme.buttonColor } // Eco-friendly color
        />
        <Button
          title="Sunrise "
          onPress={() => changeTheme('sunrise')}
          color= { theme.buttonColor } // Eco-friendly color
        />
      </View>

      <Text style={[styles.heading, { color: theme.titleColor }]}>Help & Support</Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={() => navigation.navigate('Help')}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Help Center</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={() => navigation.navigate('ContactUs')}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Contact Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={() => navigation.navigate('TermsAndPolicies')}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Terms and Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={() => navigation.navigate('AppInfo')}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>About App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    padding: 16,
    alignItems: 'flex-start',
  },

  themeButtons: {
    marginTop: 10, // Adjust the spacing as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

 button: {
    backgroundColor: '#FFD700', // Eco-friendly gold color
    padding: 15,
    borderRadius: 10,
    width: 300,
    margin:10,
  },
  buttonText: {
    color: '#4CAF50', // Green text
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    color: 'blue',
  },
});

export default SettingsScreen;