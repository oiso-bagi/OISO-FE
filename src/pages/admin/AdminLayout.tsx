import { Link, Outlet, useLocation } from "react-router-dom";

import { useCurrentUser } from "@/pages/dashboard/hooks/useCurrentUser";

import { AdminSidebar } from "./components/AdminSidebar";
import { useAdminAccess } from "./lib/useAdminAccess";
import { useSidebarCollapsed } from "./lib/useSidebarCollapsed";

import * as styles from "./AdminLayout.css";

/** 상단 바 제목. 라우트마다 별도 설정을 두지 않고 경로로 결정합니다. */
const TITLE_BY_PATH: Record<string, string> = {
  "/admin": "대시보드",
  "/admin/users": "회원 관리",
  "/admin/contents": "콘텐츠·루트 관리",
  "/admin/routes/new": "큐레이션 코스 등록",
};

const resolveTitle = (pathname: string) => {
  const exact = TITLE_BY_PATH[pathname];

  if (exact) return exact;

  // 코스 수정은 경로에 id 가 들어가 정확히 일치시킬 수 없습니다.
  if (/^\/admin\/routes\/[^/]+\/edit$/.test(pathname)) {
    return "큐레이션 코스 수정";
  }

  return "관리자";
};

interface NoticeProps {
  title: string;
  description: string;
  action?: { label: string; to: string };
}

function Notice({ title, description, action }: NoticeProps) {
  return (
    <div className={styles.notice} role="status">
      <h1 className={styles.noticeTitle}>{title}</h1>
      <p className={styles.noticeText}>{description}</p>

      {action && (
        <Link to={action.to} className={styles.noticeAction}>
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function AdminLayout() {
  const access = useAdminAccess();
  const location = useLocation();
  const { isCollapsed, toggle } = useSidebarCollapsed();
  const { data: user } = useCurrentUser();

  if (access === "checking") {
    return (
      <Notice title="확인 중" description="접근 권한을 확인하고 있어요." />
    );
  }

  if (access === "unauthenticated") {
    return (
      <Notice
        title="로그인이 필요해요"
        description="관리자 페이지는 로그인 후 이용할 수 있어요."
        action={{ label: "로그인하러 가기", to: "/login" }}
      />
    );
  }

  if (access === "error") {
    return (
      <Notice
        title="접근 권한을 확인하지 못했어요"
        description="잠시 후 다시 시도해 주세요."
        action={{ label: "홈으로", to: "/" }}
      />
    );
  }

  if (access === "forbidden") {
    return (
      <Notice
        title="권한이 없어요"
        description={
          "이 페이지는 관리자만 이용할 수 있어요.\n권한이 필요하면 담당자에게 문의해 주세요."
        }
        action={{ label: "홈으로", to: "/" }}
      />
    );
  }

  return (
    <div className={styles.shell}>
      <AdminSidebar isCollapsed={isCollapsed} onToggleCollapsed={toggle} />

      <div className={styles.main}>
        <header className={styles.topbar}>
          <h1 className={styles.topbarTitle}>
            {resolveTitle(location.pathname)}
          </h1>

          <div className={styles.topbarRight}>
            {user && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.nickname}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            )}

            <Link to="/" className={styles.logoutButton}>
              서비스로 이동
            </Link>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
