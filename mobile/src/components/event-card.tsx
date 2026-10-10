import { Pressable, StyleSheet, Text, View } from "react-native";
import { FeedEvent } from "@thirdspace/shared";
import { colors } from "../theme/colors";

export function EventCard({
  event,
  onPress
}: {
  event: FeedEvent;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.badgeRow}>
        <Text style={styles.badge}>{event.category.toUpperCase()}</Text>
        <Text style={styles.score}>{event.score}% match</Text>
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.reasonRow}>
        {event.reasons.map((reason) => (
          <View key={reason} style={styles.reasonPill}>
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.meta}>
        {event.venueName} • {event.distanceKm} km away
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#11203b",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    backgroundColor: colors.sand,
    color: colors.text,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    overflow: "hidden"
  },
  score: {
    color: colors.ocean,
    fontWeight: "700"
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "700"
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22
  },
  reasonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  reasonPill: {
    backgroundColor: "#f8fafc",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  reasonText: {
    color: colors.muted,
    fontSize: 12
  },
  meta: {
    color: colors.muted,
    fontSize: 14
  }
});

