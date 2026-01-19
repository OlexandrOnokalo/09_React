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
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const BookCard = ({ book, deleteCallback, favoriteCallback }) => {
    const [isFavorite, setIsFavorite] = useState(book.isFavorite);

    const setFavoriteHandle = () => {
        const favoriteState = !isFavorite
        setIsFavorite(favoriteState);
        favoriteCallback(book.id, favoriteState);
    }

    const deleteClickHandle = () => {
        deleteCallback(book.id);
    }

    return (
        <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src="https://knu.ua/img/kobzar.jpg"
                    ></Avatar>
                }
                action={
                    <IconButton onClick={deleteClickHandle} color="error" aria-label="settings">
                        <DeleteIcon />
                    </IconButton>
                }
                title={book.title}
                subheader={book.author}
            />
            <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="350"
                image={
                    book.cover_url
                        ? book.cover_url
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                }
                alt={book.title}
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
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default BookCard;
