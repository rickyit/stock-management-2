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

import ListItems from "../items/listItems";

import { COLORS, SIZES } from "../../constants";

export default function ListCategories({ handlePress }) {
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
              <View style={styles.cardButtons}>
                <Link
                  href={{
                    pathname: "/managecategory",
                    params: { id: doc.id },
                  }}
                  asChild
                >
                  <Pressable>
                    <Feather
                      name="arrow-right"
                      size={SIZES.xlarge}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </Link>
              </View>
            </View>
            <ListItems id={doc.id} />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {},
  cardHeader: {
    padding: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardButtons: {
    flexDirection: "row",
  },
  cardTitle: {
    color: COLORS.colorGray,
    fontFamily: "RBT700",
    fontSize: SIZES.regular,
  },
});
