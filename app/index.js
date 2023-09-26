import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import * as Native from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { COLORS, SIZES } from "../constants";
import ListCategories from "../components/categories/listcategories";

export default function Home() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingBottom: 40 }}>
          <ListCategories />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Link
          href={{
            pathname: "managecategory",
            params: { categoryId: 0 },
          }}
          asChild
        >
          <Pressable style={styles.addCategoryButton}>
            <Text style={styles.buttonText}>Add Category</Text>
          </Pressable>
        </Link>
        <Link
          href={{
            pathname: "manageitem",
            params: { categoryId: 0, itemId: 0 },
          }}
          asChild
        >
          <Pressable style={styles.addItemButton}>
            <Text style={styles.buttonText}>Add Item</Text>
          </Pressable>
        </Link>
      </View>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColorLight,
    paddingHorizontal: SIZES.small,
  },
  buttonsContainer: {
    positon: "absolute",
    width: "100%",
    height: "auto",
    bottom: SIZES.small,
    flexDirection: "row",
  },
  buttonText: {
    color: COLORS.colorWhite,
    textAlign: "center",
    fontFamily: "RBT500",
  },
  addCategoryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SIZES.xsmall,
    borderRadius: SIZES.borderRadius,
    marginRight: 4,
  },
  addCategoryButtonText: {
    fontFamily: "RBT400",
  },
  addItemButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SIZES.xsmall,
    borderRadius: SIZES.borderRadius,
    marginLeft: 4,
  },
  addCategoryItemText: {
    fontFamily: "RBT400",
  },
});
