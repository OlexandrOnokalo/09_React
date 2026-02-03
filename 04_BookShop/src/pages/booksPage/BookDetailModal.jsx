import { useState, useEffect } from 'react';
import { Modal, Box, Typography, CircularProgress, Rating } from '@mui/material';
import axios from 'axios';

const BookDetailModal = ({ open, onClose, bookId }) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (bookId && open) {
            setLoading(true);
            axios.get(`https://api.bigbookapi.com/${bookId}?api-key=69c8d45d68014ecb88c8b9f153a35285`)
                .then(response => {
                    setBook(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [bookId, open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '80vh', overflow: 'auto' }}>
                {loading ? <CircularProgress /> : book ? (
                    <>
                        <Typography variant="h6">{book.title}</Typography>
                        <img src={book.image} alt={book.title} style={{ width: '100%', marginBottom: 2 }} />
                        <Typography>Автор: {book.authors?.[0]?.name}</Typography>
                        <Typography>К-сть сторінок: {book.number_of_pages}</Typography>
                        <Typography>Рік публікації: {Math.floor(book.publish_date)}</Typography>
                        <Typography>Опис: {book.description}</Typography>
                        <Rating readOnly max={10} value={Math.round(book.rating?.average * 10)} />
                    </>
                ) : <Typography>Не вдалося завантажити дані</Typography>}
            </Box>
        </Modal>
    );
};

export default BookDetailModal;