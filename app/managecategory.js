import { StyleSheet, Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import CategoryForm from "../components/categories/categoryform";

const ManageCategory = () => {
  const { categoryId } = useGlobalSearchParams();
  return (
    <View style={styles.container}>
      <CategoryForm categoryId={categoryId} />
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

export default ManageCategory;
