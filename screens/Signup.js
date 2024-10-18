import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("Error creating user: ", err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Ionicons
            name="arrow-back-outline"
            style={styles.IconButton}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../signup.png")}
            style={styles.Image}
          />
        </View>
      </SafeAreaView>
      <View style={styles.logContainer}>
        <View style={{ marginVertical: 30, paddingLeft: 50 }}>
          <Text>Full Name</Text>
          <TextInput
            style={styles.textInput}
            value="John Doe"
            placeholder="Enter Name"
          />
          <Text>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter Password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Or
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity>
            <Image
              source={require("../Google.png")}
              style={styles.logImage}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../github.png")}
              style={styles.logImage}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "bold", color: "blue" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
  IconButton: {
    backgroundColor: "yellow",
    width: 50,
    height: 50,
    borderRadius: 50,
    textAlign: "center",
    paddingTop: 20,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  Image: {
    height: 110,
    width: 165,
  },
  logContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  textInput: {
    marginVertical: 3,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
  },
  signInButton: {
    backgroundColor: "yellow",
    padding: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  signInText: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
  },
  logImage: {
    height: 40,
    width: 40,
  },
});
export default Signup;
