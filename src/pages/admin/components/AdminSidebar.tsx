import { NavLink } from "react-router-dom";

import CourseIcon from "@/shared/assets/svg/course.svg?react";
import DashboardIcon from "@/shared/assets/svg/dashboard.svg?react";
import PlusIcon from "@/shared/assets/svg/plus.svg?react";
import UsersIcon from "@/shared/assets/svg/users.svg?react";
import oisoLogo from "@/shared/icons/oiso_logo.svg";

import * as styles from "./AdminSidebar.css";

const MENU = [
  { to: "/admin", label: "대시보드", Icon: DashboardIcon, end: true },
  { to: "/admin/users", label: "회원 관리", Icon: UsersIcon, end: false },
  { to: "/admin/contents", label: "콘텐츠·루트", Icon: CourseIcon, end: false },
  { to: "/admin/routes/new", label: "코스 등록", Icon: PlusIcon, end: false },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

export function AdminSidebar({
  isCollapsed,
  onToggleCollapsed,
}: AdminSidebarProps) {
  return (
    <aside
      className={`${styles.sidebar} ${
        isCollapsed
          ? styles.sidebarWidth.collapsed
          : styles.sidebarWidth.expanded
      }`}
    >
      <div
        className={`${styles.brand} ${isCollapsed ? styles.brandCollapsed : ""}`}
      >
        <img src={oisoLogo} alt="" className={styles.brandLogo} />
        {!isCollapsed && <span>오이소 관리자</span>}
      </div>

      <nav className={styles.nav} aria-label="관리자 메뉴">
        {MENU.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={`${styles.navItem} ${
              isCollapsed ? styles.navItemCollapsed : ""
            }`}
            // 접었을 때는 라벨이 없으므로 tooltip 과 aria-label 로 대체합니다.
            title={isCollapsed ? label : undefined}
            aria-label={isCollapsed ? label : undefined}
          >
            <Icon className={styles.navIcon} aria-hidden="true" />
            {!isCollapsed && <span className={styles.navLabel}>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className={`${styles.collapseButton} ${
          isCollapsed ? styles.collapseButtonCollapsed : ""
        }`}
        onClick={onToggleCollapsed}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
      >
        <span className={styles.collapseMark} aria-hidden="true">
          {isCollapsed ? "»" : "«"}
        </span>
        {!isCollapsed && <span>접기</span>}
      </button>
    </aside>
  );
}
