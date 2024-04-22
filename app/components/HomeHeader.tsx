import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../constants/colors";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import MyText from "./MyText";

export const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.namebar}>
      <MyText cn={{ fontSize: 33 }}>Plant Reminder</MyText>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => signOut(FIREBASE_AUTH)}>
          <Ionicons name="log-out-sharp" color="white" size={32} />
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
