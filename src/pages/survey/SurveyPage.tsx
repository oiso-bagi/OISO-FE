import { useNavigate } from "react-router-dom";

import { useToast } from "@/shared/components/Toast/toastContext";
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
  const showToast = useToast();
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
      if (!completeSurvey()) {
        showToast({
          message: "설문 완료 상태를 저장하지 못했어요. 다시 시도해 주세요.",
        });
        return;
      }

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
