import React from "react";
import { Text, StyleSheet, TextProps } from "react-native"; // Import TextProps for better typing
import { colors } from "../constants/colors";

interface MyTextProps extends TextProps {
  children: React.ReactNode;
  cn?: any;
}

const MyText: React.FC<MyTextProps> = ({ children, cn, ...props }) => {
  return (
    <Text style={[styles.text, cn]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
});

export default MyText;
