import { useState } from "react";

const firstStep = 1;
const lastStep = 2;

export function useSurveyStep() {
  const [currentStep, setCurrentStep] = useState(firstStep);

  const goNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, lastStep));
  };

  const goPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, firstStep));
  };

  const resetStep = () => {
    setCurrentStep(firstStep);
  };

  return {
    currentStep,
    isFirstStep: currentStep === firstStep,
    goNextStep,
    goPreviousStep,
    resetStep,
  };
}
