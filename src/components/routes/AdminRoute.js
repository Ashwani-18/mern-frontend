import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  // Redirect to /login if no token
  if (!auth?.token) return <Navigate to="/login" />;

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await api.get('/api/v1/auth/admin');
        if (res.data?.success) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log("AdminRoute Error:", error.response?.data || error.message);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
