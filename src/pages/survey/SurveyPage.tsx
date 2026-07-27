import { useNavigate } from "react-router-dom";

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

  const goBack = () => {
    if (!isFirstStep) {
      goPreviousStep();
      return;
    }

    navigate(-1);
  };

  const resetSurvey = () => {
    resetSelection();
    resetBudget();
    resetStep();
  };

  return (
    <div className={styles.page}>
      <SurveyHeader onBack={goBack} onReset={resetSurvey} />

      <main className={styles.content}>
        <SurveyProgress currentStep={currentStep} totalStep={2} />

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

      <SurveyFooter onPrevious={goBack} onNext={goNextStep} />
    </div>
  );
}
