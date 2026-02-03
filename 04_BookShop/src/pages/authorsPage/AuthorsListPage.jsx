import AuthorsCard from "./AuthorsCard";
import { Box, Grid } from "@mui/material";
import authors from "./authors.json";

// sx == style

const AuthorsListPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={2} mx="100px" my="50px">
                {authors.authors.map((a) => (
                    <Grid item size={4} key={a.id}>
                        <AuthorsCard author={a} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AuthorsListPage;