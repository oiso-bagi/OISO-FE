import { Link } from "react-router-dom";

import * as styles from "./Card.css.ts";

type CardProps = {
  title: string;
  savedDate?: string;
  priceText?: string;
  tags?: string[];
  detailText?: string;
  detailTo?: string;
  onDetailClick?: () => void;
};

export function Card({
  title,
  savedDate,
  priceText,
  tags = [],
  detailText = "상세 보기 →",
  detailTo,
  onDetailClick,
}: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {priceText && <span className={styles.price}>{priceText}</span>}
      </div>

      {savedDate && <p className={styles.savedDate}>{savedDate}</p>}

      {tags.length > 0 && (
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
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
