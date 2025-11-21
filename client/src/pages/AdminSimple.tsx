import { useLocation } from "wouter";
import AdminDashboard from "./AdminDashboard";
import AdminLoans from "./AdminLoans";
import AdminUsers from "./AdminUsers";
import AdminContact from "./AdminContact";

export default function AdminSimple() {
  const [location] = useLocation();

  if (location === "/admin" || location === "/admin/") {
    return <AdminDashboard />;
  }

  if (location.startsWith("/admin/loans")) {
    return <AdminLoans />;
  }

  if (location.startsWith("/admin/users")) {
    return <AdminUsers />;
  }

  if (location.startsWith("/admin/contact")) {
    return <AdminContact />;
  }

  // Default fallback to dashboard
  return <AdminDashboard />;
}
