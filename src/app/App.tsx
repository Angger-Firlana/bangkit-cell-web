import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../modules/landing-page/landing-page";
import Login from "../modules/auth/login";
import Layout from "../shared/components/layout";
import Dashboard from "../modules/dashboard/dashboard";
import Services from "../modules/dashboard/services";
import Devices from "../modules/dashboard/devices";
import DeviceVariants from "../modules/dashboard/DeviceVariants";
import SalesReport from "../modules/dashboard/SalesReport";
import Users from "../modules/dashboard/Users";
import ProtectedRoute from "../shared/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/bangkit-cell" element={<Home />} />
      <Route path="/bangkit-cell/auth" element={  
        <Login />
      } />

      {/* Semua route dashboard diproteksi */}
      <Route
        path="/bangkit-cell/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bangkit-cell/dashboard/services"
        element={
          <ProtectedRoute>
            <Layout>
              <Services />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bangkit-cell/dashboard/devices"
        element={
          <ProtectedRoute>
            <Layout>
              <Devices />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bangkit-cell/dashboard/device-variants"
        element={
          <ProtectedRoute>
            <Layout>
              <DeviceVariants />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bangkit-cell/dashboard/sales-report"
        element={
          <ProtectedRoute>
            <Layout>
              <SalesReport />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bangkit-cell/dashboard/users"
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
