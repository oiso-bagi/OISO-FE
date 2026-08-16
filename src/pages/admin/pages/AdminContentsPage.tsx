import { AdminPlaceholderPage } from "./AdminPlaceholderPage";

export function AdminContentsPage() {
  return (
    <AdminPlaceholderPage
      title="콘텐츠·루트 관리"
      description="장소 데이터와 마스터 추천 코스를 관리합니다."
      planned={[
        "장소(Place) 목록 및 Soft Delete 토글",
        "추천 루트 목록 및 게시 토글",
        "탭 구조",
      ]}
    />
  );
}
