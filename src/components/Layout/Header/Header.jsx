import { useSelector } from "react-redux";

const Header = () => {

    const { authData, isAuthenticated } = useSelector((state) => state.auth);
    console.log(authData);

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">

                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                        S
                    </div>
                    <span className="hidden sm:block text-lg font-semibold text-slate-800">
                        ShopEase CMS
                    </span>
                </div>

                {/* Center: Search */}
                <div className="hidden md:flex flex-1 justify-center px-6">
                    <input
                        type="text"
                        placeholder="Search products, orders, users..."
                        className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Notification */}
                    <button className="relative rounded-lg p-2 hover:bg-slate-100">
                        🔔
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* User */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        {
                            authData?.fullName && isAuthenticated
                                ?
                                <div className="border border-[#ccc] size-[2.7rem] shadow-sm rounded-full flex items-center justify-center bg-indigo-200 text-indigo-600">
                                    <span>{authData?.fullName.split(" ")[0][0]}</span>
                                </div>
                                :
                                <img
                                    src="https://i.pravatar.cc/40"
                                    alt="user"
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                        }
                        <div className="hidden sm:block leading-tight">
                            <p className="text-sm font-medium text-slate-700">
                                {isAuthenticated ? authData?.fullName : "Admin User"}
                            </p>
                            <p className="text-xs text-slate-500 capitalize">
                                {isAuthenticated ? authData?.role : "Administration"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
