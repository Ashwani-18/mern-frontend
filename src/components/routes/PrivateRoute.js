import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
<<<<<<< HEAD
        const res = await axios.get("/api/v1/auth/user", {
=======
        const res = await axios.get("http://localhost:8000/api/v1/auth/user", {
>>>>>>> e10729d50dfc479f605fe8743b2bde91e772e95e
          headers: {
            Authorization: `Bearer ${auth?.token}`, // ✅ send token here
          },
        });
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
