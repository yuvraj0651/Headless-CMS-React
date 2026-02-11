import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, updateSettings } from "../../../API/SettingsThunk";
import { resetStatus } from "../../../API/SettingsThunk";

const GeneralSettings = () => {
    const dispatch = useDispatch();
    const { settingsData, loading, success } = useSelector((state) => state.settings);

    const [formData, setFormData] = useState({
        siteName: "",
        email: "",
    });

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settingsData) {
            setFormData({
                siteName: settingsData.siteName || "",
                email: settingsData.email || "",
            });
        }
    }, [settingsData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSettings(formData));
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(resetStatus());
            }, 2000);
        }
    }, [success, dispatch]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">General Settings</h3>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Site Name</label>
                    <input
                        type="text"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Admin Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                {success && (
                    <p className="text-green-600 text-sm mt-2">
                        Settings updated successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default GeneralSettings;
