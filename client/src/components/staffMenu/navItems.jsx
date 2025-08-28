import {
  ClipboardList,
  CreditCard,
  Utensils,
  Armchair,
  Bell,
} from "lucide-react";

const staffNavItems = [
  { name: "Menu", path: "/staff/menu", icon: <ClipboardList size={20} /> },
  {
    name: "Payments",
    path: "/staff/menu/payments",
    icon: <CreditCard size={20} />,
  },
  { name: "Orders", path: "/staff/menu/orders", icon: <Utensils size={20} /> },
  {
    name: "Table Management",
    path: "/staff/menu/table-management",
    icon: <Armchair size={20} />,
  },
  {
    name: "Notifications",
    path: "/staff/menu/notifications",
    icon: <Bell size={20} />,
  },
];

export default staffNavItems;
