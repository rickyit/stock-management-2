import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, query, orderBy } from "firebase/firestore";
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

  return (
    <View style={styles.cardContent}>
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {loading && <ActivityIndicator visible={loading} />}
      {data &&
        data.docs.map((doc) => (
          <TouchableOpacity>
            <View style={styles.cardItem} key={doc.id}>
              <Text style={styles.cardItemTitle}>{doc.data().name}</Text>
            </View>
          </TouchableOpacity>
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
    color: COLORS.colorBlack,
    paddingHorizontal: SIZES.small,
    paddingVertical: 6,
    fontSize: SIZES.regular,
  },
});
