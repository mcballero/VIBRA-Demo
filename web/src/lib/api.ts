import { FeedEvent, LoginInput, SignupInput } from "@thirdspace/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  signup(input: SignupInput) {
    return request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(input)
    });
  },
  login(input: LoginInput) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(input)
    });
  },
  feed(token: string) {
    return request<FeedEvent[]>("/feed", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

