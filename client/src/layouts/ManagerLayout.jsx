import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ManagerLayout() {

  // pass the sidebar by role
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex">

      {/* FIXED SIDEBAR */}
      <Sidebar role={user.role} />

      {/* PAGE CONTENT */}
      <main className="flex-1 min-h-screen bg-gray-100 p-6">
        <Outlet />
      </main>

    </div>
  );
}

export default ManagerLayout;