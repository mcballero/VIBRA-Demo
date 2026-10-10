import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { FeedEvent, InterestCategory } from "@thirdspace/shared";
import { mockFeed } from "../services/mock-feed";

interface SessionState {
  onboarded: boolean;
  interests: InterestCategory[];
  feed: FeedEvent[];
  completeOnboarding: (interests: InterestCategory[]) => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [onboarded, setOnboarded] = useState(false);
  const [interests, setInterests] = useState<InterestCategory[]>([]);

  const value = useMemo(
    () => ({
      onboarded,
      interests,
      feed: mockFeed,
      completeOnboarding: (nextInterests: InterestCategory[]) => {
        setInterests(nextInterests);
        setOnboarded(true);
      }
    }),
    [interests, onboarded]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("Session context is missing");
  }
  return context;
}

