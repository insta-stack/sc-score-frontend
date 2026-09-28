import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Consumer pages
import ConsumerLogin from "./pages/consumer/Login";
import ConsumerSignup from "./pages/consumer/Signup";
import ConsumerForgotPassword from "./pages/consumer/ForgotPassword";
import ConsumerDashboard from "./pages/consumer/Dashboard";
import ConsumerProfile from "./pages/consumer/Profile";

// Seller pages
import SellerHome from "./pages/sellers/SellerHome";
import SellerSupport from "./pages/sellers/SellerSupport";
import SellerAbout from "./pages/sellers/About";
import SellerContact from "./pages/sellers/Contact";
// import SellerPrivacy from "./pages/sellers/Privacy";


import SellerTermsOfService from "./pages/sellers/SellerTermsOfService";
import SellerPrivacyPolicy from "./pages/sellers/SellerPrivacyPolicy";
import SellerTerms from "./pages/sellers/Terms";
import SellerLogin from "./pages/sellers/Login";
import SellerSignup from "./pages/sellers/Signup";
import SellerForgotPassword from "./pages/sellers/ForgotPassword";
import SellerDashboard from "./pages/sellers/Dashboard";
import SellerProfile from "./pages/sellers/Profile";

// Platform pages
import PlatformLogin from "./pages/platforms/Login";
import PlatformSignup from "./pages/platforms/Signup";
import PlatformForgotPassword from "./pages/platforms/ForgotPassword";
import PlatformDashboard from "./pages/platforms/Dashboard";
import PlatformProfile from "./pages/platforms/Profile";

// Admin
import AdminLogin from "./pages/admin/Login";

// Shared
import NotFound from "./pages/NotFound";
import {
  PortalHome,
  PublicPortalPage,
  WorkspacePlaceholder,
} from "./components/shared/PortalPage";

const guard = (role, loginPath, child) => (
  <ProtectedRoute allowedRoles={[role]} loginPath={loginPath}>
    {child}
  </ProtectedRoute>
);

const publicPages = (portal, exclude = []) =>
  ["about", "contact", "privacy", "terms", "support"]
    .filter((page) => !exclude.includes(page))
    .map((page) => (
      <Route
        key={`${portal}-${page}`}
        path={`/${portal}/${page}`}
        element={<PublicPortalPage portal={portal} page={page} />}
      />
    ));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ================= ROOT ================= */}
          <Route path="/" element={<Navigate to="/sellers" replace />} />

          {/* ================= CONSUMER ================= */}
          <Route
            path="/consumer"
            element={<PortalHome portal="consumer" />}
          />

          <Route
            path="/consumer/login"
            element={<ConsumerLogin />}
          />

          <Route
            path="/consumer/signup"
            element={<ConsumerSignup />}
          />

          <Route
            path="/consumer/forgot-password"
            element={<ConsumerForgotPassword />}
          />

          <Route
            path="/consumer/dashboard"
            element={guard(
              "consumer",
              "/consumer/login",
              <ConsumerDashboard />
            )}
          />

          <Route
            path="/consumer/profile"
            element={guard(
              "consumer",
              "/consumer/login",
              <ConsumerProfile />
            )}
          />

          {publicPages("consumer")}

          {/* ================= SELLERS ================= */}

          {/* Seller Landing/Home Page */}
          <Route
            path="/sellers"
            element={<PortalHome portal="sellers" />}
          />

          {/* Seller Home Route */}
          <Route
            path="/sellers/home"
            element={<Navigate to="/sellers" replace />}
          />

          <Route
            path="/sellers/login"
            element={<SellerLogin />}
          />

          <Route
            path="/sellers/signup"
            element={<SellerSignup />}
          />

          <Route
            path="/sellers/forgot-password"
            element={<SellerForgotPassword />}
          />

          <Route
            path="/sellers/dashboard"
            element={guard(
              "seller",
              "/sellers/login",
              <SellerDashboard />
            )}
          />

          <Route
            path="/sellers/profile"
            element={guard(
              "seller",
              "/sellers/login",
              <SellerProfile />
            )}
          />

          <Route
            path="/sellers/about"
            element={<SellerAbout />}
          />

          <Route
            path="/sellers/contact"
            element={<SellerContact />}
          />

         

          <Route
            path="/sellers/terms"
            element={<SellerTermsOfService />}
          />

          <Route
            path="/terms/sellers"
            element={<SellerTermsOfService />}
          />

          <Route
            path="/sellers/privacy"
            element={<SellerPrivacyPolicy />}
          />

          <Route
            path="/privacy/sellers"
            element={<SellerPrivacyPolicy />}
          />

          <Route
            path="/sellers/terms-of-service"
            element={<Navigate to="/sellers/terms" replace />}
          />

          <Route
            path="/sellers/support"
            element={<SellerSupport />}
          />

          <Route
            path="/sellers/sellersupport"
            element={<Navigate to="/sellers/support" replace />}
          />

          {publicPages("sellers", [
            "about",
            "contact",
            "support",
            "terms",
          ])}

          {/* ================= PLATFORMS ================= */}
          <Route
            path="/platforms"
            element={<PortalHome portal="platforms" />}
          />

          <Route
            path="/platforms/login"
            element={<PlatformLogin />}
          />

          <Route
            path="/platforms/signup"
            element={<PlatformSignup />}
          />

          <Route
            path="/platforms/forgot-password"
            element={<PlatformForgotPassword />}
          />

          <Route
            path="/platforms/dashboard"
            element={guard(
              "platform",
              "/platforms/login",
              <PlatformDashboard />
            )}
          />

          <Route
            path="/platforms/profile"
            element={guard(
              "platform",
              "/platforms/login",
              <PlatformProfile />
            )}
          />

          <Route
            path="/platforms/api-keys"
            element={guard(
              "platform",
              "/platforms/login",
              <WorkspacePlaceholder
                portal="platforms"
                title="API keys"
                description="Keys are managed by your authorized organization administrator."
              />
            )}
          />

          <Route
            path="/platforms/integrations"
            element={guard(
              "platform",
              "/platforms/login",
              <WorkspacePlaceholder
                portal="platforms"
                title="Integrations"
                description="Connected platforms will appear here when the service returns integration data."
              />
            )}
          />

          <Route
            path="/platforms/reports"
            element={guard(
              "platform",
              "/platforms/login",
              <WorkspacePlaceholder
                portal="platforms"
                title="Reports"
                description="Reports will appear here once they are generated for your organization."
              />
            )}
          />

          <Route
            path="/platforms/webhooks"
            element={guard(
              "platform",
              "/platforms/login",
              <WorkspacePlaceholder
                portal="platforms"
                title="Webhooks"
                description="Webhook delivery history is available when integration telemetry is enabled."
              />
            )}
          />

          {publicPages("platforms")}

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin/dashboard"
            element={guard(
              "admin",
              "/admin/login",
              <WorkspacePlaceholder
                portal="admin"
                title="Administrative workspace"
                description="Administrative data is only shown after it is supplied by the authorized service."
              />
            )}
          />

          <Route
            path="/admin/users"
            element={guard(
              "admin",
              "/admin/login",
              <WorkspacePlaceholder
                portal="admin"
                title="Users"
                description="User management data is not available in this frontend without an authorized admin API response."
              />
            )}
          />

          <Route
            path="/admin/reports"
            element={guard(
              "admin",
              "/admin/login",
              <WorkspacePlaceholder
                portal="admin"
                title="Reports"
                description="No administrative reports are currently available."
              />
            )}
          />

          <Route
            path="/admin/audit-log"
            element={guard(
              "admin",
              "/admin/login",
              <WorkspacePlaceholder
                portal="admin"
                title="Audit log"
                description="No audit events are currently available."
              />
            )}
          />

          {/* ================= 404 ================= */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}