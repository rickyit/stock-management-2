import { StyleSheet, Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import CategoryForm from "../components/categories/form";

export default function ManageCategory() {
  const { id } = useGlobalSearchParams();
  return (
    <View style={styles.container}>
      <CategoryForm id={id} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
