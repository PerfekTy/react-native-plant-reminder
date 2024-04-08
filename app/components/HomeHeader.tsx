import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../constants/colors";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";

export const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.namebar}>
      <Text style={styles.text}>Plant Reminder</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => signOut(FIREBASE_AUTH)}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="cog-outline" size={32} color={colors.green4} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("My Profile")}>
          <Ionicons
            name="person-circle-outline"
            size={32}
            color={colors.green4}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 33,
  },
  namebar: {
    display: "flex",
    marginTop: 150,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green1,
    padding: 20,
    width: "100%",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: "auto",
  },
});
