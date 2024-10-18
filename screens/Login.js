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
import { useUser } from './UserContext'; // Import the UserContext
import { useTheme } from './ThemeContext';



const Login = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("Error creating user: ", err.message);
      }
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SafeAreaView>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Ionicons
            name="arrow-back-outline"
            style={styles.IconButton}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={require("../Login.png")} style={styles.Image} />
        </View>
      </SafeAreaView>
      <View style={styles.logContainer}>
        <View style={{ marginVertical: 30, paddingLeft: 50 }}>
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
          <TouchableOpacity
            style={{ flexDirection: "row-reverse", marginBottom: 5 }}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButton}
        onPress={() => navigation.navigate('Main')}
      >
            <Text style={styles.signInText}>Login</Text>
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
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => {
  navigation.navigate("Signup");
}}>
            <Text style={{ fontWeight: "bold", color: "blue" }}>Sign Up</Text>
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
    height: 200,
    width: 300,
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
    marginLeft: 16,
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
export default Login;
