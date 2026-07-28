const loginCompletedKey = "oiso:login-completed";
const surveyCompletedKey = "oiso:survey-completed";

const canUseStorage = () => typeof window !== "undefined";

export const isLoginCompleted = () =>
  canUseStorage() && getStorageItem(loginCompletedKey) === "true";

export const isSurveyCompleted = () =>
  canUseStorage() && getStorageItem(surveyCompletedKey) === "true";

export const completeLogin = () => {
  if (!canUseStorage()) return;

  setStorageItem(loginCompletedKey, "true");
  removeStorageItem(surveyCompletedKey);
};

export const completeSurvey = () => {
  if (!canUseStorage()) return;

  setStorageItem(surveyCompletedKey, "true");
};

const getStorageItem = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setStorageItem = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private modes or restricted browsers.
  }
};

const removeStorageItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in private modes or restricted browsers.
  }
};
