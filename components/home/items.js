import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../library/firebase";

import { COLORS, SIZES } from "../../constants";

export default function Items({ id }) {
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
      {data &&
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
                  size={SIZES.xlarge}
                  color={COLORS.primary}
                />
              ) : (
                <Feather
                  name="toggle-left"
                  size={SIZES.xlarge}
                  color={COLORS.colorDark}
                />
              )}
            </Text>
            <Text style={styles.cardItemTitleText}>{doc.data().name}</Text>
          </Pressable>
        ))}
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
    paddingVertical: 6,
  },
  cardItemTitleText: {
    marginLeft: 5,
    fontSize: SIZES.regular,
    color: COLORS.colorBlack,
  },
});
