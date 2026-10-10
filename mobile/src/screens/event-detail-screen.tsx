import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import { useSession } from "../state/session-context";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "EventDetail">;

export function EventDetailScreen({ route, navigation }: Props) {
  const { feed } = useSession();
  const event = feed.find((item) => item.id === route.params.eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </Pressable>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.venueName} • {event.city}
      </Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why this was ranked highly</Text>
        {event.reasons.map((reason) => (
          <Text key={reason} style={styles.reason}>
            • {reason}
          </Text>
        ))}
      </View>

      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>RSVP</Text>
      </Pressable>
      <View style={styles.feedbackRow}>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Like</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Not for me</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 72
  },
  back: {
    color: colors.ocean,
    fontSize: 16,
    marginBottom: 24
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "700"
  },
  meta: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 15
  },
  description: {
    marginTop: 20,
    color: colors.text,
    fontSize: 16,
    lineHeight: 26
  },
  section: {
    marginTop: 28,
    borderRadius: 24,
    backgroundColor: colors.surface,
    padding: 20
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10
  },
  reason: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 8
  },
  primaryButton: {
    marginTop: 28,
    backgroundColor: colors.coral,
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: "center"
  },
  primaryButtonText: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: 16
  },
  feedbackRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: colors.surface
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: "600"
  }
});
