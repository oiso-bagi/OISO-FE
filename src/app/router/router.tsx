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
        path: "/survey",
        element: <SurveyPage />,
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
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/auth/callback",
        element: <AuthCallbackPage />,
      },
    ],
  },
]);
