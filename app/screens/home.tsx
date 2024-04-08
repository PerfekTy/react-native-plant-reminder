import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { colors } from "../constants/colors";

import { HomeCard } from "../components/HomeCard";
import { HomeFooter } from "../components/HomeFooter";
import { HomeHeader } from "../components/HomeHeader";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground resizeMode="cover" style={styles.image}>
        <HomeHeader navigation={navigation} />
        <SafeAreaView style={styles.menu}>
          <HomeCard
            text="My plants"
            icon="leaf-outline"
            onPress={() => navigation.navigate("My Plants")}
          />
          <HomeCard
            text="Add new plant"
            icon="add-circle-outline"
            onPress={() => navigation.navigate("New Plant")}
          />
          <HomeCard
            text="Community"
            icon="people-outline"
            onPress={() => navigation.navigate("Community")}
          />
          <HomeCard
            text="Calendar"
            icon="calendar-outline"
            onPress={() => navigation.navigate("Calendar")}
          />
        </SafeAreaView>
      </ImageBackground>
      <HomeFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.green4,
  },
  menu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 110,
  },
});
