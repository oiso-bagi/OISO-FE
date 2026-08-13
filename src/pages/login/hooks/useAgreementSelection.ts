import { useCallback, useMemo, useState } from "react";
import type { ConsentItemResponse } from "@/shared/api/generated/types";

import {
  AGREEMENTS,
  CONSENT_TYPE_TO_AGREEMENT_KEY,
  INITIAL_AGREEMENT_STATE,
} from "../terms.constants";
import type { AgreementKey } from "../terms.types";

export const useAgreementSelection = () => {
  const [checked, setChecked] = useState(INITIAL_AGREEMENT_STATE);

  const isAllChecked = useMemo(
    () => AGREEMENTS.every(({ key }) => checked[key]),
    [checked],
  );
  const isRequiredChecked = useMemo(
    () =>
      AGREEMENTS.filter(({ isRequired }) => isRequired).every(
        ({ key }) => checked[key],
      ),
    [checked],
  );

  const toggleAll = useCallback(() => {
    const shouldCheckAll = !isAllChecked;

    setChecked({
      termsOfService: shouldCheckAll,
      privacy: shouldCheckAll,
      overFourteen: shouldCheckAll,
      marketing: shouldCheckAll,
      location: shouldCheckAll,
    });
  }, [isAllChecked]);

  const toggleAgreement = useCallback((key: AgreementKey) => {
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  const applyServerConsents = useCallback((consents: ConsentItemResponse[]) => {
    const nextChecked = { ...INITIAL_AGREEMENT_STATE };

    consents.forEach((consent) => {
      nextChecked[CONSENT_TYPE_TO_AGREEMENT_KEY[consent.type]] =
        consent.isAgreed;
    });

    setChecked(nextChecked);
  }, []);

  return {
    checked,
    isAllChecked,
    isRequiredChecked,
    toggleAll,
    toggleAgreement,
    applyServerConsents,
  };
};
