import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { colors } from "../constants/colors";
import MyText from "../components/MyText";
import { Ionicons } from "@expo/vector-icons";
import { db } from "firebase-config";
import { ref, get, remove } from "firebase/database";

export default function Plants() {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    await get(ref(db, "plants/")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const plantsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPlants(plantsArray);
      }
    });
  };

  const deletePlant = async (id: string) => {
    try {
      await remove(ref(db, `plants/${id}`));
      alert("Plant deleted successfully");
      await fetchPlants();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {plants ? (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View>
                <View style={styles.plantContainer}>
                  <Image source={{ uri: item?.image }} style={styles.image} />
                  <View style={styles.plantInfo}>
                    <Ionicons
                      style={styles.icon}
                      name="water"
                      color={colors.green1}
                      size={30}
                    />

                    <TouchableOpacity
                      style={styles.iconDelete}
                      onPress={() => deletePlant(item.id)}
                    >
                      <Ionicons name="close" color="red" size={30} />
                    </TouchableOpacity>

                    <View style={{ position: "relative", marginVertical: 2 }}>
                      <MyText
                        style={{ position: "absolute", top: -5, fontSize: 10 }}
                      >
                        [Name]
                      </MyText>
                      <MyText cn={styles.text}>{item?.name}</MyText>
                    </View>

                    <View style={{ position: "relative", marginVertical: 2 }}>
                      <MyText
                        style={{ position: "absolute", top: -5, fontSize: 10 }}
                      >
                        [Age]
                      </MyText>
                      <MyText cn={styles.text}>{item?.age} months</MyText>
                    </View>

                    <View style={{ position: "relative", marginVertical: 2 }}>
                      <MyText
                        style={{ position: "absolute", top: -5, fontSize: 10 }}
                      >
                        [Type]
                      </MyText>
                      <MyText cn={styles.text}>{item?.type}</MyText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <View style={{ position: "relative", marginVertical: 2 }}>
                        <MyText
                          style={{
                            position: "absolute",
                            width: "100%",
                            top: -5,
                            fontSize: 10,
                          }}
                        >
                          [Next watering]
                        </MyText>
                        <MyText cn={styles.text}>
                          {new Date(item?.date).toLocaleDateString()}
                        </MyText>
                      </View>
                      <View style={{ position: "relative", marginVertical: 2 }}>
                        <MyText cn={styles.text}>
                          {new Date(item?.date).toLocaleTimeString()}
                        </MyText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}
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
    fontSize: 18,
    paddingVertical: 5,
  },
  plantInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 7,
    position: "relative",
    width: "70%",
  },
  icon: { position: "absolute", top: 0, right: 0 },
  iconDelete: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red",
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    zIndex: 99,
  },
});
