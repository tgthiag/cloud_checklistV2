import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { MyContext } from "../../services/dataContext";
import { auth } from "../../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainContainer from "../../components/MainContainer";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [registrationMode, setRegistrationMode] = useState(false);
  const { currentUser, updateUser } = useContext(MyContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        updateUser(user);
        navigation.navigate("main");
      }
    });

    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    const getSavedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        setEmail(savedEmail);
      } catch (error) {
        console.error("Error retrieving saved email:", error);
      }
    };

    getSavedEmail(); // Call the async function inside useEffect
  }, []);

  const saveEmail = async (currentEmail) => {
    try {
      await AsyncStorage.setItem("savedEmail", currentEmail);
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  const handleSignUp = () => {
    if (!registrationMode) {
      setRegistrationMode(true);
      alert("Please enter a display name (without spaces).");
      return;
    }

    if (displayName.trim() === "") {
      alert("Please enter a valid display name (without spaces).");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        saveEmail(user.email);
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            updateUser(user);
            console.log("Registered with:", user.email);
          })
          .catch((error) => {
            console.error("Error setting display name:", error);
          });
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        saveEmail(user.email);
        updateUser(user);
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <MainContainer>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {registrationMode && (
          <TextInput
            placeholder="Display Name (without spaces)"
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
            style={styles.input}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
      {!registrationMode && (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {registrationMode ? "Concluir Cadastro" : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
