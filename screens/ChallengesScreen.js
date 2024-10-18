import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen'; 
import { useTheme } from './ThemeContext';
import { usePoints } from './PointsContext';


const initialChallenges = [
  { id: '1', title: 'Reduce Plastic Use', score: 50, completed: false },
  { id: '2', title: 'Save Energy', score: 30, completed: false },
  { id: '3', title: 'Carpool to Work', score: 40, completed: false },
  { id: '4', title: 'Use Reusable Water Bottles', score: 20, completed: false },
  { id: '5', title: 'Plant a Tree', score: 60, completed: false },
  { id: '6', title: 'Reduce Meat Consumption', score: 35, completed: false },
  { id: '7', title: 'Conserve Water', score: 25, completed: false },
  { id: '8', title: 'Bike or Walk Instead of Driving', score: 45, completed: false },
  { id: '9', title: 'Recycle Electronics', score: 30, completed: false },
  { id: '10', title: 'Support Local Businesses', score: 20, completed: false },
  { id: '11', title: 'Reduce Food Waste', score: 40, completed: false },
  { id: '12', title: 'Use Public Transportation', score: 35, completed: false },
  { id: '13', title: 'Reduce Water Heating Temperature', score: 30, completed: false },
  { id: '14', title: 'Switch to LED Bulbs', score: 25, completed: false },
  { id: '15', title: 'Compost Organic Waste', score: 30, completed: false },
  { id: '16', title: 'Support Renewable Energy', score: 50, completed: false },
  { id: '17', title: 'Reduce Single-Use Plastics', score: 45, completed: false },
  { id: '18', title: 'Volunteer for Environmental Cleanup', score: 60, completed: false },
  { id: '19', title: 'Reduce Paper Usage', score: 25, completed: false },
  { id: '20', title: 'Shop Secondhand', score: 30, completed: false },
  { id: '21', title: 'Create a Home Garden', score: 40, completed: false },
  { id: '22', title: 'Use Energy-Efficient Appliances', score: 35, completed: false },
  { id: '23', title: 'Reduce Air Travel', score: 50, completed: false },
  { id: '24', title: 'Support Wildlife Conservation', score: 45, completed: false },
  { id: '25', title: 'Reduce Fast Fashion', score: 30, completed: false },
  { id: '26', title: 'Minimize Food Packaging', score: 20, completed: false },
  { id: '27', title: 'Reduce Car Idling', score: 25, completed: false },
  { id: '28', title: 'Switch to Cloth Diapers', score: 30, completed: false },
  { id: '29', title: 'Conserve Heating and Cooling', score: 35, completed: false },
  { id: '30', title: 'Use Eco-Friendly Cleaning Products', score: 20, completed: false }
];



function ChallengesScreen({navigation}) {
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [showCompletedChallenges, setShowCompletedChallenges] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [userCompletedChallenges, setUserCompletedChallenges] = useState([]);
  const { theme } = useTheme(); 
  const { userPoints, setUserPoints } = usePoints();

  
  const allChallenges = [
    ...initialChallenges.filter((challenge) => !userCompletedChallenges.includes(challenge.id)),
    ...userCompletedChallenges.map((id) => ({
      ...initialChallenges.find((challenge) => challenge.id === id),
    })),
  ];

  const markChallengeAsDone = (id, score) => {
    if (!initialChallenges.some((challenge) => challenge.id === id)) {
      return;
    }

    
    if (!userCompletedChallenges.includes(id)) {
      setUserScore((prevScore) => prevScore + score);
      setUserCompletedChallenges((prevCompletedChallenges) => [
        ...prevCompletedChallenges,
        id,
      ]);
      // Add the score to user points when a challenge is completed
    setUserPoints((prevPoints) => prevPoints + score);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.titleColor }]}>Challenges</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
         <Ionicons name="person" size={24} color={theme.textColor} />

        </TouchableOpacity>
      </View>
      {showCompletedChallenges && (
        <FlatList
          data={userCompletedChallenges.map((id) =>
            initialChallenges.find((challenge) => challenge.id === id)
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.challengeItem}>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text>Score: {item.score}</Text>
              <Text style={[styles.completedLabel, { color: 'green' }]}>Completed</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {!showCompletedChallenges && (
        <FlatList
          data={showAllChallenges ? allChallenges : allChallenges.slice(0, 3)} // Show only 3 challenges initially
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.challengeItem}
              onPress={() => markChallengeAsDone(item.id, item.score)}
              disabled={item.completed || userCompletedChallenges.includes(item.id)}
            >
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text>
                <Text style={{ color: 'black', fontSize: 18 }}>Score: </Text>
                <Text style={{ color: 'green', fontSize: 24 }}>{item.score}</Text>
              </Text>
              {item.completed && (
                <Text style={[styles.completedLabel, { color: 'green' }]}>Completed</Text>
              )}

            </TouchableOpacity>
          )}
          ListFooterComponent={
            !showAllChallenges && allChallenges.length > 3 && (
              <TouchableOpacity
                onPress={() => setShowAllChallenges(true)}
                style={[styles.showAllButton, { backgroundColor: theme.buttonColor }]}
              >
                <Text style={[styles.userScore, { color: theme.buttonTextColor }]}>Show All Challenges</Text>
              </TouchableOpacity>
            )
          }
        />
      )}
      <TouchableOpacity
        onPress={() => setShowCompletedChallenges(!showCompletedChallenges)}
        style={[styles.showCompletedButton, { backgroundColor: theme.buttonColor }]}
      >
        <Text style={[styles.userScore, { color: theme.buttonTextColor }]}>Show {showCompletedChallenges ? 'Ongoing' : 'Completed'} Challenges</Text>
      </TouchableOpacity>
      <Text style={[styles.userScore, { color: theme.textColor }]}>Your Score: {userPoints}</Text>

      <Leaderboard userScore={userPoints} />
    </View>
  );
}

const Leaderboard = ({ userScore }) => {
  const { theme } = useTheme();
  const leaderboardData = [
    { username: 'User1', score: 500 },
    { username: 'User2', score: 450 },
    { username: 'User3', score: 400 },
    { username: 'User4', score: 350 },
    { username: 'User5', score: 300 },
  ];

  leaderboardData.push({ username: 'You', score: userScore });

  // Sort the leaderboard data by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score);

  // Calculate a color gradient from yellow to green based on position
  const calculateColor = (index) => {
  const r = Math.floor((255 * index) / leaderboardData.length); // Red value decreases
  const g = 255; // Green value remains high
  const b = 0; // Blue value remains constant
  return `rgb(${r},${g},${b})`;
};

  const renderBadge = (position) => {
    let badgeIcon, badgeColor;

    switch (position) {
      case 1:
        badgeIcon = '🥇';
        badgeColor = 'gold';
        break;
      case 2:
        badgeIcon = '🥈';
        badgeColor = 'silver';
        break;
      case 3:
        badgeIcon = '🥉';
        badgeColor = 'bronze';
        break;
      default:
        return null;
    }

    return (
      <Text style={{ fontSize: 18, color: badgeColor }}>
        {badgeIcon}
      </Text>
    );
  };

  return (
    <View style={styles.leaderboardContainer}>
      <Text style={[styles.leaderboardTitle, { color: theme.titleColor }]}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.leaderboardItem,
              { backgroundColor: calculateColor(index) },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {index < 3 && renderBadge(index + 1)}
              <Text style={styles.rank}>{index + 1}</Text>
            </View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score} Points</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightblue', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#004D40', // Dark green text color
  },
  challengeItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 8,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // Dark green text color
  },
  completedLabel: {
    color: '#00C853', // Green completion label
  },
  showAllButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  userScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'darkgreen', 
  },
  leaderboardContainer: {
    marginTop: 24,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40', // Dark green text color
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  username: {
    flex: 1,
    fontSize: 18,
    marginRight: 8,
  },
  score: {
    fontSize: 18,
  },
  showCompletedButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default ChallengesScreen;

