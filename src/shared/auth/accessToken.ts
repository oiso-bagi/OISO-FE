import { setAccessTokenReader } from "@/shared/api/client";

let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (nextAccessToken: string) => {
  accessToken = nextAccessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

setAccessTokenReader(getAccessToken);
