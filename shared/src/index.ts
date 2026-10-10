export type InterestCategory =
  | "fitness"
  | "arts"
  | "music"
  | "tech"
  | "food"
  | "wellness"
  | "outdoors"
  | "community";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  interests: InterestCategory[];
}

export interface EventSummary {
  id: string;
  title: string;
  description: string;
  category: InterestCategory;
  venueName: string;
  city: string;
  startsAt: string;
  latitude: number;
  longitude: number;
  popularity: number;
  trending: boolean;
  imageUrl?: string;
}

export interface FeedEvent extends EventSummary {
  score: number;
  distanceKm: number;
  reasons: string[];
}

export interface AuthPayload {
  token: string;
  user: UserProfile;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  interests: InterestCategory[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RsvpInput {
  eventId: string;
  status?: "GOING" | "INTERESTED";
}

export interface FeedbackInput {
  eventId: string;
  reaction: "LIKE" | "DISLIKE" | "ATTENDED";
}

