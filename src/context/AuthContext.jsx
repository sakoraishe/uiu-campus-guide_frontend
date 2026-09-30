import { createContext, useContext, useState } from "react";
const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    isLoggedIn: false,
});
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("uiu_auth");
            return stored ? JSON.parse(stored) : null;
        }
        catch {
            return null;
        }
    });
    const login = (u) => {
        setUser(u);
        localStorage.setItem("uiu_auth", JSON.stringify(u));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("uiu_auth");
    };
    return (<AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    return useContext(AuthContext);
}
