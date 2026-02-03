import AuthorsCard from "./AuthorsCard";
import { Box, Grid, IconButton, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// sx == style
const AuthorsListPage = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useAuth();

    // отримання масиву авторів та стану завантаження
    const { authors, isLoaded } = useSelector((state) => state.author);

    async function fetchAuthors() {
        const authorsUrl = import.meta.env.VITE_AUTHORS_URL;
        const pageCount = 150;
        const page = 1;
        const url = `${authorsUrl}?page_size=${pageCount}&page=${page}`;

        if (!isLoaded) {
            const response = await axios.get(url);
            const { data, status } = response;
            if (status === 200) {
                const authorsData = data.data.items;
                // запис у store
                dispatch({ type: "loadAuthors", payload: authorsData });
            } else {
                console.log("Не вдалося завантажити авторів");
            }
        }
    }

    useEffect(() => {
        fetchAuthors();
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
                {authors.map((a, index) => (
                    <Grid size={4} key={index}>
                        <AuthorsCard author={a} />
                    </Grid>
                ))}
                {isAuth && user.role === "admin" && (
                    <Grid size={authors.length % 3 === 0 ? 12 : 4}>
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