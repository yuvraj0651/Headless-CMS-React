import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ allowedRole, children }) => {
    const { isAuthenticated, authData } = useSelector((state) => state.auth);

    console.log("isAuthenticated:", isAuthenticated);
    console.log("authData:", authData);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    const role = authData?.role?.trim().toLowerCase();

    if (!allowedRole.map(r => r.toLowerCase()).includes(role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
}

export default ProtectedRoutes;
