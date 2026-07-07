import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";
import { AuthLayout } from "@/app/layout/AuthLayout";

import { HomePage } from "@/pages/home/HomePage";
import { CoursePage } from "@/pages/route/CoursePage";
import { SavedPage } from "@/pages/saved/SavedPage";
import { LoginPage } from "@/pages/login/LoginPage";
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
        element: <CoursePage />,
      },
      {
        path: "/saved",
        element: <SavedPage />,
      },
      {
        path: "/survey",
        element: <SurveyPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
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
    ],
  },
]);
