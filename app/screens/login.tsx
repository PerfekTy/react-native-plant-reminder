import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { colors } from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import { FIREBASE_AUTH } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import MyText from "../components/MyText";
import { usePushNotifications } from "../hooks/usePushNotifications";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { expoPushToken, notification } = usePushNotifications();
  console.log(expoPushToken?.data, notification);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully signed in!");
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
            <MyText cn={{ fontSize: 16 }}>Email</MyText>
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
            <MyText cn={{ fontSize: 16 }}>Password</MyText>
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
              <TouchableOpacity style={styles.buttonSignIn} onPress={signIn}>
                <Ionicons name="md-log-in" size={20} color="black" />
                <MyText cn={styles.buttonSignIn}>Sign in</MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSignUp}
                onPress={() => navigation.navigate("Register")}
              >
                <MyText cn={styles.buttonText}>Create new account</MyText>
                <Ionicons
                  name="md-arrow-forward-sharp"
                  size={20}
                  color="black"
                />
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
    backgroundColor: colors.green2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 18,
  },
  buttonSignUp: {
    backgroundColor: colors.green1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 18,
  },
  fieldset: {
    gap: 5,
    marginVertical: 10,
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
});
