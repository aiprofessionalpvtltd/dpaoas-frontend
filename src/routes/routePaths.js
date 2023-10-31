import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";


export const NonProtectedRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <Dashboard /> },
];

export const ProtectedRoutes = [
    { path: "/", element: <Dashboard /> },
];