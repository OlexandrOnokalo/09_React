import "./App.css";
import Navbar from "./components/navbar/Navbar";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import BookListPage from "./pages/booksPage/BookListPage";

function App() {
    return (
        <>
            <Navbar />
            <BookListPage />
            {/* <BookCreateForm /> */}
        </>
    );
}

export default App;
