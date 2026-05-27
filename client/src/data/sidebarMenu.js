// side bar menu by role

import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  ClipboardList,
  Briefcase,
  CheckSquare,
  Database,
  Server,
  Settings,
  Shield,
  Palette,
  FileText,
  LayoutGrid,
  Building2,
  Clock,
  Leaf,
  FileBarChart,
  UserCog,
  Bell,
  User,
  Calendar,
  BookOpen,
} from "lucide-react";

export const sidebarMenu = {
  admin: [
    {
      title: "Equipment Import",
      path: "/admin/equipment-import",
      icon: Database,
    },
    {
      title: "Equipment Registry",
      path: "/admin/equipment-registry",
      icon: Server,
    },
    {
      title: "User Management",
      path: "/admin/user-management",
      icon: Users,
    },
    {
      title: "System Settings",
      path: "/admin/system-settings",
      icon: Settings,
    },
    {
      title: "Audit Log",
      path: "/admin/audit-log",
      icon: Shield,
    },
    {
      title: "Customize Navigation",
      path: "/admin/customize-navigation",
      icon: Palette,
    },
    {
      title: "Report Defect",
      path: "/admin/report-defect",
      icon: AlertTriangle,
    },
    {
      title: "Daily Report",
      path: "/admin/daily-report",
      icon: FileText,
    },
    {
      title: "Room Matrix",
      path: "/admin/room-matrix",
      icon: LayoutGrid,
    },
    {
      title: "Public Area Matrix",
      path: "/admin/public-area-matrix",
      icon: Building2,
    },
    {
      title: "Attendance Roster",
      path: "/admin/attendance-roster",
      icon: Clock,
    },
    {
      title: "Attendance Settings",
      path: "/admin/attendance-settings",
      icon: Settings,
    },
    {
      title: "Checklists",
      path: "/admin/checklists",
      icon: CheckSquare,
    },
    {
      title: "Projects",
      path: "/admin/projects",
      icon: Briefcase,
    },
    {
      title: "Green Dashhboard",
      path: "/admin/green-dashboard",
      icon: Leaf,
    },
  ],

  manager: [
    {
      title: "Dashboard",
      path: "/manager/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Reports & Data",
      path: "/manager/report-data",
      icon: FileBarChart,
    },
    {
      title: "Worker Management",
      path: "/manager/worker-management",
      icon: UserCog,
    },
    {
      title: "Equipment Overview",
      path: "/manager/equipment-overview",
      icon: Server,
    },
    {
      title: "Notifications",
      path: "/manager/notifications",
      icon: Bell,
    },
    {
      title: "Report Defect",
      path: "/manager/report-defect",
      icon: AlertTriangle,
    },
    {
      title: "Daily Report",
      path: "/manager/daily-report",
      icon: FileText,
    },
    {
      title: "Room Matrix",
      path: "/manager/room-matrix",
      icon: LayoutGrid,
    },
    {
      title: "Public Area Matrix",
      path: "/manager/public-area-matrix",
      icon: Building2,
    },
    {
      title: "Attendance",
      path: "/manager/attendance",
      icon: Clock,
    },
    {
      title: "Projects",
      path: "/manager/projects",
      icon: Briefcase,
    },
    {
      title: "Checklists",
      path: "/manager/checklists",
      icon: CheckSquare,
    },
    {
      title: "Green Dashboard",
      path: "/manager/green-dashboard",
      icon: Leaf,
    },
  ],

  supervisor: [
    {
      title: "Overview",
      path: "/supervisor/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Team Overview",
      path: "/supervisor/team-overview",
      icon: User,
    },
    {
      title: "Delegate Tasks",
      path: "/supervisor/delegate-tasks",
      icon: Calendar,
    },
    {
      title: "Inspections",
      path: "/supervisor/inspections",
      icon: ClipboardList,
    },
    {
      title: "Report Defect",
      path: "/supervisor/report-defect",
      icon: AlertTriangle,
    },
    {
      title: "Daily report",
      path: "/supervisor/daily-report",
      icon: FileText,
    },
    {
      title: "Room Matrix",
      path: "/supervisor/room-matrix",
      icon: LayoutGrid,
    },
    {
      title: "Public Area Matrix",
      path: "/supervisor/public-area-matrix",
      icon: Building2,
    },
    {
      title: "Attendance Roster",
      path: "/supervisor/attendance-roster",
      icon: Clock,
    },
    {
      title: "Checklists",
      path: "/supervisor/checklists",
      icon: CheckSquare,
    },
    {
      title: "Projects",
      path: "/supervisor/projects",
      icon: Briefcase,
    },
    {
      title: "Green Dashboard",
      path: "/supervisor/green-dashboard",
      icon: Leaf,
    },
  ],

  worker: [
    {
      title: "My Tasks",
      path: "/worker/my-tasks",
      icon: ClipboardList,
    },
    {
      title: "History",
      path: "/worker/history",
      icon: Calendar,
    },
    {
      title: "Equipment",
      path: "/worker/equipment",
      icon: BookOpen,
    },
    {
      title: "Profile",
      path: "/worker/profile",
      icon: User,
    },
    {
      title: "Defect Queue",
      path: "/worker/defect-queue",
      icon: AlertTriangle,
    },
    {
      title: "Attendance",
      path: "/worker/attendance",
      icon: Clock,
    },
    {
      title: "Checklists",
      path: "/worker/checklists",
      icon: CheckSquare,
    },
    {
      title: "Projects",
      path: "/worker/projects",
      icon: Briefcase,
    },
  ],
}