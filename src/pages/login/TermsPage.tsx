import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/components/Card";

import * as styles from "./TermsPage.css";

import CheckIcon from "@/shared/icons/check.svg?react";

type AgreementKey =
  "termsOfService" | "privacy" | "overFourteen" | "marketing" | "location";

type Agreement = {
  key: AgreementKey;
  label: string;
  required: boolean;
};

const agreements: Agreement[] = [
  { key: "termsOfService", label: "이용약관", required: true },
  { key: "privacy", label: "개인정보 수집·이용", required: true },
  { key: "overFourteen", label: "만 14세 이상", required: true },
  { key: "marketing", label: "마케팅 정보 수신", required: false },
  { key: "location", label: "위치기반 서비스", required: false },
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

  const allChecked = agreements.every(({ key }) => checked[key]);
  const requiredChecked = useMemo(
    () =>
      agreements
        .filter(({ required }) => required)
        .every(({ key }) => checked[key]),
    [checked],
  );

  const handleAllChange = () => {
    const nextChecked = !allChecked;

    setChecked({
      termsOfService: nextChecked,
      privacy: nextChecked,
      overFourteen: nextChecked,
      marketing: nextChecked,
      location: nextChecked,
    });
  };

  const handleAgreementChange = (key: AgreementKey) => {
    setChecked((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSubmit = () => {
    if (!requiredChecked) return;

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
              checked={allChecked}
              onChange={handleAllChange}
            />
            <span className={styles.checkbox} aria-hidden="true">
              {allChecked && <CheckIcon className={styles.checkIcon} />}
            </span>
            <span>전체 동의합니다</span>
          </label>
        </Card>

        <Card className={styles.agreementBox}>
          {agreements.map(({ key, label, required }, index) => (
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
                    required
                      ? `${styles.typeBadge} ${styles.requiredBadge}`
                      : styles.typeBadge
                  }
                >
                  {required ? "필수" : "선택"}
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
        disabled={!requiredChecked}
        onClick={handleSubmit}
      >
        동의하고 시작하기
      </button>
    </main>
  );
}
