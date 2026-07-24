import { Link, useLocation } from "react-router-dom";

import courseIcon from "@/shared/assets/svg/course.svg";
import dashboardIcon from "@/shared/assets/svg/dashboard.svg";
import homeIcon from "@/shared/assets/svg/home.svg";
import saveIcon from "@/shared/assets/svg/save.svg";

import * as styles from "./BottomNavigation.css.ts";

type NavigationItem = {
  label: string;
  path: string;
  activePaths: string[];
  icon: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: "홈",
    path: "/",
    activePaths: ["/"],
    icon: homeIcon,
  },
  {
    label: "루트",
    path: "/route",
    activePaths: ["/route", "/result"],
    icon: courseIcon,
  },
  {
    label: "대시보드",
    path: "/dashboard",
    activePaths: ["/dashboard"],
    icon: dashboardIcon,
  },
  {
    label: "저장",
    // 지도 상세(/map)는 저장 루트에서 진입하므로 저장 탭을 활성화
    path: "/saved",
    activePaths: ["/saved", "/map"],
    icon: saveIcon,
  },
];

export function BottomNavigation() {
  const location = useLocation();

  const isActivePath = (activePaths: string[]) => {
    return activePaths.some((path) => {
      if (path === "/") {
        return location.pathname === "/";
      }

      return location.pathname.startsWith(path);
    });
  };

  return (
    <nav className={styles.navigation}>
      {navigationItems.map((item) => {
        const isActive = isActivePath(item.activePaths);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={styles.item}
            aria-current={isActive ? "page" : undefined}
          >
            <div
              className={`${styles.iconBox} ${
                isActive ? styles.activeIconBox : ""
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className={`${styles.icon} ${
                  isActive ? styles.activeIcon : ""
                }`}
              />
            </div>

            <span
              className={`${styles.label} ${
                isActive ? styles.activeLabel : ""
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
