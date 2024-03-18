import { HomeCard } from "app/components/HomeCard";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "app/constants/colors";
import { HomeFooter } from "app/components/HomeFooter";
import { HomeHeader } from "app/components/HomeHeader";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

export const Home = () => {
  const [isLoaded] = useFonts({
    "Combo-Regular": require("../assets/fonts/Combo-Regular.ttf"),
  });

  SplashScreen.preventAutoHideAsync();

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground resizeMode="cover" style={styles.image}>
        <HomeHeader />
        <SafeAreaView style={styles.menu}>
          <HomeCard text="My plants" icon="leaf-outline" />
          <HomeCard text="Add new plant" icon="add-circle-outline" />
          <HomeCard text="Community" icon="people-outline" />
          <HomeCard text="Calendar" icon="calendar-outline" />
        </SafeAreaView>
      </ImageBackground>
      <HomeFooter />
    </View>
  );
};

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
