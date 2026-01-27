import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

const BookCard = ({ book, deleteCallback, favoriteCallback }) => {
    const [isFavorite, setIsFavorite] = useState(book.isFavorite);
    const [openDialog, setOpenDialog] = useState(false);
    const { isAdmin } = useAuth();

    const setFavoriteHandle = () => {
        const favoriteState = !isFavorite;
        setIsFavorite(favoriteState);
        favoriteCallback(book.id, favoriteState);
    };

    const deleteClickHandle = () => {
        deleteCallback(book.id);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, height: "100%", cursor: "pointer" }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            src="https://knu.ua/img/kobzar.jpg"
                        ></Avatar>
                    }
                    action={
                        isAdmin() && (
                            <IconButton
                                onClick={deleteClickHandle}
                                color="error"
                                aria-label="settings"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={book.title}
                    subheader={book.author}
                />
                <CardMedia
                    sx={{ objectFit: "contain", cursor: "pointer" }}
                    component="img"
                    height="350"
                    image={
                        book.cover_url
                            ? book.cover_url
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    }
                    alt={book.title}
                    onClick={handleOpenDialog}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {book.genre}, {book.year}р
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={setFavoriteHandle}
                        color={isFavorite ? "error" : ""}
                        aria-label="add to favorites"
                    >
                        <FavoriteIcon />
                    </IconButton>
                    {isAdmin() && (
                        <Link to={`update/${book.id}`}>
                            <IconButton color="success" aria-label="share">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    )}
                </CardActions>
            </Card>

            {/* Модальне вікно для перегляду інформації про книгу */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: "bold" }}>
                    {book.title}
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <CardMedia
                        component="img"
                        image={
                            book.cover_url
                                ? book.cover_url
                                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                        alt={book.title}
                        sx={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                    <div>
                        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
                            Автор:
                        </Typography>
                        <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                            {book.author}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
                            Жанр:
                        </Typography>
                        <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                            {book.genre}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
                            Рік видання:
                        </Typography>
                        <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                            {book.year}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                            Опис:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {book.description || "Опис відсутній"}
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained">
                        Закрити
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BookCard;