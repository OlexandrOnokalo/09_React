import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

// кастомний хук для доступу до AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);

    function login() {
        setIsAuth(true);
    }

    function logout() {
        setIsAuth(false);
        localStorage.removeItem("auth");
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}