import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import MyText from "../components/MyText";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {
      setIsLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Successfully signed up!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.fieldset}>
            <MyText cn={styles.text}>Name</MyText>
            <TextInput
              style={styles.input}
              placeholder="Jane Doe"
              autoCapitalize="words"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.fieldset}>
            <MyText cn={styles.text}>Email</MyText>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="example@post.com"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.fieldset}>
            <MyText cn={styles.text}>Password</MyText>
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="******"
              autoCapitalize="none"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.green3} />
          ) : (
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.buttonSignUp} onPress={signUp}>
                <Ionicons name="log-in" size={20} color="black" />
                <MyText cn={styles.buttonText}>Sign up</MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSignIn}
                onPress={() => navigation.navigate("Login")}
              >
                <Ionicons name="arrow-back-sharp" size={20} color="black" />
                <MyText cn={styles.buttonText}>Back to login</MyText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green4,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.green3,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonSignIn: {
    backgroundColor: colors.green1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonSignUp: {
    backgroundColor: colors.green2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  fieldset: {
    gap: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
});
