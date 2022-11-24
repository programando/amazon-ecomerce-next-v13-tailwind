import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email, pasword }) => {};
  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-xl"> Login</h1>
        <div className="mb-4">
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            autoFocus
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password"> password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
            {...register('password', {
              required: 'The password is required',
              minLength: { value: 3, message: 'password is more then 5 chars' },
            })}
          ></input>
          {errors.password && (
            <div className="text-red-500"> {errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button" type="submit">
            {' '}
            Login
          </button>
          <div className="mb-4">
            Don&apos;t have an account ?<Link href="/register"> Register</Link>
          </div>
        </div>
      </form>
    </Layout>
  );
}
