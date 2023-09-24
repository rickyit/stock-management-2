import { Stack } from "expo-router";

import { COLORS, SIZES } from "../../../constants";

export default function CategoryLayout() {
  return (
    <Stack
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
    ></Stack>
  );
}
