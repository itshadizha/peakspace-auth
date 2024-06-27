import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

interface IFormInput {
  email: string;
  password: string;
}

const INPUT_FIELD = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
];

const schema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Напишите email'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть больше 6 символов')
    .max(16, 'Пароль должен быть меньше 16 символов')
    .required('Напишите пароль!'),
}).required();

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { message } = useAppSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data, 'data');
    dispatch(signIn({ data, navigate }));
  };

  const navigateToSignUp = () => {
    navigate("/signUp")
  }

  const navigateToForgotPassword = () => {
    navigate("/forgot")
  }


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      {INPUT_FIELD.map((item) => (
        <div key={item.name}>
          <TextField
            label={item.label}
            type={item.type}
            placeholder={item.label}
            {...register(item.name as keyof IFormInput)}
            error={!!errors[item.name as keyof IFormInput]}
            helperText={errors[item.name as keyof IFormInput]?.message}
            fullWidth
          />
        </div>
      ))}
      <Button type="submit" variant="contained" size="large">
        Войти
      </Button>
      {message && (
        <Box mt={2}>
          <h1>{message}</h1>
        </Box>
      )}

      <h4 onClick={navigateToSignUp}>зарегистрироваться</h4>

      <h4 onClick={navigateToForgotPassword}>забыли пароль?</h4>
    </Box>
  );
};

export default SignIn;
