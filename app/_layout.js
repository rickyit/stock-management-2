import { useCallback } from "react";
import { Pressable, Platform } from "react-native";
import { Stack, Link } from "expo-router";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import { COLORS, SIZES } from "../constants";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    RBT100: require("../assets/fonts/Roboto/Roboto-Thin.ttf"),
    RBT100i: require("../assets/fonts/Roboto/Roboto-ThinItalic.ttf"),
    RBT300: require("../assets/fonts/Roboto/Roboto-Light.ttf"),
    RBT300i: require("../assets/fonts/Roboto/Roboto-LightItalic.ttf"),
    RBT400: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    RBT400i: require("../assets/fonts/Roboto/Roboto-Italic.ttf"),
    RBT500: require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
    RBT500i: require("../assets/fonts/Roboto/Roboto-MediumItalic.ttf"),
    RBT700: require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
    RBT700i: require("../assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
    RBT900: require("../assets/fonts/Roboto/Roboto-Black.ttf"),
    RBT900i: require("../assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      onLayout={onLayoutRootView}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.colorLight,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "RBT500",
          fontSize: SIZES.medium,
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Stock Management",
          headerTitle: "Stock Management",
          headerRight: () => (
            <Link href="/manageCategoryModal" asChild>
              <Pressable>
                <Feather
                  name="plus"
                  size={SIZES.xlarge}
                  color={COLORS.colorLight}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="manageCategoryModal"
        options={{
          presentation: "modal",
          title: "Category",
          headerTitle: "Manage Category",
        }}
      />
    </Stack>
  );
}
