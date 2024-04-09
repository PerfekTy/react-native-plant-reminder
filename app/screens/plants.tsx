import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import MyText from "../components/MyText";
import { Ionicons } from "@expo/vector-icons";

export default function Plants() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity>
        <View>
          <View style={styles.plantContainer}>
            <Image
              source={require("../assets/images/rose-test.jpg")}
              style={styles.image}
            />
            <View style={styles.plantInfo}>
              <Ionicons
                style={styles.icon}
                name="water"
                color={colors.green1}
                size={30}
              />
              <MyText cn={styles.text}>Name - Red Rose</MyText>
              <MyText cn={styles.text}>Age - 2</MyText>
              <MyText cn={styles.text}>Type - Decoration flower</MyText>
              <MyText cn={styles.text}>Watering frequency - Twice a day</MyText>
              <MyText cn={styles.text}>Watered? - Yes</MyText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <View style={styles.plantContainer}>
            <Image
              source={require("../assets/images/rose-test.jpg")}
              style={styles.image}
            />
            <View style={styles.plantInfo}>
              <Ionicons
                style={styles.icon}
                name="water-outline"
                color={colors.green1}
                size={30}
              />
              <MyText cn={styles.text}>Name - Red Rose</MyText>
              <MyText cn={styles.text}>Age - 2</MyText>
              <MyText cn={styles.text}>Type - Decoration flower</MyText>
              <MyText cn={styles.text}>Watering frequency - Twice a day</MyText>
              <MyText cn={styles.text}>Watered? - No</MyText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green4,
  },
  plantContainer: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 15,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 20,
  },
  plantInfo: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 7,
  },
  icon: { position: "absolute", top: 0, right: 0 },
});
