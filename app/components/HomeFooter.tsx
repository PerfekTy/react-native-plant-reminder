import { colors } from "app/constants/colors";
import { Text, View } from "react-native";

export const HomeFooter = () => {
  return (
    <View style={{ backgroundColor: colors.green1, paddingBottom: 20 }}>
      <Text
        style={{
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
          fontSize: 26,
          fontFamily: "Combo-Regular",
        }}
      >
        Remember watering your plants!
      </Text>
    </View>
  );
};
