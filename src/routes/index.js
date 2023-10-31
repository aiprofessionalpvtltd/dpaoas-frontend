import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import { getAuthToken } from '../API/Auth';
import { NonProtectedRoutes, ProtectedRoutes } from './routePaths';
import { NotFound } from '../pages/NotFound';

function RequireAuth({ children }) {
//   const token = getAuthToken();
let token = null;
  return token ? children : <Navigate to="/login" replace />;
}

export const NavigationRoutes = () => {
  return (
    <BrowserRouter scrollRestoration="auto">
      <Routes>
        {NonProtectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {ProtectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<RequireAuth>{route.element}</RequireAuth>} />
        ))}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}