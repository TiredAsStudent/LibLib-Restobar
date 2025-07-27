import {
  LayoutDashboard,
  ClipboardList,
  Utensils,
  Users,
  FileText,
  QrCode,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { name: "Menu", path: "/admin/menu", icon: <ClipboardList size={20} /> },
  { name: "Orders", path: "/admin/orders", icon: <Utensils size={20} /> },
  { name: "Reports", path: "/admin/reports", icon: <FileText size={20} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
  {
    name: "QR Management",
    path: "/admin/qr-management",
    icon: <QrCode size={20} />,
  },
];

export default navItems;
