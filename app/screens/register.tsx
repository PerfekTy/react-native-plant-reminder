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
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { colors } from "../constants/colors";

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
      alert(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.fieldset}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Jane Doe"
            autoCapitalize="words"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.text}>Email</Text>
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
          <Text style={styles.text}>Password</Text>
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
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.green4,
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
  },
  buttonSignUp: {
    backgroundColor: colors.green2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
