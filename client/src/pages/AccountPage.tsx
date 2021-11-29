import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';

import SignInForm from 'features/account/SignInForm';
import RegisterForm from 'features/account/RegisterForm';
import { useState } from 'react';

const AccountPage = () => {
  const [createAccount, setCreateAccount] = useState(false);

  const handleClick = () => setCreateAccount((val) => !val);
  return (
    <>
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            {createAccount ? 'Register' : 'Sign in'}
          </Typography>

          {createAccount ? <RegisterForm /> : <SignInForm />}

          <Grid container>
            <Grid item>
              <Link variant="body2" onClick={handleClick}>
                {createAccount
                  ? 'Have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AccountPage;
