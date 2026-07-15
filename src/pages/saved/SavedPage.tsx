import { Card } from "@/shared/components/Card";
import { Header } from "@/shared/components/header/Header";

import { pageContent } from "@/shared/styles/layout.css";

const savedRoutes = [
  {
    id: 1,
    title: "원도심 로컬 체험 코스",
    metaText: "📅 2026. 5. 18.  📍 4개 장소  🚶 도보 + 🚇 지하철",
    infos: [
      { label: "비용", value: "45,000원" },
      { label: "시간", value: "180분" },
      { label: "거리", value: "3.2km" },
      { label: "절약", value: "-25,000원", variant: "saving" as const },
    ],
  },
  {
    id: 2,
    title: "문화유적 탐방 코스",
    metaText: "📅 2026. 6. 22.  📍 5개 장소  🚶 도보 + 🚌 버스",
    infos: [
      { label: "비용", value: "55,000원" },
      { label: "시간", value: "240분" },
      { label: "거리", value: "4.5km" },
      { label: "절약", value: "-30,000원", variant: "saving" as const },
    ],
  },
  {
    id: 3,
    title: "자연 탐험 트레킹 코스",
    metaText: "📅 2026. 7. 10.  📍 3개 장소  🚶 도보 + 🚲 자전거",
    infos: [
      { label: "비용", value: "50,000원" },
      { label: "시간", value: "150분" },
      { label: "거리", value: "6.0km" },
      { label: "절약", value: "-20,000원", variant: "saving" as const },
    ],
  },
];

export function SavedPage() {
  return (
    <div>
      <Header backTo="/" title="저장한 루트" right={<span>3개</span>} />
      <main className={pageContent}>
        {savedRoutes.map((route) => (
          <Card
            key={route.id}
            title={route.title}
            metaText={route.metaText}
            infos={route.infos}
            detailTo={`/result/${route.id}`}
            onDeleteClick={() => console.log(`${route.title} 삭제`)}
          />
        ))}
      </main>
    </div>
  );
}
