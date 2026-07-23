import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/components/Card";
import CheckIcon from "@/shared/icons/check.svg?react";

import * as styles from "./TermsPage.css";

type AgreementKey =
  "termsOfService" | "privacy" | "overFourteen" | "marketing" | "location";

type Agreement = {
  key: AgreementKey;
  label: string;
  isRequired: boolean;
};

const agreements: Agreement[] = [
  { key: "termsOfService", label: "이용약관", isRequired: true },
  { key: "privacy", label: "개인정보 수집·이용", isRequired: true },
  { key: "overFourteen", label: "만 14세 이상", isRequired: true },
  { key: "marketing", label: "마케팅 정보 수신", isRequired: false },
  { key: "location", label: "위치기반 서비스", isRequired: false },
];

const initialAgreementState: Record<AgreementKey, boolean> = {
  termsOfService: false,
  privacy: false,
  overFourteen: false,
  marketing: false,
  location: false,
};

export function TermsPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(initialAgreementState);

  const isAllchecked = agreements.every(({ key }) => checked[key]);
  const isRequiredChecked = useMemo(
    () =>
      agreements
        .filter(({ isRequired }) => isRequired)
        .every(({ key }) => checked[key]),
    [checked],
  );

  const handleAllChange = () => {
    const shouldCheckAll = !isAllchecked;

    setChecked({
      termsOfService: shouldCheckAll,
      privacy: shouldCheckAll,
      overFourteen: shouldCheckAll,
      marketing: shouldCheckAll,
      location: shouldCheckAll,
    });
  };

  const handleAgreementChange = (key: AgreementKey) => {
    setChecked((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSubmit = () => {
    if (!isRequiredChecked) return;

    // TODO: 약관 동의 API 연동 후 다음 온보딩 경로로 이동해 주세요.
    navigate("/survey");
  };

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="서비스 이용 약관">
        <Card className={styles.allAgreement}>
          <label className={styles.allAgreementLabel}>
            <input
              className={styles.hiddenCheckbox}
              type="checkbox"
              checked={isAllchecked}
              onChange={handleAllChange}
            />
            <span className={styles.checkbox} aria-hidden="true">
              {isAllchecked && <CheckIcon className={styles.checkIcon} />}
            </span>
            <span>전체 동의합니다</span>
          </label>
        </Card>

        <Card className={styles.agreementBox}>
          {agreements.map(({ key, label, isRequired }, index) => (
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
                  onChange={() => handleAgreementChange(key)}
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
      </section>

      <button
        type="button"
        className={styles.submitButton}
        disabled={!isRequiredChecked}
        onClick={handleSubmit}
      >
        동의하고 시작하기
      </button>
    </main>
  );
}
