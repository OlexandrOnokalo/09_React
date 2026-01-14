import "./App.css";
import Navbar from "./components/navbar/Navbar";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import BookListPage from "./pages/booksPage/BookListPage";
import AuthorsListPage from "./pages/authorsPage/AuthorsListPage";

function App() {
    return (
        <>
            <Navbar />
            {/* <BookListPage /> */}
            {/* <BookCreateForm /> */}
            <AuthorsListPage />
        </>
    );
}

export default App;
