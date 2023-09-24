import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { COLORS, SIZES } from "../../constants";

export default function HomeLayout() {
  return (
    <Tabs
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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          headerTitle: "Stock Management",
          tabBarIcon: () => (
            <Feather
              name="home"
              size={SIZES.xlarge}
              color={COLORS.colorLight}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="category"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
