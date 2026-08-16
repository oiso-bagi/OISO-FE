import { AdminPlaceholderPage } from "./AdminPlaceholderPage";

export function AdminRouteBuilderPage() {
  return (
    <AdminPlaceholderPage
      title="큐레이션 코스 등록"
      description="장소를 조합해 마스터 추천 코스를 만듭니다."
      planned={[
        "코스 기본 정보 입력",
        "장소 검색 및 경유지 구성",
        "1차는 순서 번호 입력, 2차에 드래그앤드롭",
      ]}
    />
  );
}
