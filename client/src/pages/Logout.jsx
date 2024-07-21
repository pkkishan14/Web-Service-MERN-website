import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
// import { toast } from "react-toastify";


export const Logout = () => {

const {LogoutUser} = useAuth();
// toast.success("Logout Successful");

    useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);


  return <Navigate to="/login" />
};