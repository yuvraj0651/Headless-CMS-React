import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../API/AuthThunk";

const UnAuthorizedPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        setTimeout(() => {
            navigate("/")
        }, 400);
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
            <div className="max-w-xl text-center">
                {/* Illustration */}
                <div className="mb-8">
                    <svg
                        className="w-48 h-48 mx-auto text-red-400 animate-bounce"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                        />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-bold text-red-600 mb-4">
                    Unauthorized Access
                </h1>

                {/* Subtext */}
                <p className="text-red-700 text-lg mb-6">
                    Oops! You don’t have permission to view this page. Please contact your administrator if you think this is a mistake or get access from admin.
                </p>

                {/* Action Button */}
                <button
                    onClick={logoutHandler}
                    className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition transform"
                >
                    Logout
                </button>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-sm text-red-400">
                © 2026 ShopEase CMS. All rights reserved.
            </footer>
        </section>
    );
};

export default UnAuthorizedPage;
