import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "../../utils/api";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/user');
        if (res.data?.success) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log("PrivateRoute Error:", error.response?.data || error.message);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
