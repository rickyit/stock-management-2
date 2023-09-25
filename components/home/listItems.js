import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
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
        data.docs.map((doc) => (
          <Pressable
            key={doc.id}
            style={styles.cardItemTitle}
            onPress={() => handlePress(doc.id, !doc.data().low)}
          >
            <Text>
              {doc.data().low ? (
                <Feather
                  name="toggle-right"
                  size={SIZES.xxlarge}
                  color={COLORS.primary}
                />
              ) : (
                <Feather
                  name="toggle-left"
                  size={SIZES.xxlarge}
                  color={COLORS.colorDark}
                />
              )}
            </Text>
            <Text style={styles.cardItemTitleText}>{doc.data().name}</Text>
          </Pressable>
        ))
      ) : (
        <View style={styles.itemCreate}>
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
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColorLight,
    paddingVertical: 6,
  },
  cardItemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.tiny,
  },
  cardItemTitleText: {
    marginLeft: 7,
    fontSize: SIZES.regular,
    color: COLORS.colorBlack,
  },
  itemCreate: {
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.tiny,
    fontSize: SIZES.small,
  },
  itemCreateLink: {
    color: COLORS.primary,
  },
});
