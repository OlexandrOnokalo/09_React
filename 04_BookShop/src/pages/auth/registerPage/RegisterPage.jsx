import { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router";
import Alert from "@mui/material/Alert";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

const RegisterPage = () => {
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ type: "", text: "" });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
        };

        const result = validate(formData);
        if (!result.result) {
            setErrors(result.errors);
            return;
        } else {
            setErrors({});
        }

        const registerResult = register(formData.email, formData.password);
        if (registerResult.success) {
            setMessage({ type: "success", text: `${registerResult.message} Ваша роль: ${registerResult.user.role.toUpperCase()}` });
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 1500);
        } else {
            setMessage({ type: "error", text: registerResult.message });
        }
    };

    function validate(formValues) {
        const validateErrors = {};
        let result = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // email
        if (formValues.email.length === 0) {
            validateErrors.email = "Обов'язкове поле";
            result = false;
        } else if (!emailRegex.test(formValues.email)) {
            validateErrors.email = "Невірний формат пошти";
            result = false;
        }

        // password
        if (formValues.password.length === 0) {
            validateErrors.password = "Обов'язкове поле";
            result = false;
        } else if (formValues.password.length < 6) {
            validateErrors.password = "Мінімальна довжина 6 символів";
            result = false;
        }

        // confirm password
        if (formValues.confirmPassword.length === 0) {
            validateErrors.confirmPassword = "Обов'язкове поле";
            result = false;
        } else if (formValues.password !== formValues.confirmPassword) {
            validateErrors.confirmPassword = "Паролі не збігаються";
            result = false;
        }

        return { result: result, errors: validateErrors };
    }

    const getError = (prop) => {
        return errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {errors[prop]}
            </Typography>
        ) : null;
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Реєстрація
                    </Typography>
                    {message.text && (
                        <Alert severity={message.type}>
                            {message.text}
                        </Alert>
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                inputRef={emailRef}
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                            {getError("email")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Пароль</FormLabel>
                            <TextField
                                inputRef={passwordRef}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                autoComplete="new-password"
                                fullWidth
                                variant="outlined"
                            />
                            {getError("password")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="confirmPassword">Повторіть пароль</FormLabel>
                            <TextField
                                inputRef={confirmPasswordRef}
                                name="confirmPassword"
                                placeholder="••••••"
                                type="password"
                                autoComplete="new-password"
                                fullWidth
                                variant="outlined"
                            />
                            {getError("confirmPassword")}
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained">
                            Зареєструватися
                        </Button>
                    </Box>
                    <Typography sx={{ textAlign: "center" }}>
                        Вже зареєстровані?{" "}
                        <Link
                            to="/login"
                            style={{ alignSelf: "center" }}
                        >
                            Увійти
                        </Link>
                    </Typography>
                </Card>
            </SignUpContainer>
        </>
    );
};

export default RegisterPage;
