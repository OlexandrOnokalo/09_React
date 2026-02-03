import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "0px auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

const initValues = {
    name: "",
    image: "",
    birthDate: "",
};

const AuthorsCreateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(newAuthor) {
        const authorsUrl = import.meta.env.VITE_AUTHORS_URL;

        const response = await axios.post(authorsUrl, {
            name: newAuthor.name,
            image: newAuthor.image,
            birthDate: new Date(newAuthor.birthDate).toISOString(),
        });
        if (response.status === 200) {
            // Отримуємо створеного автора з відповіді, якщо API повертає його
            const createdAuthor = response.data.data || { ...newAuthor, id: Date.now(), birth_date: newAuthor.birthDate };
            dispatch({ type: "createAuthor", payload: createdAuthor });
            navigate("/authors");
        }
    }

    const getError = (prop) => {
        return formik.touched[prop] && formik.errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {formik.errors[prop]}
            </Typography>
        ) : null;
    };

    // validation scheme
    const validationScheme = object({
        name: string()
            .required("Обов'язкове поле")
            .max(100, "Максимальна довжина 100 символів"),
        image: string().url("Невірний URL"),
        birthDate: string().required("Обов'язкове поле"),
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validationScheme,
    });

    return (
        <Box>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Додавання нового автора
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Ім'я</FormLabel>
                            <TextField
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Введіть ім'я автора"
                                autoComplete="name"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("name")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="image">Зображення</FormLabel>
                            <TextField
                                id="image"
                                type="url"
                                name="image"
                                placeholder="Введіть URL зображення"
                                autoComplete="image"
                                fullWidth
                                variant="outlined"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("image")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="birthDate">Дата народження</FormLabel>
                            <TextField
                                id="birthDate"
                                type="date"
                                name="birthDate"
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.birthDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("birthDate")}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!formik.isValid || !formik.dirty}
                        >
                            Додати
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </Box>
    );
};

export default AuthorsCreateForm;
