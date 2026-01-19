import "./App.css";
import Navbar from "./components/navbar/Navbar";
import BookListPage from "./pages/booksPage/BookListPage";
import AuthorListPage from "./pages/authorsPage/AuthorsListPage";
import AuthorsCreateForm from "./pages/authorsPage/AuthorsCreateForm";
import { Routes, Route } from "react-router";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import MainPage from "./pages/mainPage/MainPage";

function App() {
    return (
        <>
            <Navbar />

            {/* Маршрути */}
            <Routes>
                <Route path="/" element={<MainPage />} />

                {/* books */}
                <Route path="/books" element={<BookListPage />} />
                <Route path="/bookcreate" element={<BookCreateForm />} />

                {/* authors */}
                <Route path="/authors" element={<AuthorListPage />} />
                <Route path="/authorcreate" element={<AuthorsCreateForm />} />

                {/* Якщо вказано шлях якого не існує */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
