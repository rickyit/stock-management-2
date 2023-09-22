import { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

import Items from "./items";

import { COLORS, SIZES } from "../../constants";

export default function Categories() {
  const [data, loading, error] = useCollection(
    query(collection(db, "stocks"), orderBy("name")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <View style={styles.container}>
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {loading && <ActivityIndicator visible={loading} />}
      {data &&
        data.docs.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{doc.data().name}</Text>
            </View>
            <Items id={doc.id} />
          </View>
        ))}
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
  },
  cardTitle: {
    color: COLORS.colorBlack,
    fontFamily: "RBT700",
    fontSize: SIZES.regular,
  },
});
