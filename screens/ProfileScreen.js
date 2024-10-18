import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from './ThemeContext';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { usePoints } from './PointsContext';
import { useUser } from './UserContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { userDetails, setUserDetails } = useUser(); 
  const [name, setName] = useState(userDetails.name || "");
  const [surname, setSurname] = useState(userDetails.surname || "");
  const [email, setEmail] = useState("ecotracker@gmail.com");
  const [avatar, setAvatar] = useState(userDetails.avatar || null);
  const [dob, setDob] = useState(new Date());
  const [bio, setBio] = useState(userDetails.bio || "");
  const [location, setLocation] = useState(userDetails.location || "");
  const [gender, setGender] = useState(userDetails.gender || "Male");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { userPoints, setUserPoints, profileCompletionPercentage, setProfileCompletionPercentage } = usePoints();
  const [showCongratulationModal, setShowCongratulationModal] = useState(false);
   




  const saveDetails = () => {
    setUserDetails({
      ...userDetails,
      name,
      surname,
      email,
      avatar,
      location,
      bio,
      gender,
    });
      congratulateUser();
  };


  

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const completenessFactors = [name, surname, email, bio, location, avatar].map((detail) => detail ? 1 : 0);
  const newProfileCompletionPercentage = (completenessFactors.reduce((a, b) => a + b, 0) / completenessFactors.length) * 100;

  setProfileCompletionPercentage(newProfileCompletionPercentage);

  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const handleEditProfile = () => {
    toggleEditModal();
  };

  const handleAddPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled) {
      navigation.navigate("Home", { selectedImage: pickerResult.assets[0] });
    }

    if (pickerResult.assets && pickerResult.assets.length > 0) {
      setAvatar({ uri: pickerResult.assets[0].uri });
    }
  };
  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      // Calculate age from the selected date
      const today = new Date();
      const birthDate = new Date(selectedDate);
      const age = today.getFullYear() - birthDate.getFullYear();

      setSelectedAge(age);
    }
  };

useEffect(() => {
    // Calculate profile completion percentage whenever profile details change
    const completenessFactors = [name, surname, email, bio, location, avatar].map(
      (detail) => (detail ? 1 : 0)
    );
    const newProfileCompletionPercentage =
      (completenessFactors.reduce((a, b) => a + b, 0) / completenessFactors.length) * 100;

    // Update the profile completion percentage in the context
    setProfileCompletionPercentage(newProfileCompletionPercentage);

     
  }, [name, surname, email, bio, location, avatar]);

 
 
 const congratulateUser = () => {
  if (profileCompletionPercentage === 100 && !showCongratulationModal) {
    if (!userDetails.profileCompleted) {
      setUserPoints(userPoints + 500);
      setUserDetails({ ...userDetails, profileCompleted: true });
      setShowCongratulationModal(true);
    }
  } else if (userDetails.profileCompleted) {
    setUserPoints(userPoints - 500);
    setUserDetails({ ...userDetails, profileCompleted: false });
  }
};





return (
  <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
    <View style={styles.containerTwo}>
      {avatar && <Image source={avatar} style={styles.avatar} />}
      <TouchableOpacity onPress={handleAddPicture} style={[styles.button, { backgroundColor: theme.buttonColor }]}>
        <Text style={[styles.pictureButtonText, { color: theme.buttonTextColor }]}>Choose or Take a Picture</Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: theme.titleColor }]}>Name:</Text>
      <Text style={[styles.detail, { color: theme.textColor }]}>{name}</Text>

      <Text style={[styles.label, { color: theme.titleColor }]}>Surname:</Text>
      <Text style={[styles.detail, { color: theme.textColor }]}>{surname}</Text>

      <Text style={[styles.label, { color: theme.titleColor }]}>Email:</Text>
      <TextInput
        style={[styles.detail, { color: theme.textColor }]}
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={false}
      />

      <Text style={[styles.label, { color: theme.titleColor }]}>Bio:</Text>
      <Text style={[styles.detail, { color: theme.textColor }]}>{bio}</Text>

      <Text style={[styles.label, { color: theme.titleColor }]}>Location:</Text>
      <Text style={[styles.detail, { color: theme.textColor }]}>{location}</Text>
        
      <Text style={[styles.label, { color: theme.titleColor }]}>Gen der:</Text>
      <Text style={[styles.detail, { color: theme.textColor }]}>{gender}</Text>

      

      <Text style={[styles.profileCompletion, { color: theme.titleColor }]}>
        Profile Completion: <Text style={[styles.profileCompletion, { color: theme.textColor }]}>{profileCompletionPercentage.toFixed(2)}%</Text>
      </Text>

      <TouchableOpacity
        style={[styles.editProfileButton, { backgroundColor: theme.buttonColor }]}
        onPress={handleEditProfile}
      >
        <Text style={[styles.editButtonText, { color: theme.buttonTextColor}]}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.editProfileButton, { backgroundColor: theme.buttonColor }]}
        onPress={saveDetails}
      >
        <Text style={[styles.editButtonText, { color: theme.buttonTextColor}]}>Save Details</Text>
      </TouchableOpacity>


    </View>

    <Modal isVisible={isEditModalVisible}>
      <View style={[styles.modalContainer, { backgroundColor: theme.backgroundColor }]}>
        <Text style={styles.modalTitle}>Edit Profile</Text>
        <TextInput
          style={[styles.input, { color: theme.titleColor }]}
          placeholder="Edit Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input, { color: theme.titleColor }]}
          placeholder="Edit Surname"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          style={[styles.input, { color: theme.titleColor }]}
          placeholder="Edit Bio"
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        <TextInput
          style={[styles.input, { color: theme.titleColor }]}
          placeholder="Edit City"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        <Text style={[styles.label, { color: theme.titleColor }]}>Edit Gender:</Text>
        <View style={[styles.pickerContainer, { backgroundColor: theme.backgroundColor}]}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            <Picker.Item label="Male" value="Male" color={theme.titleColor} />
            <Picker.Item label="Female" value="Female" color={theme.titleColor} />
            <Picker.Item label="Confused" value="Confused" color={theme.titleColor} />
          </Picker>
        </View>
     
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />




          <TouchableOpacity
            style={[styles.saveButton, { color: theme.buttonColor }]}
            onPress={toggleEditModal}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton, { color: theme.buttonColor }]}
            onPress={toggleEditModal}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showCongratulationModal}>
        <View style={[styles.modalContainer, { backgroundColor: theme.backgroundColor }]}>
          <Image
            source={require('../295734043204201.gif')} // Replace with your image source
            style={{
              width: '100%',
              height: '40%',
              resizeMode: 'cover', // You can adjust this property based on your image dimensions
            }}
          />
          <Text style={[styles.modalTitle, { color: theme.titleColor }]}>Well Done!</Text>
          <Text style={[styles.modalText, { color: theme.textColor }]}>
            You have earned 500 Points for completing your profile.
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.buttonColor }]}
            onPress={() => setShowCongratulationModal(false)}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    
  },
  containerTwo: {
    top:5,
    bottom:80,
    marginBottom:50,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  pictureButtonText: {
    fontSize: 16,
    marginBottom: 16,
    color: "blue",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop:30,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop:20,
    marginBottom:50,
  },
  
  pickerContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default ProfileScreen;
