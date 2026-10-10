import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InterestCategory } from "@thirdspace/shared";
import { useState } from "react";
import { useSession } from "../state/session-context";
import { colors } from "../theme/colors";

const options: InterestCategory[] = [
  "fitness",
  "arts",
  "music",
  "tech",
  "food",
  "wellness",
  "outdoors",
  "community"
];

export function OnboardingScreen() {
  const [selected, setSelected] = useState<InterestCategory[]>(["fitness", "tech"]);
  const { completeOnboarding } = useSession();

  function toggle(interest: InterestCategory) {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ThirdSpace AI</Text>
      <Text style={styles.title}>Tell us what you want more of offline.</Text>
      <Text style={styles.subtitle}>
        Your feed blends interests, proximity, and community momentum into personalized recommendations.
      </Text>

      <View style={styles.grid}>
        {options.map((interest) => {
          const active = selected.includes(interest);
          return (
            <Pressable
              key={interest}
              onPress={() => toggle(interest)}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{interest}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.button} onPress={() => completeOnboarding(selected)}>
        <Text style={styles.buttonText}>See my feed</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 24,
    paddingTop: 84
  },
  eyebrow: {
    color: colors.coral,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12,
    marginBottom: 12
  },
  title: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 48
  },
  subtitle: {
    color: colors.muted,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 32
  },
  pill: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  pillActive: {
    backgroundColor: colors.text,
    borderColor: colors.text
  },
  pillText: {
    color: colors.text,
    textTransform: "capitalize"
  },
  pillTextActive: {
    color: colors.surface
  },
  button: {
    marginTop: 36,
    backgroundColor: colors.coral,
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: "center"
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700"
  }
});

