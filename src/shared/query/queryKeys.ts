export const queryKeys = {
  user: {
    me: ["user", "me"],
  },
  route: {
    all: ["route"],
    detail: (routeId: number) => ["route", routeId],
  },
  saved: {
    all: ["saved"],
  },
};

// 나중에 useQuery 쓸 때:
// queryKey: queryKeys.user.me
// 이런 식으로 통일하면 됨
