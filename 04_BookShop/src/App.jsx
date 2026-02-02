import "./App.css";
import BookListPage from "./pages/booksPage/BookListPage";
import AuthorListPage from "./pages/authorsPage/AuthorsListPage";
import AuthorsCreateForm from "./pages/authorsPage/AuthorsCreateForm";
import { Routes, Route } from "react-router";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import MainPage from "./pages/mainPage/MainPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import BookUpdateForm from "./pages/booksPage/BookUpdateForm";
import LoginPage from "./pages/auth/loginPage/LoginPage";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme/lightTheme";
import { darkTheme } from "./theme/darkTheme";

function App() {
    const { isAuth, login } = useAuth();

    // auth
    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            login();
        }
    }, []);

    // theme
    const [isDark, setIsDark] = useState(false);

    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                {/* Маршрути */}
                <Routes>
                    <Route path="/" element={<DefaultLayout setIsDark={setIsDark} isDark={isDark} />}>
                        <Route index element={<MainPage />} />

                        {/* books */}
                        <Route path="books">
                            <Route index element={<BookListPage />} />
                            <Route path="create" element={<BookCreateForm />} />
                            <Route
                                path="update/:id"
                                element={<BookUpdateForm />}
                            />
                        </Route>

                        {/* authors */}

                        <Route path="authors">
                            <Route index element={<AuthorListPage />} />
                            <Route
                                path="create"
                                element={<AuthorsCreateForm />}
                            />
                        </Route>

                        {/* auth */}

                        {/* if(!isAuth){ retun <Route/> } */}

                        {!isAuth && (
                            <Route path="login" element={<LoginPage />} />
                        )}

                        {/* Якщо вказано шлях якого не існує */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
