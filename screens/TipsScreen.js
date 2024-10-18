import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import tipsData from './Tips.json';
import Animated, { Easing, withSpring, withRepeat, withSequence, withDelay, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

function Tips() {
  const [randomTips, setRandomTips] = useState([]);
  const { theme } = useTheme();

  const opacity = useSharedValue(0); // Initialize opacity shared value

  useEffect(() => {
    const shuffledTips = shuffleArray(tipsData);
    const selectedTips = shuffledTips.slice(0, 10);
    setRandomTips(selectedTips);

    // Start the fade-in animation when the component mounts
    opacity.value = withSpring(1, { damping: 2, stiffness: 80 }); 
  }, []);

  function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.backgroundColor,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.titleColor,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.contentColor, // Background color for the tip container
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tipText: {
    fontSize: 20, // Bigger fontsize for the tip text
    color: theme.textColor,
    marginLeft: 8, // Add space between icon and text
  },
});


  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Today's Tips</Text>
      {randomTips.map((tip) => (
        <Animated.View
          key={tip.id}
          style={[styles.tipContainer, animatedStyle]} // Add styles for the container
        >
          <Icon name="leaf" size={24} color="green" /> 
          <Text style={styles.tipText}>{tip.text}</Text> 
        </Animated.View>
      ))}
    </ScrollView>
  );
}

export default Tips;
