import { useContext, useState, createContext, useEffect } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Define the provider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });
  useEffect(()=>
    {const data = localStorage.getItem('auth')
        if(data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [])
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use auth context
const useAuth = () => useContext(AuthContext);

// 4. Export
export { useAuth, AuthProvider };
