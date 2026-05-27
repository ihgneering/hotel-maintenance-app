import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
// layout
import AdminLayout from "./layouts/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import SupervisorLayout from "./layouts/SupervisorLayout";
// admin
import EquipmentImport from "./pages/admin/EquipmentImport";
import ReportDefect from "./pages/shared/ReportDefect";
// manager
import Dashboard from "./pages/manager/Dashboard";
// supervisor
import Overview from "./pages/supervisor/Overview";
import WorkerLayout from "./layouts/WorkerLayout";
// worker
import MyTasks from "./pages/worker/MyTasks";
import RoomMatrix from "./pages/shared/RoomMatrix";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Redirect root */}
        <Route
        path="/"
        element={<Navigate to="/login" replace />}
        />

        {/* LOGIN */}
        <Route
        path="/login"
        element={<LoginPage />}
        />

        {/* ADMIN */}
        <Route
        path="/admin"
        element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
          index 
          element={<Navigate to="/admin/equipment-import" replace />}
          />
          <Route
          path="equipment-import"
          element={<EquipmentImport />}
          />
          <Route
          path="report-defect"
          element={<ReportDefect />}
          />
          <Route
          path="room-matrix"
          element={<RoomMatrix />}
          />
        </Route>

        {/*  MANAGER  */}
        <Route
        path="/manager"
        element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route
          index
          element={<Navigate to="/manager/dashboard" replace />}
          />
          <Route
          path="dashboard"
          element={<Dashboard />}
          />
          <Route
          path="report-defect"
          element={<ReportDefect />}
          />
          <Route
          path="room-matrix"
          element={<RoomMatrix />}
          />
        </Route>

        {/*  SUPERVISOR  */}
        <Route
        path="/supervisor"
        element={
            <ProtectedRoute allowedRoles={["supervisor"]}>
              <SupervisorLayout />
            </ProtectedRoute>
          }
        >
          <Route
          index
          element={<Navigate to="/supervisor/overview" replace />}
          />
          <Route
          path="overview"
          element={<Overview />}
          />
          <Route
          path="report-defect"
          element={<ReportDefect />}
          />
          <Route
          path="room-matrix"
          element={<RoomMatrix />}
          />
        </Route>

        {/*  WORKER  */}
        <Route
        path="/worker"
        element={
            <ProtectedRoute allowedRoles={["worker"]}>
              <WorkerLayout />
            </ProtectedRoute>
          }
        >
          <Route
          index
          element={<Navigate to="/worker/my-tasks" replace />}
          />
          <Route
          path="my-tasks"
          element={<MyTasks />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;