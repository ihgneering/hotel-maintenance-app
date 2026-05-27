import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { sidebarMenu } from "../data/sidebarMenu";
import Logo from "../assets/assetflow_logo.png"

function Sidebar({ role }) {

  const navigate = useNavigate();

  // get sidebarMenu.js
  const sideMenu = sidebarMenu[role] || []; 

  // role badge styling
  const roleBadge = {
    admin: {
      label: "Admin",
      bg: "bg-indigo-500",
      text: "text-white",
    },

    manager: {
      label: "Manager",
      bg: "bg-blue-100",
      text: "text-blue-700",
    },

    supervisor: {
      label: "Supervisor",
      bg: "bg-purple-100",
      text: "text-purple-700",
    },

    worker: {
      label: "Worker",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
  };

  const badge = roleBadge[role];

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside
      className="w-fit min-h-screen flex-col shadow-md"
    >
      
      <div className= "p-5 flex flex-col gap-y-2">
        <div className="flex items-center gap-3 mb-1">
          <img
            src={Logo}
            alt="logo"
            className="w-8 h-8 object-contain"
          /> 
          <div>
            <h1 className="text-xl font-bold hidden md:block">
              AssetFlow
            </h1>
          </div>
        </div>

        <span
          className={`
            text-xs py-2 px-3 rounded-full w-max 
            ${badge.bg}
            ${badge.text}
            ${badge.border}
          `}
        >
          {badge.label}
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sideMenu.map((menu, index) => {

          const Icon = menu.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(menu.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-medium text-sm hover:bg-gray-100"
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:block">
                {menu.title}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-medium text-sm hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium hidden md:block">
            Logout
          </span>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;