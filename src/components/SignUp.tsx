import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUp } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';

interface IFormInput {
  email: string;
  password: string;
  userName: string;
  photo: string; 
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
  {
    name: 'userName',
    label: 'Имя пользователя',
    type: 'text',
  },
  {
    name: 'photo',
    label: 'Фото (URL)',
    type: 'text',
  },
];

const schema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Напишите email'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть больше 6 символов')
    .max(16, 'Пароль должен быть меньше 16 символов')
    .required('Напишите пароль!'),
  userName: yup
    .string()
    .required('Введите имя пользователя')
    .min(3, 'Имя пользователя должно быть больше 3 символов'),
  photo: yup.string().url('Введите корректный URL').required('Введите URL фото'),
}).required();

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log(data, 'data');
      await dispatch(signUp({data, navigate})); 
    } catch (error) {
      console.error('Error during signUp:', error);
    }
  };

  const navigateToSignIn = () => {
    navigate("/signIn")
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
        Добавить
      </Button>

      <h4 onClick={navigateToSignIn}>уже есть аккаунт?</h4>
    </Box>
  );
};

export default SignUp;
