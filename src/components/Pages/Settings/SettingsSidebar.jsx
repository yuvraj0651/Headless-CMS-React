const tabs = [
    { id: "general", label: "General" },
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "theme", label: "Theme" },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-64 bg-white border-r">
            <h2 className="p-4 font-semibold">Settings</h2>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 text-sm
            ${activeTab === tab.id
                            ? "bg-indigo-50 text-indigo-600"
                            : "hover:bg-slate-100"}`}
                >
                    {tab.label}
                </button>
            ))}
        </aside>
    );
};

export default SettingsSidebar;
