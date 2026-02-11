import { Outlet } from "react-router";
import CmsSidebar from "../../UI/Sidebar/Sidebar";

const Home = () => {
    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <CmsSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Home;
