const legacyLoginCompletedKey = "oiso:login-completed";
const surveyCompletedKey = "oiso:survey-completed";

const canUseStorage = () => typeof window !== "undefined";

export const isSurveyCompleted = () =>
  canUseStorage() && getStorageItem(surveyCompletedKey) === "true";

export const prepareSurveyOnboarding = () => {
  if (!canUseStorage()) return false;

  const isLegacyLoginCompletedRemoved = removeStorageItem(
    legacyLoginCompletedKey,
  );
  const isSurveyCompletedRemoved = removeStorageItem(surveyCompletedKey);
  return isLegacyLoginCompletedRemoved && isSurveyCompletedRemoved;
};

export const completeSurvey = () => {
  if (!canUseStorage()) return false;

  return setStorageItem(surveyCompletedKey, "true");
};

export const resetOnboardingFlow = () => {
  if (!canUseStorage()) return false;

  const isLegacyLoginCompletedRemoved = removeStorageItem(
    legacyLoginCompletedKey,
  );
  const isSurveyCompletedRemoved = removeStorageItem(surveyCompletedKey);

  return isLegacyLoginCompletedRemoved && isSurveyCompletedRemoved;
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
