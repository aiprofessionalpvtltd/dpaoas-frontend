import { Dashboard } from "../pages/Dashboard";
import EditRole from "../pages/EditRole";
import { Login } from "../pages/Login";
// import { Register } from "../pages/Register";
import AddRole from "../pages/addRole";


export const NonProtectedRoutes = [
    { path: "/login", element: <Login /> },
    // { path: "/register", element: <Register /> },

];

export const ProtectedRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "/AddRole", element: <AddRole /> },
    { path: "/EditRole", element: <EditRole /> },

];