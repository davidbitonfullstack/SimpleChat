import React, { useState } from 'react';
import { CssBaseline, Avatar, Button, TextField, Container, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginStyles, StyledTitle } from './Styles';

function Login({ login }) {
  const [user, setUser] = useState('');
  const classes = loginStyles();

  return (
    <div>
      <StyledTitle>Welcome to my Chat</StyledTitle>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form onSubmit={() => login(user)} className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Name'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(e) => setUser(e.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
