import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

import { COLORS, SIZES } from "../../constants";

export default function CategoryForm({ id }) {
  const [name, setName] = useState("");
  const docRef = doc(db, "stocks", id);
  const [data, loading, error] = useDocumentData(docRef);
  const router = useRouter();

  useEffect(() => {
    if (data) setName(data.name);
  }, [data]);

  const handlePress = async () => {
    await updateDoc(docRef, { name })
      .then(() => router.push("/home"))
      .catch();
  };

  return (
    <View style={{ padding: SIZES.small }}>
      <Text style={styles.formLabel}>Name: *</Text>
      <TextInput
        style={styles.formControl}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text
          style={{
            color: COLORS.colorLight,
            fontSize: SIZES.small,
            textAlign: "center",
          }}
        >
          Update
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: SIZES.small,
    marginBottom: 5,
  },
  formControl: {
    borderWidth: 1,
    borderColor: COLORS.borderColorLight,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: SIZES.small,
    color: COLORS.colorBlack,
    marginBottom: 30,
  },
  button: {
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
});
