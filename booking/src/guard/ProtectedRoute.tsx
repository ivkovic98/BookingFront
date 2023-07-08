import React, { FC } from "react";
import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: any;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ authenticationPath, outlet }) => {
  return localStorage.getItem("token") ? outlet : <Navigate to={{ pathname: authenticationPath }} />;
};

export default ProtectedRoute;
