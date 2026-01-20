import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';


const AuthorsCard = ({ author, deleteCallback, favoriteCallback }) => {
    const [isFavorite, setIsFavorite] = useState(author.isFavorite);

    const setFavoriteHandle = () => {
        const favoriteState = !isFavorite
        setIsFavorite(favoriteState);
        favoriteCallback(author.id, favoriteState);
    }

    const deleteClickHandle = () => {
        deleteCallback(author.id);
    }    

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
                sx={{ objectFit: 'cover' }}
                component="img"
                height="350"
        image={author.image}
        title={author.lastName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {author.firstName} {author.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {author.country}, {author.birthday}
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
                <IconButton
                    onClick={deleteClickHandle}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
    </Card>
  );
};

export default AuthorsCard;
