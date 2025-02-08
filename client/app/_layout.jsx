import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import RootNavigation from "./../navigation"
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "@/context/authContext";
import { PostProvider } from "@/context/postContext";
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PostProvider>
        <RootNavigation />
      </PostProvider>
    </AuthProvider>
  );
}
