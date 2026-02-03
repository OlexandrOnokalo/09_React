import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AuthorsCard = ({ author }) => {
    const dispatch = useDispatch();

    const deleteClickHandle = async () => {
        const authorsUrl = import.meta.env.VITE_AUTHORS_URL;
        try {
            await axios.delete(`${authorsUrl}/${author.id}`);
            dispatch({ type: "deleteAuthor", payload: author.id });
        } catch (error) {
            console.log(error);
        }
    };

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
                    <IconButton
                        onClick={deleteClickHandle}
                        color="error"
                        aria-label="settings"
                    >
                        <DeleteIcon />
                    </IconButton>
                }
                title={author.name}
                subheader={author.birth_date}
            />
            <CardMedia
                sx={{ objectFit: 'cover' }}
                component="img"
                height="350"
                image={author.image}
                title={author.name}
            />
            <CardActions disableSpacing>
                <Link to={`update/${author.id}`}>
                    <IconButton color="success" aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
            </CardActions>
        </Card>
    );
};

export default AuthorsCard;
