import * as styles from "./Skeleton.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

/** 로딩 자리표시용 펄스 블록. width/height 로 크기를 지정합니다. */
export function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <div
      className={className ? `${styles.skeleton} ${className}` : styles.skeleton}
      style={{ width, height }}
    />
  );
}
