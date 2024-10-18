import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from './ThemeContext';

const HelpCenterScreen = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.titleColor }]}>Help Center</Text>

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Welcome to the Eco-Tracker Mobile Help Center. We're here to assist you with any questions, issues, or concerns you may have regarding our app and its features.
      </Text>

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Here are some common topics you can find assistance with:
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Frequently Asked Questions (FAQs)</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>Browse through our FAQs to find answers to commonly asked questions.</Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Contact Support</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>If you can't find the answer you're looking for, don't hesitate to contact our support team for personalized assistance.</Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Report a Bug</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>Encountered a bug or issue with the app? Use our bug reporting tool to let us know, and we'll work to resolve it.</Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Give Feedback</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>We value your feedback. Share your suggestions and ideas to help us improve our app and your experience.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HelpCenterScreen;
