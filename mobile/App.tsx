import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EventDetailScreen } from "./src/screens/event-detail-screen";
import { FeedScreen } from "./src/screens/feed-screen";
import { OnboardingScreen } from "./src/screens/onboarding-screen";
import { SessionProvider, useSession } from "./src/state/session-context";

export type RootStackParamList = {
  Onboarding: undefined;
  Feed: undefined;
  EventDetail: {
    eventId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { onboarded } = useSession();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!onboarded ? <Stack.Screen name="Onboarding" component={OnboardingScreen} /> : null}
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <AppNavigator />
      </SessionProvider>
    </SafeAreaProvider>
  );
}

