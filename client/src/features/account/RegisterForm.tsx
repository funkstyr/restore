import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from 'app/hooks';
import { registerUser } from 'features/account/accountSlice';

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    await dispatch(registerUser(values));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...register('email', {
          required: 'Required',
        })}
        error={!!errors.email}
        helperText={errors?.email?.message}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        autoComplete="username"
        autoFocus
        {...register('username', {
          required: 'Required',
        })}
        error={!!errors.username}
        helperText={errors?.username?.message}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password', {
          required: 'Required',
        })}
        error={!!errors.password}
        helperText={errors?.password?.message}
      />

      <LoadingButton
        loading={isSubmitting}
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </LoadingButton>
    </Box>
  );
};

export default RegisterForm;
