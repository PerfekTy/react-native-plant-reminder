import { colors } from "../constants/colors";
import { View } from "react-native";
import MyText from "./MyText";

export const HomeFooter = () => {
  return (
    <View
      style={{
        backgroundColor: colors.green1,
        paddingBottom: 20,
      }}
    >
      <MyText cn={{ fontSize: 26, textAlign: "center" }}>
        Remember watering your plants!
      </MyText>
    </View>
  );
};
