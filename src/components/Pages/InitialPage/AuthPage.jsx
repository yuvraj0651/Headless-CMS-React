import { useEffect, useRef, useState } from "react";
import AuthHeader from "./AuthHeader";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../API/AuthThunk";
import { useNavigate } from "react-router";

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        role: "admin",
    });
    const [loginErrors, setLoginErrors] = useState({});
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "admin",
    });
    const [registerErrors, setRegisterErrors] = useState({});
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputRef = useRef();

    useEffect(() => {
        if (activeTab === "login" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeTab]);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setLoginErrors({ ...loginErrors, [name]: "" });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
        setRegisterErrors({ ...registerErrors, [name]: "" });
    };

    const toggleLoginPassword = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    const toggleRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };

    const isEmpty = (value) => {
        return !value || value.trim() === "";
    };

    const isValidEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isStrongPassword = (password) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateLogin = (data) => {
        const errors = {};

        if (isEmpty(data.email)) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Enter a valid email address";
        }

        if (isEmpty(data.password)) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (isEmpty(data.role)) {
            errors.role = "Please select a role";
        }

        return errors;
    };

    const validateRegister = () => {
        const errors = {};

        if (isEmpty(registerData.fullName)) {
            errors.fullName = "Full name is required";
        } else if (registerData.fullName.length < 3) {
            errors.fullName = "Full name must be at least 3 characters";
        }

        if (isEmpty(registerData.email)) {
            errors.email = "Email is required";
        } else if (!isValidEmail(registerData.email)) {
            errors.email = "Enter a valid email address";
        }

        if (isEmpty(registerData.password)) {
            errors.password = "Password is required";
        } else if (!isStrongPassword(registerData.password)) {
            errors.password =
                "Password must have uppercase, lowercase & number (min 8 chars)";
        }

        if (isEmpty(registerData.role)) {
            errors.role = "Please select a role";
        }

        return errors;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const loginValidation = validateLogin(loginData);
        setLoginErrors(loginValidation);

        if (Object.keys(loginValidation).length === 0) {
            dispatch(loginUser(loginData))
                .unwrap()
                .then(() => {
                    alert("Logged In Successfully");

                    setTimeout(() => {
                        navigate("/home");
                    }, 500);

                }).catch((error) => {
                    alert(error);
                })

            setLoginData({
                email: "",
                password: "",
            });
            setLoginErrors({});
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const registerValidation = validateRegister();
        setRegisterErrors(registerValidation);

        if (Object.keys(registerValidation).length === 0) {
            dispatch(registerUser(registerData))
                .unwrap()
                .then(() => {
                    alert("Registered Successfully");
                }).catch((error) => {
                    alert(error);
                })

            setRegisterData({
                fullName: "",
                email: "",
                password: "",
                role: "admin",
            });
            setRegisterErrors({});
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
            <div className="w-full max-h-[30rem] overflow-y-auto max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                <AuthHeader />

                <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
                    <button
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${activeTab === "login"
                            ? "bg-white shadow text-indigo-600"
                            : "text-slate-500"
                            }`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>

                    <button
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${activeTab === "register"
                            ? "bg-white shadow text-indigo-600"
                            : "text-slate-500"
                            }`}
                        onClick={() => setActiveTab("register")}
                    >
                        Register
                    </button>
                </div>

                {activeTab === "login" && (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-600">
                                Email
                            </label>
                            <input
                                type="email"
                                ref={inputRef}
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                placeholder="admin@shopease.com"
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {
                                loginErrors.email && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{loginErrors.email}</p>
                                )
                            }
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-slate-600">
                                Password
                            </label>
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {
                                loginErrors.password && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{loginErrors.password}</p>
                                )
                            }
                            <span
                                onClick={toggleLoginPassword}
                                className="absolute top-[2.2rem] right-3 capitalize tracking-wide font-[600] text-indigo-600 text-[0.9rem] cursor-pointer">
                                {showLoginPassword ? "hide" : "show"}
                            </span>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-600">
                                Role
                            </label>
                            <select
                                name="role"
                                value={loginData.role}
                                onChange={handleLoginChange}
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm bg-white">
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="editor">Editor</option>
                            </select>
                            {
                                loginErrors.role && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{loginErrors.role}</p>
                                )
                            }
                        </div>

                        <div className="flex justify-end">
                            <button className="text-sm text-indigo-600 hover:underline">
                                Forgot password?
                            </button>
                        </div>

                        <button className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 transition">
                            Login
                        </button>
                    </form>
                )}

                {activeTab === "register" && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={registerData.fullName}
                                onChange={handleRegisterChange}
                                placeholder="John Doe"
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {
                                registerErrors.fullName && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{registerErrors.fullName}</p>
                                )
                            }
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-600">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                placeholder="john@shopease.com"
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {
                                registerErrors.email && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{registerErrors.email}</p>
                                )
                            }
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-slate-600">
                                Password
                            </label>
                            <input
                                type={showRegisterPassword ? "text" : "password"}
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {
                                registerErrors.password && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{registerErrors.password}</p>
                                )
                            }
                            <span
                                onClick={toggleRegisterPassword}
                                className="absolute top-[2.2rem] right-3 capitalize tracking-wide font-[600] text-indigo-600 text-[0.9rem] cursor-pointer">
                                {showRegisterPassword ? "hide" : "show"}
                            </span>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-600">
                                Role
                            </label>
                            <select
                                name="role"
                                value={registerData.role}
                                onChange={handleRegisterChange}
                                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm bg-white">
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="editor">Editor</option>
                            </select>
                            {
                                registerErrors.role && (
                                    <p className="my-1 pl-2 text-[0.8rem] tracking-wide text-red-700">*{registerErrors.role}</p>
                                )
                            }
                        </div>

                        <button className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 transition">
                            Create Account
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-xs text-slate-500">
                    © 2026 ShopEase CMS. All rights reserved.
                </p>
            </div>
        </section >
    );
};

export default AuthPage;
