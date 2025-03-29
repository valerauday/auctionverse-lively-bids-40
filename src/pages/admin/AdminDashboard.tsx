
import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Gavel, 
  Flag, 
  BarChart, 
  Menu, 
  X, 
  UserCog 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AdminOverview from "./AdminOverview";
import AdminAuctions from "./AdminAuctions";
import AdminUsers from "./AdminUsers";
import AdminReports from "./AdminReports";
import AdminAuctionAnalytics from "./AdminAuctionAnalytics";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin",
    },
    {
      title: "Auctions",
      icon: <Gavel className="w-5 h-5" />,
      path: "/admin/auctions",
    },
    {
      title: "Users",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/users",
    },
    {
      title: "Reports",
      icon: <Flag className="w-5 h-5" />,
      path: "/admin/reports",
    },
    {
      title: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
      path: "/admin/analytics",
    },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-card shadow-md transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <UserCog className="h-8 w-8 text-auction-purple" />
          <h1 className="ml-2 text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-auction-purple text-white"
                  : "hover:bg-muted"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="container py-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/auctions" element={<AdminAuctions />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/reports" element={<AdminReports />} />
            <Route path="/analytics" element={<AdminAuctionAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
