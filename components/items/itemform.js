import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

import { COLORS, SIZES } from "../../constants";

export default function ItemForm({ categoryId, itemId }) {
  const [name, setName] = useState("");
  const docRef = doc(db, `stocks/${categoryId}/items`, itemId);
  const dbRef = collection(db, `stocks/${categoryId}/items`);
  const [data, loading, error] = useDocumentData(docRef);
  const router = useRouter();

  useEffect(() => {
    if (data) setName(data.name);
  }, [data]);

  const handleSubmit = async () => {
    // Validate text input if value is not empty
    if (name == "") {
      Alert.alert("Try again!", "Please enter category name");
      return;
    }

    // Update item if category already exist
    if (data) await updateDoc(docRef, { name }).then(() => router.push("/"));
    // Add item if category does not exist
    else await addDoc(dbRef, { name }).then(() => router.push("/"));
  };

  const handleDelete = async () => {
    Alert.alert("Confirmation", "Are you sure?", [
      {
        text: "Delete",
        onPress: async () => {
          await deleteDoc(docRef).then(() => router.push("/"));
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.formControl}
          value={name}
          placeholder="Category name"
          onChangeText={(text) => setName(text)}
        />
        <Pressable
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text
            style={{
              color: COLORS.colorLight,
              fontSize: SIZES.small,
              textAlign: "center",
            }}
          >
            {data ? "Update" : "Add"} Item
          </Text>
        </Pressable>
        {data && (
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text
              style={{
                color: COLORS.colorLight,
                fontSize: SIZES.small,
                textAlign: "center",
              }}
            >
              Delete Item
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.bgColorLight,
    padding: SIZES.small,
  },
  formGroup: {
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.bgColorWhite,
    padding: SIZES.small,
  },
  formControl: {
    borderWidth: 1,
    borderColor: COLORS.borderColorLight,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: SIZES.small,
    color: COLORS.colorBlack,
  },
  button: {
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: COLORS.colorDark,
  },
});
