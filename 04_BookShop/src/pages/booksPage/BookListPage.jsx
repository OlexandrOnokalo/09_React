import BookCard from "./BookCard";
import BookCreateForm from "./BookCreateForm";
import books from "./books.json";
import { Box, Grid } from "@mui/material";

// sx == style

const BookListPage = () => {
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
                        <BookCard book={b}/>
                    </Grid>
                ))}
            </Grid>
            <BookCreateForm />
        </Box>
    );
};

export default BookListPage;
