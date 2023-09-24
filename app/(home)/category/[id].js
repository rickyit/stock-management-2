import { StyleSheet, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import CategoryForm from "../../../components/categories/form";

export default function CategoryDetails() {
  const { id } = useGlobalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Update Category",
          headerTitle: "Update Category",
        }}
      />
      <CategoryForm id={id} />
    </View>
  );
}

const styles = StyleSheet.create({});
