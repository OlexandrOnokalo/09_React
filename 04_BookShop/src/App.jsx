import "./App.css";
import Navbar from "./components/navbar/Navbar";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import BookListPage from "./pages/booksPage/BookListPage";
import AuthorsListPage from "./pages/authorsPage/AuthorsListPage";
import AuthorsCreateForm from "./pages/authorsPage/AuthorsCreateForm";

function App() {
    return (
        <>
            <Navbar />
            {/* <BookListPage />
            <BookCreateForm /> */}
            <AuthorsListPage />
            <AuthorsCreateForm />
        </>
    );
}

export default App;
