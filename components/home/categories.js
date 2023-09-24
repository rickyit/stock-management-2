import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

import UpdateCategory from "./updatecategory";
import Items from "./items";

import { COLORS, SIZES } from "../../constants";

export default function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, loading, error] = useCollection(
    query(collection(db, "stocks"), orderBy("name")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (selectedCategory === null) setShowModal(false);
    else setShowModal(true);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {loading && <ActivityIndicator visible={loading} />}
      {data &&
        data.docs.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{doc.data().name}</Text>
              <Pressable onPress={() => setSelectedCategory(doc.id)}>
                <Feather name="arrow-right" size={24} color={COLORS.primary} />
              </Pressable>
            </View>
            <Items id={doc.id} />
          </View>
        ))}
      <UpdateCategory
        isVisible={showModal}
        onClose={() => setSelectedCategory(null)}
      />
      <Text>{selectedCategory}</Text>
      <Text>{showModal.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.borderColorLight,
    borderRadius: SIZES.borderRadius,
    marginBottom: 10,
  },
  cardHeader: {
    padding: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: COLORS.colorDark,
    fontFamily: "RBT700",
    fontSize: SIZES.regular,
  },
});
