import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import booksJson from "./books.json";
import { Box, Grid, IconButton, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";
import axios from "axios";

// sx == style
const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchBooks() {
        const baseUrl = "https://api.bigbookapi.com/search-books";
        const apiKey = "c1f49f3322114f2db440d348114e1a0e";
        const pageCount = 15;
        const url = `${baseUrl}?min-rating=0.5&number=${pageCount}&api-key=${apiKey}`;

        const response = await axios.get(url);
        const { data, status } = response;
        if (status === 200) {
            const booksData = [];
            for (const [book] of data.books) {
                const formated = {
                    id: book.id,
                    title: book.title,
                    author: book.authors[0].name,
                    cover_url: book.image,
                    rating: book.rating.average,
                    isFavorite: false,
                };
                booksData.push(formated);
            }
            setBooks(booksData);
            setLoading(false);
            localStorage.setItem("books", JSON.stringify(booksData));
        } else {
            console.log("Не вдалося завантажити книги");
        }
    }

    useEffect(() => {
        const localData = localStorage.getItem("books");
        if (localData) {
            setBooks(JSON.parse(localData));
            setLoading(false);
        } else {
            // запит на API
            fetchBooks();
        }
    }, []);

    const deleteBook = (id) => {
        const newList = books.filter((b) => b.id !== id);
        setBooks(newList);
        localStorage.setItem("books", JSON.stringify(newList));
    };

    const setFavorite = (id, favorite) => {
        const newList = [...books];
        const index = newList.findIndex((b) => b.id === id);
        if (index !== -1) {
            newList[index].isFavorite = favorite;
            setBooks(newList);
            localStorage.setItem("books", JSON.stringify(newList));
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress enableTrackSlot size="3rem" sx={{ mt: 4 }} />;
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={2} mx="100px" my="50px">
                {books.map((b) => (
                    <Grid size={4} key={b.id}>
                        <BookCard
                            book={b}
                            deleteCallback={deleteBook}
                            favoriteCallback={setFavorite}
                        />
                    </Grid>
                ))}
                <Grid size={books.length % 3 === 0 ? 12 : 4}>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <Link to="create">
                            <IconButton color="secondary">
                                <AddCircleIcon sx={{ fontSize: "3em" }} />
                            </IconButton>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BookListPage;
