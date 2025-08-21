// import React from 'react'

// import { createContext, useState } from "react";

// // Context create karo
// const UserContext = createContext<any>(null);

// interface UserProviderProps {
//   // children: ReactNode;
// }

// // Provider component
// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken]=useState(null)

//   return (
//     <UserContext.Provider value={{ user, token, setUser,setToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;









// import { createContext, useState, ReactNode, useEffect } from "react";

// // Context ka type (aap TS use kar rahe ho to helpful hoga)
// interface UserContextType {
//   user: any;
//   token: string | null;
//   setUser: (user: any) => void;
//   setToken: (token: string | null) => void;
// }

// // Context create
// const UserContext = createContext<UserContextType | null>(null);

// interface UserProviderProps {
//   children: ReactNode;
// }

// // Provider component
// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // ✅ Page refresh hone par token localStorage se wapas load hoga
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, token, setUser, setToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;






import { createContext, useState, useEffect  } from "react";
import Instance from "../Axios.ts";
import { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // 🔹 Function: Login & Save Token
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser(newToken);
  };

  // 🔹 Function: Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // 🔹 Fetch User Data
  const fetchUser = async (authToken: string) => {
    try {
      const res = await Instance.get("/user/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("❌ Failed to fetch user:", err);
      logout();
    }
  };

  // 🔹 Auto-fetch if token exists
  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
