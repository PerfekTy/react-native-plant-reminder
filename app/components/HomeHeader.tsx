import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "app/constants/colors";

export const HomeHeader = () => {
  return (
    <View style={styles.namebar}>
      <Text style={styles.text}>Plant Reminder</Text>
      <View style={styles.icons}>
        <Ionicons name="cog-outline" size={32} color={colors.green4} />
        <Ionicons
          name="person-circle-outline"
          size={32}
          color={colors.green4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 33,
    fontFamily: "Combo-Regular",
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
    gap: 10,
    marginLeft: "auto",
  },
});
