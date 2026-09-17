import { CURRENT_CONSENT_VERSION } from "@/shared/api/consentApi";
import { DataAttribution } from "@/shared/components/DataAttribution/DataAttribution";
import { Header } from "@/shared/components/header/Header";
import { pageContent } from "@/shared/styles/layout.css";

import { AGREEMENT_DOCUMENTS } from "./termsContent";
import type { Agreement } from "./terms.types";
import * as styles from "./TermsDetailPage.css";

interface TermsDetailPageProps {
  agreement: Agreement;
}

export function TermsDetailPage({ agreement }: TermsDetailPageProps) {
  const document = AGREEMENT_DOCUMENTS[agreement.key];

  return (
    <main className={styles.page}>
      <Header backTo="/consents" title={agreement.label} />

      <article className={`${pageContent} ${styles.content}`}>
        <header className={styles.introduction}>
          <div className={styles.titleRow}>
            <h2 className={styles.documentTitle}>{document.title}</h2>
            <span
              className={
                agreement.isRequired
                  ? `${styles.typeBadge} ${styles.requiredBadge}`
                  : styles.typeBadge
              }
            >
              {agreement.isRequired ? "필수" : "선택"}
            </span>
          </div>
          <p className={styles.summary}>{document.summary}</p>
          <p className={styles.version}>약관 버전 {CURRENT_CONSENT_VERSION}</p>
        </header>

        <div className={styles.documentBody}>
          {document.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}

              {section.items && (
                <ul className={styles.list}>
                  {section.items.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {document.notice && (
            <p className={styles.notice}>{document.notice}</p>
          )}
        </div>
      </article>

      <DataAttribution className={styles.attribution} />
    </main>
  );
}
