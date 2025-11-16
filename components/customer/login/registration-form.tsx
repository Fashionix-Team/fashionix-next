"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCustomToast } from '@/components/hooks/use-toast';
import { createUser } from '../lib/action';

export type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  agreement: boolean;
};

export default function RegistrationForm() {
  const { showToast } = useCustomToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      showToast('The Passwords do not match.', 'warning');
      return;
    }

    await createUser(data)
      .then((res) => {
        if (res?.success) {
          showToast('User created successfully', 'success');
          router.push('/customer/login');
        } else {
          showToast(res?.error?.message || 'Registration failed', 'warning');
        }
      })
      .catch((error) => {
        showToast(error.message || 'Terjadi kesalahan. Silakan coba lagi.', 'danger');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex gap-2.5">
        <div className="w-full">
          <label className="block text-sm text-gray-700">Nama Depan</label>
          <input
            {...register('firstName', {
              required: 'First name is required',
            })}
            id="firstName"
            type="text"
            className={`mt-1 block w-full rounded border ${
              errors.firstName ? 'border-red-500' : 'border-gray-200'
            } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm text-gray-700">Nama Belakang</label>
          <input
            {...register('lastName', {
              required: 'Last name is required',
            })}
            id="lastName"
            type="text"
            className={`mt-1 block w-full rounded border ${
              errors.lastName ? 'border-red-500' : 'border-gray-200'
            } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700">Alamat Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email.',
            },
          })}
          id="email"
          type="email"
          className={`mt-1 block w-full rounded border ${
            errors.email ? 'border-red-500' : 'border-gray-200'
          } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
          placeholder="Enter email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700">Kata Sandi</label>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Must be at least 8 characters',
            },
            validate: (val) => {
              if (!/[A-Z]/.test(val))
                return 'Must contain at least one uppercase letter';
              if (!/[a-z]/.test(val))
                return 'Must contain at least one lowercase letter';
              if (!/[0-9]/.test(val))
                return 'Must contain at least one number';
              if (/\s/.test(val)) return 'Cannot contain spaces';
              return true;
            },
          })}
          id="password"
          type="password"
          className={`mt-1 block w-full rounded border ${
            errors.password ? 'border-red-500' : 'border-gray-200'
          } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700">Konfirmasi Kata Sandi</label>
        <input
          {...register('passwordConfirmation', {
            required: 'Please confirm your password',
            validate: (value) => {
              if (value !== watch('password')) {
                return 'Passwords do not match';
              }
              return true;
            },
          })}
          id="passwordConfirmation"
          type="password"
          className={`mt-1 block w-full rounded border ${
            errors.passwordConfirmation ? 'border-red-500' : 'border-gray-200'
          } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
          placeholder="Enter confirm password"
        />
        {errors.passwordConfirmation && (
          <p className="mt-1 text-sm text-red-500">
            {errors.passwordConfirmation.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 inline-flex items-center justify-center rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="uppercase">{isSubmitting ? 'Memproses...' : 'DAFTAR'}</span>
      </button>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="px-3 text-sm text-gray-400">atau</div>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button type="button" className="w-full inline-flex items-center justify-center rounded border border-gray-200 px-4 py-2 bg-white hover:bg-gray-50">
        <img src="/image/logo/google-circle.png" alt="Google" className="w-5 h-5 mr-3" />
        <span className="text-sm text-gray-700">Daftar dengan Google</span>
      </button>
    </form>
  );
}
