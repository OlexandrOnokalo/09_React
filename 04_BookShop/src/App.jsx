import "./App.css";
import Navbar from "./components/navbar/Navbar";
import BookListPage from "./pages/booksPage/BookListPage";
import AuthorListPage from "./pages/authorsPage/AuthorsListPage";
import AuthorsCreateForm from "./pages/authorsPage/AuthorsCreateForm";
import { Routes, Route } from "react-router";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import MainPage from "./pages/mainPage/MainPage";
import Footer from "./components/footer/Footer";
import DefaultLayout from "./components/layouts/DefaultLayout";
import BookUpdateForm from "./pages/booksPage/BookUpdateForm";
import AuthorUpdateForm from "./pages/authorsPage/AuthorUpdateForm";

function App() {
    return (
        <>
            {/* Маршрути */}
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainPage />} />

                    {/* books */}
                    <Route path="books">
                        <Route index element={<BookListPage />} />
                        <Route path="create" element={<BookCreateForm />} />
                        <Route path="update/:id" element={<BookUpdateForm />} />
                    </Route>

                    {/* authors */}

                    <Route path="authors">
                        <Route index element={<AuthorListPage />} />
                        <Route path="create" element={<AuthorsCreateForm />} />
                        <Route path="update/:id" element={<AuthorUpdateForm />} />
                    </Route>

                    {/* Якщо вказано шлях якого не існує */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
