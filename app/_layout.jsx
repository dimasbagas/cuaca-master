import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="loadscreen">
      <Stack.Screen name="loadscreen" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
