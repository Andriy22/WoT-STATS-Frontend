import {Button, Grid, Link, TextField} from "@mui/material";
import {IPropsRegister} from "../../../common/types/auth";
import React from "react";

const RegisterPage: React.FC<IPropsRegister> = (props: IPropsRegister): JSX.Element => {
    const {setEmail, setPassword, setConfirmPassword, setNickname} = props;
    const {navigate} = props;

    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                onChange={(event) => setNickname(event.target.value)}
                label="Nickname"
                name="nickname"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />

            <TextField
                margin="normal"
                required
                fullWidth
                onChange={(event) => setConfirmPassword(event.target.value)}
                name="passwordConfirmation"
                label="Confirm your password"
                type="password"
                id="passwordConfirmation"
                autoComplete="current-password"
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Sign Up
            </Button>
            <Grid container>
                <Grid item>
                    <Link component='button' variant="body2" onClick={() => navigate('/auth/login')}>
                        {" Already have an account? Sign in"}
                    </Link>

                </Grid>
            </Grid>
        </>
    );
};

export default RegisterPage;
