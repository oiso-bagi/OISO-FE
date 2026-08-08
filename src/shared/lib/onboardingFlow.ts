const loginCompletedKey = "oiso:login-completed";
const surveyCompletedKey = "oiso:survey-completed";

const canUseStorage = () => typeof window !== "undefined";

export const isLoginCompleted = () =>
  canUseStorage() && getStorageItem(loginCompletedKey) === "true";

export const isSurveyCompleted = () =>
  canUseStorage() && getStorageItem(surveyCompletedKey) === "true";

export const completeLogin = () => {
  if (!canUseStorage()) return false;

  return (
    removeStorageItem(surveyCompletedKey) &&
    setStorageItem(loginCompletedKey, "true")
  );
};

export const completeSurvey = () => {
  if (!canUseStorage()) return false;

  return setStorageItem(surveyCompletedKey, "true");
};

export const resetOnboardingFlow = () => {
  if (!canUseStorage()) return false;

  return (
    removeStorageItem(loginCompletedKey) &&
    removeStorageItem(surveyCompletedKey)
  );
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
    return true;
  } catch {
    // Storage can be unavailable in private modes or restricted browsers.
    return false;
  }
};

const removeStorageItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    // Storage can be unavailable in private modes or restricted browsers.
    return false;
  }
};
