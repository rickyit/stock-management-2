import { StyleSheet, Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import ItemForm from "../components/items/itemform";

const ManageItem = () => {
  const { categoryId, itemId } = useGlobalSearchParams();
  return (
    <View style={styles.container}>
      <ItemForm categoryId={categoryId} itemId={itemId} />
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default ManageItem;
