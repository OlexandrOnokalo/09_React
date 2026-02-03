import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import booksJson from "./books.json";
import { Box, Grid, IconButton, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
// dispatch - для запису у store
// useSelector - для отримання із store

// sx == style
const BookListPage = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useAuth();

    // отримання масиву книг та стану завантаження
    const { books, isLoaded } = useSelector((state) => state.book);



    async function fetchBooks() {
        const booksUrl = import.meta.env.VITE_BOOKS_URL;
        const pageCount = 150;
        const page = 1;
        const url = `${booksUrl}?page_size=${pageCount}&page=${page}`;

        if (!isLoaded) {
            const response = await axios.get(url);
            const { data, status } = response;
            if (status === 200) {
                const booksData = [];
                for (const book of data.data.items) {
                    const formated = {
                        ...book,
                        author: book.author ? book.author.name : "невідомий",
                        isFavorite: false,
                    };
                    booksData.push(formated);
                }
                // запис у store
                dispatch({ type: "loadBooks", payload: booksData });
                // localStorage.setItem("books", JSON.stringify(booksData));
            } else {
                console.log("Не вдалося завантажити книги");
            }
        }
    }

    useEffect(() => {

        fetchBooks();
    }, []);

    if (!isLoaded) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress enableTrackSlot size="3rem" sx={{ mt: 4 }} />
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
                {books.map((b, index) => (
                    <Grid size={4} key={index}>
                        <BookCard book={b} />
                    </Grid>
                ))}
                {isAuth && user.role === "admin" && (
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
                )}
            </Grid>
        </Box>
    );
};

export default BookListPage;
