import { useCallback } from "react";
import { Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { COLORS, SIZES } from "../constants";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
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
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

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
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Stock Management",
        }}
      />
      <Stack.Screen
        name="managecategory"
        options={{
          presentation: "modal",
          title: "Manage Category",
        }}
      />
      <Stack.Screen
        name="manageitem"
        options={{
          presentation: "modal",
          title: "Manage Item",
        }}
      />
    </Stack>
  );
};

export default AppLayout;
