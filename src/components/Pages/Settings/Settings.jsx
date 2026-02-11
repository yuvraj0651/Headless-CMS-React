import { useState } from 'react';
import ProfileSettings from "../Settings/Tabs/ProfileSettings";
import SecuritySettings from "../Settings/Tabs/SecuritySettings";
import ThemeSettings from "../Settings/Tabs/ThemeSettings";
import GeneralSettings from "../Settings/Tabs/GeneralSettings";
import SettingsSidebar from "../Settings/SettingsSidebar";

const Settings = () => {

    const [activeTab, setActiveTab] = useState("general");

    const renderTabs = () => {
        switch (activeTab) {
            case "profile": return <ProfileSettings />;
            case "security": return <SecuritySettings />;
            case "theme": return <ThemeSettings />;
            default: return <GeneralSettings />;
        }
    };

    return (
        <>
            <div className="flex min-h-screen bg-slate-100">
                <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex-1 p-6">{renderTabs()}</div>
            </div>
        </>
    )
}

export default Settings