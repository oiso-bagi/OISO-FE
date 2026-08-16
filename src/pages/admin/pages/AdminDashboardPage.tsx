import { AdminPlaceholderPage } from "./AdminPlaceholderPage";

export function AdminDashboardPage() {
  return (
    <AdminPlaceholderPage
      title="대시보드"
      description="서비스 현황과 KTO 공공데이터 배치 운영 상태를 확인합니다."
      planned={[
        "KPI 카드 4종",
        "카테고리·상권별 절약 리포트 차트",
        "KTO 잔여 쿼터 및 수동 수집 트리거",
      ]}
    />
  );
}
