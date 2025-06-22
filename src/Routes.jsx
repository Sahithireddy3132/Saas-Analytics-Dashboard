import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import MainDashboard from "pages/main-dashboard";
import AnalyticsReports from "pages/analytics-reports";
import UserManagement from "pages/user-management";
import DataExportReporting from "pages/data-export-reporting";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/main-dashboard" element={<MainDashboard />} />
          <Route path="/data-export-reporting" element={<DataExportReporting />} />
          <Route path="/analytics-reports" element={<AnalyticsReports />} />
          <Route path="/" element={<Login />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;