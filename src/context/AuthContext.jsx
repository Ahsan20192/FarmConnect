// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");

//     if (storedToken) {
//       try {
//         const decoded = jwtDecode(storedToken);
//         setToken(storedToken);
//         setRole(decoded.role);
//         setIsAuthenticated(true);
//       } catch (err) {
//         console.error("Invalid token:", err);
//         logout();
//       }
//     } else {
//       logout();
//     }
//   }, []);

//   function login(newToken) {
//     try {
//       const decoded = jwtDecode(newToken);
//       localStorage.setItem("token", newToken);
//       setToken(newToken);
//       setRole(decoded.role);
//       setIsAuthenticated(true);
//     } catch (err) {
//       console.error("Invalid token on login:", err);
//     }
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     setToken(null);
//     setRole(null);
//     setIsAuthenticated(false);
//   }

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, token, role, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   return useContext(AuthContext);
// }

// export { AuthProvider, useAuth };
