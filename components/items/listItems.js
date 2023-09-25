import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

import { COLORS, SIZES } from "../../constants";

export default function ListItems({ id }) {
  const [data, loading, error] = useCollection(
    query(collection(db, `stocks/${id}/items`), orderBy("low", "desc")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handlePress = async (itemId, low) => {
    console.log(id);
    const docRef = doc(db, `stocks/${id}/items/`, itemId);
    await updateDoc(docRef, { low }).then().catch();
  };

  return (
    <View style={styles.cardContent}>
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {loading && <ActivityIndicator visible={loading} />}
      {data?.size ? (
        data.docs.map((doc, i) => (
          <View
            key={doc.id}
            style={[
              styles.cardItem,
              i === data.size - 1 ? styles.cardItemLast : "",
            ]}
          >
            <Pressable
              style={styles.cardItemTitle}
              onPress={() => handlePress(doc.id, !doc.data().low)}
            >
              <Text>
                {doc.data().low ? (
                  <MaterialIcons
                    name="circle"
                    size={SIZES.small}
                    color={COLORS.primary}
                  />
                ) : (
                  <MaterialIcons
                    name="circle"
                    size={SIZES.small}
                    color={COLORS.colorGray}
                  />
                )}
              </Text>
              <Text style={styles.cardItemText}>{doc.data().name}</Text>
            </Pressable>
            <Pressable>
              <Text>
                <Feather
                  name="chevron-right"
                  size={SIZES.xlarge}
                  color={COLORS.colorLightGray}
                />
              </Text>
            </Pressable>
          </View>
        ))
      ) : (
        <View style={[styles.cardItem, styles.cardItemLast]}>
          <Link href="/" style={styles.itemCreateLink}>
            <Text>Add an item on this list</Text>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.bgColorWhite,
  },
  cardItemLast: {
    borderBottomWidth: 0,
  },
  cardItem: {
    padding: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColorLight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardItemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardItemText: {
    marginLeft: 7,
    fontSize: SIZES.regular,
    color: COLORS.colorBlack,
  },
  itemCreateLink: {
    color: COLORS.primary,
  },
});
