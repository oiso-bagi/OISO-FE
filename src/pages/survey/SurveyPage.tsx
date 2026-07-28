import { useNavigate } from "react-router-dom";

import { completeSurvey } from "@/shared/lib/onboardingFlow";

import { SurveyHeader } from "./components/SurveyHeader";
import { SurveyProgress } from "./components/SurveyProgress";
import { useBudgetSelection } from "./hooks/useBudgetSelection";
import { useSurveyStep } from "./hooks/useSurveyStep";
import { useTravelStyleSelection } from "./hooks/useTravelStyleSelection";
import { BudgetSection } from "./sections/BudgetSection";
import { SurveyFooter } from "./sections/SurveyFooter";
import { TravelStyleSection } from "./sections/TravelStyleSection";
import * as styles from "./SurveyPage.css";

export function SurveyPage() {
  const navigate = useNavigate();
  const totalStep = 2;
  const { currentStep, isFirstStep, goNextStep, goPreviousStep, resetStep } =
    useSurveyStep();
  const { selectedStyleIdSet, selectedCount, toggleStyle, resetSelection } =
    useTravelStyleSelection();
  const {
    tripDays,
    formattedBudget,
    hasNegativeBudgetInput,
    isBudgetAllocationVisible,
    allocationItems,
    setTripDays,
    selectBudget,
    updateBudgetText,
    resetBudget,
  } = useBudgetSelection();

  const handleBack = () => {
    if (!isFirstStep) {
      goPreviousStep();
      return;
    }

    navigate(-1);
  };

  const handleResetSurvey = () => {
    resetSelection();
    resetBudget();
    resetStep();
  };

  const handleNext = () => {
    if (currentStep >= totalStep) {
      completeSurvey();
      navigate("/");
      return;
    }

    goNextStep();
  };

  return (
    <div className={styles.page}>
      <SurveyHeader onBack={handleBack} onReset={handleResetSurvey} />

      <main className={styles.content}>
        <SurveyProgress currentStep={currentStep} totalStep={totalStep} />

        {currentStep === 1 ? (
          <TravelStyleSection
            selectedStyleIdSet={selectedStyleIdSet}
            selectedCount={selectedCount}
            onToggleStyle={toggleStyle}
          />
        ) : (
          <BudgetSection
            tripDays={tripDays}
            formattedBudget={formattedBudget}
            hasNegativeBudgetInput={hasNegativeBudgetInput}
            isBudgetAllocationVisible={isBudgetAllocationVisible}
            allocationItems={allocationItems}
            onSelectTripDays={setTripDays}
            onChangeBudget={updateBudgetText}
            onSelectBudgetPreset={selectBudget}
          />
        )}
      </main>

      <SurveyFooter onPrevious={handleBack} onNext={handleNext} />
    </div>
  );
}
