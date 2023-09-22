import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

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
      {loading && (
        <ActivityIndicator
          visible={loading}
          textContent={"Loading"}
          textStyle={{ color: "red" }}
        />
      )}
      {data &&
        data.docs.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{doc.data().name}</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Kangkong</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Potato</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Lumpia</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Leg Quarter</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Sinigang Mix</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Coco Gata</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Beef Cubes</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Bagoong</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Lumpia Wrapper</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>All Purpose Flour</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTitle}>Mantika</Text>
              </View>
            </View>
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
  cardContent: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColorLight,
    paddingVertical: 6,
  },
  cardItem: {},
  cardItemTitle: {
    color: COLORS.colorBlack,
    paddingHorizontal: SIZES.small,
    paddingVertical: 6,
    fontSize: SIZES.regular,
  },
});
