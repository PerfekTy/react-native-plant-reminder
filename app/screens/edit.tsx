import { View, Button, StyleSheet } from "react-native";
import React, { useState } from "react";

import MyText from "../components/MyText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "firebase-config";
import { ref, update } from "firebase/database";

export default function Edit({ route }) {
  const { id, date: plantDate } = route.params;
  const [date, setDate] = useState(new Date(plantDate));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const edit = async () => {
    try {
      await update(ref(db, `plants/${id}`), {
        date: date.getTime(),
      });
      alert("Date updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.bottomFieldset}>
      <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
        <MyText cn={styles.text}>Next watering date</MyText>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"datetime"}
          onChange={onChange}
        />
      </View>
      <Button title="Set new date" onPress={edit} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomFieldset: {
    gap: 5,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    fontSize: 16,
  },
});
