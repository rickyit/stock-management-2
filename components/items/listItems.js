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

const ListItems = ({ categoryId, showAll }) => {
  const [data, loading, error] = useCollection(
    query(collection(db, `stocks/${categoryId}/items`), orderBy("name", "asc")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handlePress = async (itemId, low) => {
    const docRef = doc(db, `stocks/${categoryId}/items/`, itemId);
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
              !showAll && !doc.data().low ? styles.cardItemHidden : "",
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
                    color={COLORS.colorLightGray}
                  />
                )}
              </Text>
              <Text style={styles.cardItemText}>{doc.data().name}</Text>
            </Pressable>
            <Link
              href={{
                pathname: "manageitem",
                params: { categoryId: categoryId, itemId: doc.id },
              }}
              asChild
            >
              <Pressable>
                <Text>
                  <Feather
                    name="chevron-right"
                    size={SIZES.xlarge}
                    color={COLORS.colorLightGray}
                  />
                </Text>
              </Pressable>
            </Link>
          </View>
        ))
      ) : (
        <View style={[styles.cardItem, styles.cardItemLast]}>
          <Link
            href={{
              pathname: "manageitem",
              params: { categoryId: categoryId, itemId: 0 },
            }}
            style={styles.itemCreateLink}
          >
            <Text style={styles.itemCreateLinkText}>
              Add an item on this list
            </Text>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.borderColorLight,
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
  cardItemHidden: {
    display: "none",
  },
  cardItemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardItemText: {
    marginLeft: 7,
    fontFamily: "RBT400",
    fontSize: SIZES.small,
    color: COLORS.colorBlack,
  },
  itemCreateLink: {
    color: COLORS.primary,
  },
  itemCreateLinkText: {
    fontFamily: "RBT400",
    fontSize: SIZES.small,
  },
});

export default ListItems;
