import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await api.get('/api/v1/auth/user');
        if (res.data?.success) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (!auth?.token) return <Navigate to="/login" />;
  return ok ? <Outlet /> : <Spinner />;
}
