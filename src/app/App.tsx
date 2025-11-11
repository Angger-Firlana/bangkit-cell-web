import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from '../modules/landing-page/landing-page';
import Login from '../modules/auth/login';
import Layout from '../shared/components/layout';
import Dashboard from '../modules/dashboard/dashboard';
import Services from '../modules/dashboard/services';
import Devices from '../modules/dashboard/devices';
import DeviceVariants from '../modules/dashboard/DeviceVariants';
import SalesReport from '../modules/dashboard/SalesReport';
import Users from '../modules/dashboard/Users';

function App() {
  return (
    <Routes>
      <Route path="/bangkit-cell" element={<Home />} />
      <Route path="/bangkit-cell/auth" element={<Login />} />
      
      {/* Semua route dashboard pakai Layout */}
      <Route path="/bangkit-cell/dashboard" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
      <Route path="/bangkit-cell/services" element={
        <Layout>
          <Services />
        </Layout>
      } />
      <Route path="/bangkit-cell/devices" element={
        <Layout>
          <Devices />
        </Layout>
      } />
      <Route path="/bangkit-cell/device-variants" element={
        <Layout>
          <DeviceVariants />
        </Layout>
      } />
      <Route path="/bangkit-cell/sales-report" element={
        <Layout>
          <SalesReport />
        </Layout>
      } />
      <Route path="/bangkit-cell/users" element={
        <Layout>
          <Users />
        </Layout>
      } />
    </Routes>
  );
}

export default App;