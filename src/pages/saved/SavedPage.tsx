import { Card } from "@/shared/components/Card";

// Card컴포넌트 사용 예시입니다! 참고만 하고 수정 부탁드립니다~!
const savedRoutes = [
  {
    id: 1,
    title: "기장 해안 드라이브",
    savedDate: "2026.05.30 저장",
    priceText: "-17,000원",
    tags: ["5개소", "약 5시간", "58,000원", "버스"],
  },
  {
    id: 2,
    title: "영도 반나절 가성비 코스",
    savedDate: "2026.06.01 저장",
    priceText: "-18,000원",
    tags: ["4개소", "약 4시간", "45,000원", "도보+도시철도"],
  },
];

export function SavedPage() {
  return (
    <div>
      {savedRoutes.map((route) => (
        <Card
          key={route.id}
          title={route.title}
          savedDate={route.savedDate}
          priceText={route.priceText}
          tags={route.tags}
          detailTo={`/result/${route.id}`}
        />
      ))}
    </div>
  );
}
