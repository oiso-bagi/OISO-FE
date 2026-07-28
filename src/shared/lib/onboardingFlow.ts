const loginCompletedKey = "oiso:login-completed";
const surveyCompletedKey = "oiso:survey-completed";

const canUseStorage = () => typeof window !== "undefined";

export const isLoginCompleted = () =>
  canUseStorage() && window.localStorage.getItem(loginCompletedKey) === "true";

export const isSurveyCompleted = () =>
  canUseStorage() && window.localStorage.getItem(surveyCompletedKey) === "true";

export const completeLogin = () => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(loginCompletedKey, "true");
  window.localStorage.removeItem(surveyCompletedKey);
};

export const completeSurvey = () => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(surveyCompletedKey, "true");
};
