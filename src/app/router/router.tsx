import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";
import { AuthLayout } from "@/app/layout/AuthLayout";

import { HomePage } from "@/pages/home/HomePage";
import { RoutePage } from "@/pages/route/RoutePage";
import { SavedRoutePage } from "@/pages/route/SavedRoutePage";
import { LoginPage } from "@/pages/login/LoginPage";
import { TermsPage } from "@/pages/login/TermsPage";
import { AuthCallbackPage } from "@/pages/login/AuthCallbackPage";
import { SurveyPage } from "@/pages/survey/SurveyPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/route",
        element: <RoutePage />,
      },
      {
        path: "/saved",
        element: <SavedRoutePage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        // 지도 상세. 지도 SDK가 무거워 code-split. 하단 네비 노출 위해 AppLayout 하위.
        path: "/map/:id",
        lazy: async () => {
          const { MapDetailPage } = await import("@/pages/route/MapDetailPage");
          return { Component: MapDetailPage };
        },
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/consents",
        element: <TermsPage />,
      },
      {
        path: "/auth/success",
        element: <AuthCallbackPage />,
      },
      {
        path: "/auth/kakao/success",
        element: <AuthCallbackPage />,
      },
      {
        path: "/auth/google/success",
        element: <AuthCallbackPage />,
      },
      {
        path: "/survey",
        element: <SurveyPage />,
      },
    ],
  },
  {
    /**
     * 관리자 화면. 일반 사용자 번들에 포함되지 않도록 레이아웃부터 하위 페이지까지
     * 전부 code-split 합니다. 데스크톱 전용이라 AppLayout(모바일 폭 + 하단 네비)을
     * 쓰지 않습니다.
     */
    path: "/admin",
    lazy: async () => {
      const { AdminLayout } = await import("@/pages/admin/AdminLayout");
      return { Component: AdminLayout };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { AdminDashboardPage } =
            await import("@/pages/admin/pages/AdminDashboardPage");
          return { Component: AdminDashboardPage };
        },
      },
      {
        path: "users",
        lazy: async () => {
          const { AdminUsersPage } =
            await import("@/pages/admin/pages/AdminUsersPage");
          return { Component: AdminUsersPage };
        },
      },
      {
        path: "contents",
        lazy: async () => {
          const { AdminContentsPage } =
            await import("@/pages/admin/pages/AdminContentsPage");
          return { Component: AdminContentsPage };
        },
      },
      {
        path: "routes/new",
        lazy: async () => {
          const { AdminRouteBuilderPage } =
            await import("@/pages/admin/pages/AdminRouteBuilderPage");
          return { Component: AdminRouteBuilderPage };
        },
      },
      {
        // 등록과 같은 화면입니다. routeId 가 있으면 상세를 받아 폼을 채웁니다.
        path: "routes/:routeId/edit",
        lazy: async () => {
          const { AdminRouteBuilderPage } =
            await import("@/pages/admin/pages/AdminRouteBuilderPage");
          return { Component: AdminRouteBuilderPage };
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
