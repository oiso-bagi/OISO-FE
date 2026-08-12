export const queryKeys = {
  user: {
    me: ["user", "me"],
  },
  consent: {
    status: ["consent", "status"],
  },
  dashboard: {
    savings: ["dashboard", "savings"],
  },
  route: {
    all: ["route"],
    detail: (routeId: number) => ["route", routeId],
  },
  saved: {
    all: ["saved"],
  },
  survey: {
    recommendationOptions: () => ["survey", "recommendationOptions"] as const,
  },
};

// 나중에 useQuery 쓸 때:
// queryKey: queryKeys.user.me
// 이런 식으로 통일하면 됨
