import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { EventCard } from "../components/event-card";
import { useSession } from "../state/session-context";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

export function FeedScreen({ navigation }: Props) {
  const { feed, interests } = useSession();
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Swipeable feed</Text>
        <Text style={styles.title}>Your next third space</Text>
        <Text style={styles.subtitle}>
          Tuned for {interests.join(", ")} with deterministic scoring and community signals.
        </Text>
      </View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={feed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cards}
        renderItem={({ item }) => (
          <View style={{ width: width - 32 }}>
            <EventCard
              event={item}
              onPress={() => navigation.navigate("EventDetail", { eventId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: 24,
    paddingTop: 72
  },
  eyebrow: {
    color: colors.ocean,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12
  },
  title: {
    marginTop: 12,
    color: colors.text,
    fontSize: 38,
    fontWeight: "700"
  },
  subtitle: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24
  },
  cards: {
    paddingHorizontal: 16,
    gap: 16
  }
});
