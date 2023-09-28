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

const ListCategories = ({ showAll }) => {
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
              <Link
                href={{
                  pathname: "/managecategory",
                  params: { categoryId: doc.id },
                }}
                style={styles.cardHeaderButton}
                asChild
              >
                <Pressable>
                  <Text style={styles.cardTitle}>{doc.data().name}</Text>
                  <Feather
                    name="arrow-right"
                    size={SIZES.regular}
                    color={COLORS.primary}
                  />
                </Pressable>
              </Link>
              <View style={styles.cardButtons}>
                <Link
                  href={{
                    pathname: "manageitem",
                    params: { categoryId: doc.id, itemId: 0 },
                  }}
                  asChild
                >
                  <Pressable>
                    <Feather
                      name="plus-circle"
                      size={SIZES.xlarge}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </Link>
              </View>
            </View>
            <ListItems categoryId={doc.id} showAll={showAll} />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {},
  cardHeader: {
    paddingVertical: SIZES.regular,
    paddingHorizontal: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardButtons: {
    flexDirection: "row",
  },
  cardTitle: {
    color: COLORS.primary,
    fontFamily: "RBT700",
    fontSize: SIZES.large,
    marginRight: 5,
  },
});

export default ListCategories;
