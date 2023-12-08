import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NonProtectedRoutes, ProtectedRoutes } from "./routePaths";
import { NotFound } from "../pages/NotFound";
import { getAuthToken } from "../api/Auth";
import { AuthContext } from "../api/AuthContext";

function RequireAuth({ children }) {
  // const token = getAuthToken();
  let token = "hshsh";
  return token ? children : <Navigate to="/login" replace />;
}

export const NavigationRoutes = () => {
  const { userLoginToken } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {NonProtectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {ProtectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<RequireAuth>{route.element}</RequireAuth>}
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
