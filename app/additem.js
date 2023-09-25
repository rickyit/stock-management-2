import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ItemCategory from "../components/items/form";

export default function AddItem() {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
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
