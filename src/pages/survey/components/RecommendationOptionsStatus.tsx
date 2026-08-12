import * as styles from "./RecommendationOptionsStatus.css";

type RecommendationOptionsStatusProps = {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  loadingMessage: string;
  errorMessage: string;
  emptyMessage?: string;
  onRetry: () => void;
};

export function RecommendationOptionsStatus({
  isLoading,
  isError,
  isEmpty = false,
  loadingMessage,
  errorMessage,
  emptyMessage,
  onRetry,
}: RecommendationOptionsStatusProps) {
  if (isLoading) {
    return (
      <section className={styles.statusBox} role="status" aria-live="polite">
        {loadingMessage}
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.statusBox} role="alert">
        <span>{errorMessage}</span>
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          다시 시도
        </button>
      </section>
    );
  }

  if (isEmpty && emptyMessage) {
    return (
      <section className={styles.statusBox} role="status">
        {emptyMessage}
      </section>
    );
  }

  return null;
}
