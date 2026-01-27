import AuthorsCard from "./AuthorsCard";
import { Box, Grid, IconButton } from "@mui/material";
import authorsJson from "./authors.json";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


// sx == style

const AuthorsListPage = () => {
        const [authors, setAuthors] = useState([]);
        const { isAdmin } = useAuth();

    // спрацює тільки при першому рендері
    useEffect(() => {
        // тут знаходиться код який повинен спрацювати тільки один раз
        const localData = localStorage.getItem("authors");
        if (localData) {
            setAuthors(JSON.parse(localData));
        } else {
            setAuthors(authorsJson.authors);
            localStorage.setItem("authors", JSON.stringify(authorsJson.authors));
        }
    }, []);

    const deleteA = (id) => {
        const newList = authors.filter((b) => b.id !== id);
        setAuthors(newList);
        localStorage.setItem("authors", JSON.stringify(newList));
    };

    const setFavorite = (id, favorite) => {
        const newList = [...authors];
        const index = newList.findIndex((b) => b.id === id);
        if (index !== -1) {
            newList[index].isFavorite = favorite;
            setAuthors(newList);
            localStorage.setItem("authors", JSON.stringify(newList));
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
                {authors.map((a) => (
                    <Grid item size={3} key={a.id}>
                        <AuthorsCard 
                            author={a}
                            deleteCallback={deleteA}
                            favoriteCallback={setFavorite}
                        />
                    </Grid>
                ))}
                {isAdmin() && (
                    <Grid size={authors.length % 4 === 0 ? 12 : 3}>
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

export default AuthorsListPage;