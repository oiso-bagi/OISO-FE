import { useSearchParams } from "react-router-dom";

import { PageHeader } from "../components/PageHeader";
import type { TabItem } from "../components/Tabs";
import { Tabs } from "../components/Tabs";
import { AdminPlacesPanel } from "./AdminPlacesPanel";
import { AdminRoutesPanel } from "./AdminRoutesPanel";

type ContentsTab = "places" | "routes";

const TABS: readonly TabItem<ContentsTab>[] = [
  { value: "places", label: "장소" },
  { value: "routes", label: "추천 루트" },
];

export function AdminContentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const raw = searchParams.get("tab");
  const tab: ContentsTab = raw === "routes" ? "routes" : "places";

  const changeTab = (next: ContentsTab) => {
    setSearchParams(
      (previous) => {
        const params = new URLSearchParams(previous);

        params.set("tab", next);

        return params;
      },
      { replace: true },
    );
  };

  return (
    <>
      <PageHeader
        title="콘텐츠·루트 관리"
        description="장소 데이터와 마스터 추천 코스를 관리합니다."
      />

      <Tabs items={TABS} value={tab} onChange={changeTab} label="콘텐츠 종류" />

      {/*
       * 탭별로 컴포넌트를 나눠 두면 보이지 않는 탭의 목록은 조회하지 않습니다.
       * 검색·필터도 각자의 쿼리 prefix(`place*` / `route*`)를 써서 섞이지 않습니다.
       */}
      {tab === "places" ? <AdminPlacesPanel /> : <AdminRoutesPanel />}
    </>
  );
}
