import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

// кастомний хук для доступу до AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    function login(user) {
        setIsAuth(true);
        setCurrentUser(user);
        setUserRole(user.role);
        localStorage.setItem("auth", JSON.stringify(user));
    }

    function logout() {
        setIsAuth(false);
        setCurrentUser(null);
        setUserRole(null);
        localStorage.removeItem("auth");
    }

    function register(email, password) {
        // Отримуємо список користувачів з localStorage
        const usersData = localStorage.getItem("users");
        let users = usersData ? JSON.parse(usersData) : [];

        // Перевіряємо чи користувач вже існує
        if (users.some(u => u.email === email)) {
            return { success: false, message: "Користувач з такою поштою вже існує" };
        }

        // Визначаємо роль: перший користувач - admin, решта - user
        const role = users.length === 0 ? "admin" : "user";

        // Створюємо нового користувача
        const newUser = {
            id: users.length + 1,
            email,
            password,
            role,
            createdAt: new Date().toISOString()
        };

        // Додаємо користувача до списку
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Автоматично логінимо користувача
        login(newUser);

        return { success: true, message: "Реєстрація успішна", user: newUser };
    }

    function loginUser(email, password) {
        const usersData = localStorage.getItem("users");
        const users = usersData ? JSON.parse(usersData) : [];

        // Шукаємо користувача з такою поштою та паролем
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: "Невірна пошта або пароль" };
        }

        login(user);
        return { success: true, message: "Вхід успішний", user };
    }

    function isAdmin() {
        return userRole === "admin";
    }

    return (
        <AuthContext.Provider value={{ 
            isAuth, 
            login, 
            logout, 
            register,
            loginUser,
            currentUser,
            userRole,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}