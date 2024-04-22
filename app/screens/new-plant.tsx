import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Button,
  Text,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../constants/colors";
import MyText from "../components/MyText";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { db } from "firebase-config";
import { ref, set } from "firebase/database";

export default function NewPlant() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [startCamera, setStartCamera] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");

  const addPlant = async () => {
    try {
      await set(ref(db, "plants/" + name), {
        name,
        type,
        age,
        frequency,
        description,
        image,
      });
      clearInputs();
    } catch (error) {
      console.log(error);
    }
  };

  const clearInputs = () => {
    setName("");
    setType("");
    setAge("");
    setFrequency("");
    setDescription("");
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (!hasCameraPermission) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {startCamera ? (
          <CameraView
            image={image}
            setImage={setImage}
            cameraRef={cameraRef}
            flash={flash}
            setStartCamera={setStartCamera}
            cameraType={cameraType}
            setCameraType={setCameraType}
            setFlash={setFlash}
          />
        ) : null}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topInputs}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setStartCamera(true)}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.addButton} />
              ) : (
                <Ionicons name="add-circle-outline" size={40} />
              )}
            </TouchableOpacity>
            <View>
              <View style={styles.fieldset}>
                <MyText cn={styles.text}>Name</MyText>
                <TextInput
                  style={styles.input}
                  placeholder="Red rose"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.fieldset}>
                <MyText cn={styles.text}>Type</MyText>
                <TextInput
                  style={styles.input}
                  placeholder="Decoration flower"
                  autoCapitalize="words"
                  value={type}
                  onChangeText={(type) => setType(type)}
                />
              </View>
              <View style={styles.fieldset}>
                <MyText cn={styles.text}>Age (in months)</MyText>
                <TextInput
                  style={styles.input}
                  placeholder="10"
                  autoCapitalize="words"
                  value={age}
                  onChangeText={(age) => setAge(age)}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomFieldset}>
            <MyText cn={styles.text}>Frequency watering</MyText>
            <TextInput
              style={styles.input}
              placeholder="10"
              autoCapitalize="words"
              value={frequency}
              onChangeText={(frequency) => setFrequency(frequency)}
            />
          </View>
          <View style={styles.bottomFieldset}>
            <MyText cn={styles.text}>Description</MyText>
            <TextInput
              multiline
              numberOfLines={10}
              style={styles.textArea}
              placeholder="10"
              autoCapitalize="words"
              value={description}
              onChangeText={(description) => setDescription(description)}
            />
          </View>
          <View style={styles.submitButtons}>
            <Button title="Clear" onPress={clearInputs} />
            <Button title="Add" onPress={addPlant} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export function CameraView({
  cameraType,
  flash,
  cameraRef,
  setCameraType,
  setImage,
  image,
  setFlash,
  setStartCamera,
}) {
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🪴");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.cameraContainer}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={cameraType}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <View>
              <CameraButton
                title={"Back"}
                icon="close"
                onPress={() => setStartCamera(false)}
                color=""
              />
            </View>
            <View>
              <CameraButton
                title={""}
                icon="refresh-circle"
                onPress={() => {
                  setCameraType(
                    cameraType === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
                color=""
              />
              <CameraButton
                title={""}
                icon="flash"
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
                color={
                  flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
                }
              />
            </View>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View>
              <CameraButton
                title="Re-take picture"
                icon="return-down-back-outline"
                onPress={() => setImage(null)}
                color=""
              />
              <CameraButton
                title="Save picture"
                icon="checkbox-outline"
                onPress={savePicture}
                color=""
              />
            </View>
            <CameraButton
              title={"Back"}
              icon="close"
              onPress={() => setStartCamera(false)}
              color=""
            />
          </View>
        ) : (
          <CameraButton
            title="Take a picture"
            icon="camera"
            onPress={takePicture}
            color=""
          />
        )}
      </View>
    </View>
  );
}

export function CameraButton({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cameraButton}>
      <Ionicons name={icon} size={28} color={color ? color : "#fff"} />
      <Text style={styles.cameraText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cameraText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginLeft: 10,
  },
  cameraButton: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 20,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  camera: { flex: 1, borderRadius: 20 },
  scrollContainer: {
    flexGrow: 1,
  },
  submitButtons: { flexDirection: "row", justifyContent: "center", gap: 10 },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 250,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 20,
  },
  topInputs: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  fieldset: {
    gap: 5,
    marginVertical: 10,
    width: 200,
  },
  bottomFieldset: {
    gap: 5,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.green3,
  },
  textArea: {
    textAlignVertical: "top",
    height: 100,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.green3,
  },
});
