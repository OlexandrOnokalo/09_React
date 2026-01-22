import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

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
    minHeight: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
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

const AuthorUpdateForm = () => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        birthday: "", // Initialize as an empty string
        country: "",
        image: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const localData = localStorage.getItem("authors");
        if (localData) {
            const authors = JSON.parse(localData);
            const author = authors.find((a) => a.id == id);
            if (!author) {
                navigate("/authors", { replace: true });
            }
            setFormValues({
                ...author,
                birthday: author.birthday ? new Date(author.birthday).toISOString().split('T')[0] : "",
            });
        } else {
            navigate("/authors", { replace: true });
        }
    }, []);

    function onChangeHandle(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    function validate() {
        const validateErrors = {};
        let result = true;


        if (formValues.firstName.length === 0) {
            validateErrors.firstName = "Обов'язкове поле";
            result = false;
        } else if (formValues.firstName.length > 100) {
            validateErrors.firstName = "Максимальна довжина 100 символів";
            result = false;
        }

        if (formValues.lastName.length === 0) {
            validateErrors.lastName = "Обов'язкове поле";
            result = false;
        } else if (formValues.lastName.length > 100) {
            validateErrors.lastName = "Максимальна довжина 100 символів";
            result = false;
        }



        // birthday
        if (formValues.birthday) {
            const birthdayDate = new Date(formValues.birthday);
            const today = new Date();
            if (isNaN(birthdayDate.getTime())) {
                validateErrors.birthday = "Невірний формат дати";
                result = false;
            } else if (birthdayDate > today) {
                validateErrors.birthday = "День народження не може бути в майбутньому";
                result = false;
            }
        } else {
            validateErrors.birthday = "Обов'язкове поле";
            result = false;
        }


        if (formValues.country.length === 0) {
            validateErrors.country = "Обов'язкове поле";
            result = false;
        } else if (formValues.country.length > 50) {
            validateErrors.country = "Максимальна довжина 50 символів";
            result = false;
        }

        return { result: result, errors: validateErrors };
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validateResult = validate();

        if (!validateResult.result) {
            setErrors(validateResult.errors);
            return;
        } else {
            setErrors({});
        }

        const localData = localStorage.getItem("authors");
        if (localData) {
            const authors = JSON.parse(localData);
            const index = authors.findIndex(a => a.id == id);
            authors[index] = formValues;
            localStorage.setItem("authors", JSON.stringify(authors));
        }


        navigate("/authors");
    }

    const getError = (prop) => {
        return errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {errors[prop]}
            </Typography>
        ) : null;
    };

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
                        Редагування автора
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="firstName">Ім'я</FormLabel>
                            <TextField
                                name="firstName"
                                placeholder="Ім'я"
                                autoComplete="firstName"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                value={formValues.firstName}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        {getError("firstName")}
                        <FormControl>
                            <FormLabel htmlFor="lastName">Прізвище</FormLabel>
                            <TextField
                                name="lastName"
                                placeholder="Прізвище автора"
                                autoComplete="lastName"
                                fullWidth
                                variant="outlined"
                                value={formValues.lastName}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        {getError("lastName")}

                        <FormControl>
                            <FormLabel htmlFor="birthday">Рік народження</FormLabel>
                            <TextField
                                name="birthday"
                                placeholder="Дата народження"
                                autoComplete="birthday"
                                fullWidth
                                type="date"
                                variant="outlined"
                                value={formValues.birthday}
                                onChange={onChangeHandle}
                            />
                            {getError("birthday")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="country">Країна</FormLabel>
                            <TextField
                                name="country"
                                placeholder="Країна"
                                autoComplete="country"
                                fullWidth
                                variant="outlined"
                                value={formValues.country}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        {getError("country")}
                        <FormControl>
                            <FormLabel htmlFor="image">Фото автора</FormLabel>
                            <TextField
                                name="image"
                                placeholder="Фото автора"
                                autoComplete="image"
                                fullWidth
                                variant="outlined"
                                value={formValues.image}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="error"
                        >
                            Зберегти
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </Box>
    );
};

export default AuthorUpdateForm;
