import clsx from 'clsx';
import { BillingFormProps } from './types';

export function BillingForm({ register, errors, countries }: BillingFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Informasi Penagihan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Nama Depan</label>
          <input
            type="text"
            {...register('firstName', {
              required: 'Nama depan wajib diisi',
              minLength: {
                value: 2,
                message: 'Nama depan minimal 2 karakter'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Nama Belakang</label>
          <input
            type="text"
            {...register('lastName', {
              required: 'Nama belakang wajib diisi',
              minLength: {
                value: 2,
                message: 'Nama belakang minimal 2 karakter'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email tidak valid'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2">Nomor Telepon</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Nomor telepon wajib diisi',
              pattern: {
                value: /^[0-9+\-\s()]+$/,
                message: 'Nomor telepon tidak valid'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.phone ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2">Alamat</label>
          <input
            type="text"
            {...register('address', {
              required: 'Alamat wajib diisi',
              minLength: {
                value: 10,
                message: 'Alamat minimal 10 karakter'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.address ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Kota</label>
          <input
            type="text"
            {...register('city', {
              required: 'Kota wajib diisi',
              minLength: {
                value: 2,
                message: 'Kota minimal 2 karakter'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.city ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Provinsi</label>
          <input
            type="text"
            {...register('state', {
              required: 'Provinsi wajib diisi',
              minLength: {
                value: 2,
                message: 'Provinsi minimal 2 karakter'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.state ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Kode Pos</label>
          <input
            type="text"
            {...register('postalCode', {
              required: 'Kode pos wajib diisi',
              pattern: {
                value: /^[0-9]{5}$/,
                message: 'Kode pos harus 5 digit angka'
              }
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.postalCode ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Negara</label>
          <select
            {...register('country', {
              required: 'Negara wajib dipilih'
            })}
            className={clsx(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              errors.country ? 'border-red-500' : 'border-gray-300'
            )}
          >
            <option value="">Pilih Negara</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
