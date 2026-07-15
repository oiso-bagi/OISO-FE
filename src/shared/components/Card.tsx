import { Link } from "react-router-dom";

import * as styles from "./Card.css.ts";

type CardInfo = {
  label: string;
  value: string;
  variant?: "default" | "saving";
};

type CardProps = {
  title: string;
  metaText?: string;
  infos?: CardInfo[];
  detailText?: string;
  detailTo?: string;
  onDetailClick?: () => void;
  onDeleteClick?: () => void;
};

export function Card({
  title,
  metaText,
  infos = [],
  detailText = "상세 보기 →",
  detailTo,
  onDetailClick,
  onDeleteClick,
}: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {onDeleteClick && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onDeleteClick}
            aria-label="저장된 루트 삭제"
          >
            🗑
          </button>
        )}
      </div>

      {metaText && <p className={styles.meta}>{metaText}</p>}

      {infos.length > 0 && (
        <div className={styles.infoList}>
          {infos.map((info) => (
            <div
              key={info.label}
              className={
                info.variant === "saving" ? styles.savingBox : styles.infoBox
              }
            >
              <span className={styles.infoLabel}>{info.label}</span>
              <span className={styles.infoValue}>{info.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        {detailTo ? (
          <Link to={detailTo} className={styles.detailLink}>
            {detailText}
          </Link>
        ) : (
          <button
            type="button"
            className={styles.detailButton}
            onClick={onDetailClick}
          >
            {detailText}
          </button>
        )}
      </div>
    </article>
  );
}
