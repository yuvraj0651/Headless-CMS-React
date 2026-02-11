import { useDispatch, useSelector } from "react-redux";
import RecentOrders from "./RecentOrders"
import StatCards from "./StatCards";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { fetchDashboardData } from "../../API/DashboardThunk";
import { fetchAllOrders } from "../../API/OrdersThunk";

const Dashboard = () => {

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();

    // Section Refs 
    const lineChartRef = useRef();
    const pieChartRef = useRef();
    const barChartRef = useRef();

    console.log("lineChartRef:", lineChartRef.current);
    console.log("pieChartRef:", pieChartRef.current);
    console.log("barChartRef:", barChartRef.current);

    useEffect(() => {
        dispatch(fetchDashboardData())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllOrders());
    },[dispatch]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchDashboardData());
        }, 500);
    }, [dispatch]);

    const { stats, categories, orders, isLoading } = useSelector((state) => state.dashboard);
    const { ordersData } = useSelector((state) => state.orders);

    useEffect(() => {
        if (isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (lineChartRef.current) observer.observe(lineChartRef.current);
        if (pieChartRef.current) observer.observe(pieChartRef.current);
        if (barChartRef.current) observer.observe(barChartRef.current);

        return () => observer.disconnect();
    }, [isLoading]);

    if (isLoading) {
        return (
            <p>Loading Dashboard</p>
        )
    }

    const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                    Overview of your store performance
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCards title="Total Orders" value={ordersData.length} visible={visible} />
                <StatCards title="Revenue" value={485000} visible={visible} />
                <StatCards title="Products" value="320" visible={visible} />
                <StatCards title="Customers" value="980" visible={visible} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Line Chart Card */}
                <div className={`bg-white rounded-xl p-4 shadow-sm lg:col-span-2 transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} ref={lineChartRef}>
                    <h2 className="text-sm font-semibold mb-4">
                        Sales Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#6366F1"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart Card */}
                <div className={`bg-white rounded-xl p-4 shadow-sm transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} ref={pieChartRef}>
                    <h2 className="text-sm font-semibold mb-4">
                        Category Share
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categories}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                label
                            >
                                {categories.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
            <div className={`bg-white rounded-xl p-4 shadow-sm transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} ref={barChartRef}>
                <h2 className="text-sm font-semibold mb-4">
                    Monthly Users
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#22C55E" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <RecentOrders orders={orders} />
        </div>
    )
}

export default Dashboard