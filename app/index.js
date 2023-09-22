import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, SIZES } from "../constants";

import Categories from "../components/home/categories";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Stock Management",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.small }}>
          <Categories />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColorWhite,
  },
});
