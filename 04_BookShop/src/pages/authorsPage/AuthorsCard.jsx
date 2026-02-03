import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { date } from 'yup';


const AuthorsCard = ({ author }) => {
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
    </Card>
  );
};

export default AuthorsCard;
