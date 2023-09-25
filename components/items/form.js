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

export default function ItemForm({ id }) {
  const [name, setName] = useState("");

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
              Delete Category
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
