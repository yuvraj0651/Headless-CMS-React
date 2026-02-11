import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../API/AuthThunk";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";

const CmsSidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [openSettings, setOpenSettings] = useState(
        location.pathname.includes("settings")
    );

    const logoutHandler = () => {
        dispatch(logout());

        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <aside className="hidden lg:flex w-64 flex-col border-r bg-white">

            {/* Logo / Brand */}
            <div className="h-16 flex items-center px-6 border-b">
                <h1 className="text-xl font-bold text-slate-800">
                    ShopEase <span className="text-indigo-600">CMS</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 text-sm">

                <SidebarItem
                    to="/home"
                    icon={<LayoutDashboard size={18} />}
                    label="Dashboard"
                    end
                />
                <SidebarItem
                    to="/home/products"
                    icon={<Package size={18} />}
                    label="Products"
                />
                <SidebarItem
                    to="/home/orders"
                    icon={<ShoppingCart size={18} />}
                    label="Orders"
                />
                <SidebarItem
                    icon={<Users size={18} />}
                    label="Customers"
                    to="/home/customers"
                />
                <div>
                    <NavLink
                        to="/home/settings"
                        onClick={() => setOpenSettings(!openSettings)}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg px-4 py-2 transition
                        ${location.pathname.includes("settings")
                                ? "bg-indigo-50 text-indigo-600 font-medium"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Settings size={18} />
                            Settings
                        </div>
                    </NavLink>
                </div>
                <SidebarItem
                    icon={<BarChart3 size={18} />}
                    label="Analytics"
                    to="/home/analytics"
                />
            </nav>

            {/* Logout */}
            <div className="border-t px-4 py-4">
                <button
                    onClick={logoutHandler}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default CmsSidebar;

const SidebarItem = ({ icon, label, to, end }) => {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-4 py-2 transition
    ${isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
            }
        >
            {icon}
            {label}
        </NavLink>
    );
};

const SubItem = ({ to, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm transition
                ${isActive
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
            }
        >
            {label}
        </NavLink>
    );
};
