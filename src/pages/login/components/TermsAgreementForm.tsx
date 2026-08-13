import { Card } from "@/shared/components/Card";
import CheckIcon from "@/shared/icons/check.svg?react";

import { AGREEMENTS } from "../terms.constants";
import type { AgreementKey, AgreementState } from "../terms.types";
import * as styles from "../TermsPage.css";

interface TermsAgreementFormProps {
  checked: AgreementState;
  isAllChecked: boolean;
  isDisabled: boolean;
  onToggleAll: () => void;
  onToggleAgreement: (key: AgreementKey) => void;
}

export function TermsAgreementForm({
  checked,
  isAllChecked,
  isDisabled,
  onToggleAll,
  onToggleAgreement,
}: TermsAgreementFormProps) {
  return (
    <>
      <Card className={styles.allAgreement}>
        <label className={styles.allAgreementLabel}>
          <input
            className={styles.hiddenCheckbox}
            type="checkbox"
            checked={isAllChecked}
            disabled={isDisabled}
            onChange={onToggleAll}
          />
          <span className={styles.checkbox} aria-hidden="true">
            {isAllChecked && <CheckIcon className={styles.checkIcon} />}
          </span>
          <span>전체 동의합니다</span>
        </label>
      </Card>

      <Card className={styles.agreementBox}>
        {AGREEMENTS.map(({ key, label, isRequired }, index) => (
          <div
            key={key}
            className={
              index === 3
                ? `${styles.agreementRow} ${styles.optionalDivider}`
                : styles.agreementRow
            }
          >
            <label className={styles.agreementLabel}>
              <input
                className={styles.hiddenCheckbox}
                type="checkbox"
                checked={checked[key]}
                disabled={isDisabled}
                onChange={() => onToggleAgreement(key)}
              />
              <span className={styles.checkbox} aria-hidden="true">
                {checked[key] && <CheckIcon className={styles.checkIcon} />}
              </span>
              <span>{label}</span>
            </label>

            <div className={styles.agreementActions}>
              <span
                className={
                  isRequired
                    ? `${styles.typeBadge} ${styles.requiredBadge}`
                    : styles.typeBadge
                }
              >
                {isRequired ? "필수" : "선택"}
              </span>
              <button
                type="button"
                className={styles.viewButton}
                aria-label={`${label} 내용 보기`}
              >
                보기
              </button>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}
