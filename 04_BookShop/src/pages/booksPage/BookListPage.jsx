import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import booksJson from "./books.json";
import { Box, Grid, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";

// sx == style
const BookListPage = () => {
    const [books, setBooks] = useState([]);

    // спрацює тільки при першому рендері
    useEffect(() => {
        // тут знаходиться код який повинен спрацювати тільки один раз
        const localData = localStorage.getItem("books");
        if (localData) {
            setBooks(JSON.parse(localData));
        } else {
            setBooks(booksJson);
            localStorage.setItem("books", JSON.stringify(booksJson));
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
                    <Grid size={3} key={b.id}>
                        <BookCard
                            book={b}
                            deleteCallback={deleteBook}
                            favoriteCallback={setFavorite}
                        />
                    </Grid>
                ))}
                <Grid size={books.length % 4 === 0 ? 12 : 3}>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <Link to="/bookcreate">
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
