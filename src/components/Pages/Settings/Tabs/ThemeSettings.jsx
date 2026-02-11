import { useDispatch } from "react-redux";
import { updateSettings } from "../../../API/SettingsThunk";

const ThemeSettings = () => {
    const dispatch = useDispatch();

    const changeTheme = (mode) => {
        dispatch(updateSettings({ theme: mode }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>

            <div className="flex gap-4">
                <button
                    onClick={() => changeTheme("light")}
                    className="px-5 py-2 bg-slate-200 rounded-lg"
                >
                    Light
                </button>

                <button
                    onClick={() => changeTheme("dark")}
                    className="px-5 py-2 bg-slate-800 text-white rounded-lg"
                >
                    Dark
                </button>
            </div>
        </div>
    );
};

export default ThemeSettings;
