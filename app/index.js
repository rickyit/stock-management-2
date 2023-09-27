import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { COLORS, SIZES } from "../constants";
import ListCategories from "../components/categories/listcategories";

const Home = () => {
  const [showAll, setShowAll] = useState(true);

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.small,
            paddingBottom: SIZES.small,
          }}
        >
          <ListCategories showAll={showAll} />
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
          <Pressable style={styles.button}>
            <Feather
              name="plus"
              size={SIZES.regular}
              color={COLORS.colorWhite}
            />
            <Text style={styles.buttonText}>Add Category</Text>
          </Pressable>
        </Link>
        <Pressable
          style={styles.button}
          onPress={() => {
            setShowAll(!showAll);
          }}
        >
          <Feather
            name={showAll ? "eye-off" : "eye"}
            size={SIZES.regular}
            color={COLORS.colorWhite}
          />
          <Text style={styles.buttonText}>
            {showAll ? "Hide Available" : "Show Available"}
          </Text>
        </Pressable>
      </View>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColorLight,
  },
  buttonsContainer: {
    flexDirection: "row",
    positon: "fixed",
    width: "100%",
    height: "auto",
    bottom: 0,
    paddingHorizontal: -Math.abs(SIZES.small),
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    height: 60,
  },
  buttonText: {
    color: COLORS.colorWhite,
    fontFamily: "RBT500",
    marginLeft: 2,
  },
});

export default Home;
