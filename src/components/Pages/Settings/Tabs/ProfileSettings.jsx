const ProfileSettings = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                    type="file"
                    className="w-full border px-3 py-2 rounded-lg"
                />

                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
