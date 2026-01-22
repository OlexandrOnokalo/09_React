import { Container } from "@mui/material";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router";

const DefaultLayout = () => {
    return (
        <>
            <Navbar />
            <Container sx={{minHeight: "100vh"}}>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default DefaultLayout;
