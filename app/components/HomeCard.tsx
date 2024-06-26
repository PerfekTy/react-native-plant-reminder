import { colors } from "../constants/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyText from "./MyText";

export const HomeCard = ({
  text,
  icon,
  onPress,
}: {
  text: string;
  icon: any;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <MyText cn={{ fontSize: 30 }}>{text}</MyText>
        <Ionicons name={icon} size={60} color={colors.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    gap: 20,
    width: 195,
    height: 300,
    margin: 4,
    marginBottom: 8,
    backgroundColor: colors.green2,
  },
});
