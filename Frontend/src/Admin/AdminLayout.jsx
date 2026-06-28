import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./All-Css/Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout-container">
      <Sidebar />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}


