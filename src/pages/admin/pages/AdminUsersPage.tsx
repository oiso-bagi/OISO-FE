import { AdminPlaceholderPage } from "./AdminPlaceholderPage";

export function AdminUsersPage() {
  return (
    <AdminPlaceholderPage
      title="회원 관리"
      description="회원 계정 상태와 권한을 관리합니다."
      planned={[
        "이메일·닉네임 검색",
        "소셜 제공자·상태·권한 필터",
        "계정 정지/복구 토글",
        "관리자 권한 부여/해제",
      ]}
    />
  );
}
