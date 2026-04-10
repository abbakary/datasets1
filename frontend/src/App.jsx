// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

/* ===================== Public ===================== */

import OnboardPage from "./pages/OnboardPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import NewPassword from "./pages/NewPassword.jsx";

import DatasetsPage from "./pages/public/dataset/DatasetsPage.jsx";
import DatasetInfo from "./pages/public/dataset/DatasetInfo.jsx";

import BudgetPage from "./pages/public/budget/BudgetPage.jsx";
import ProjectPage from "./pages/public/project/ProjectPage.jsx";
import FundsPage from "./pages/public/funds/FundsPage.jsx";
import AnalysisPage from "./pages/public/analysis/AnalysisPage.jsx";
import ReportsPage from "./pages/public/reports/ReportsPage.jsx";
/* ===================== User Profile ===================== */

import UserProfile from "./pages/profile/UserProfile";

/* ===================== Dashboards ===================== */

import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import EditorDashboard from "./pages/dashboard/EditorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ViewerDashboard from "./pages/dashboard/ViewerDashboard";

/* ===================== Logout ===================== */

import LogoutPage from "./pages/LogoutPage.jsx";

/* ===================== Routes ===================== */

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboard" replace />} />

      <Route path="/onboard" element={<OnboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<NewPassword />} />
      <Route path="/public/datasets" element={<DatasetsPage />} />
      <Route path="/dataset-info/:id" element={<DatasetInfo />} />
      <Route path="/public/budget" element={<BudgetPage />} />
      <Route path="/public/project" element={<ProjectPage />} />
      <Route path="/public/funds" element={<FundsPage />} />
      <Route path="/public/analysis" element={<AnalysisPage />} />
      <Route path="/public/reports" element={<ReportsPage />} />

      <Route path="/profile" element={<UserProfile />} />

      <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
      <Route path="/dashboard/seller" element={<SellerDashboard />} />
      <Route path="/dashboard/editor" element={<EditorDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/viewer" element={<ViewerDashboard />} />

      <Route path="/logout" element={<LogoutPage />} />

      <Route
        path="*"
        element={<div style={{ padding: 24 }}>Page not found</div>}
      />
    </Routes>
  );
}
