"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import InputText from "@/components/checkout/cart/input";
import { useCustomToast } from "@/components/hooks/use-toast";

export type AccountInfoInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string; // Required: Male, Female, or Other (matches Bagisto format)
  dateOfBirth?: string;
};

interface AccountInfoFormProps {
  defaultValues?: Partial<AccountInfoInputs>;
  onSubmit: (_data: AccountInfoInputs) => Promise<void>;
}

export default function AccountInfoForm({
  defaultValues,
  onSubmit,
}: AccountInfoFormProps) {
  const { showToast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountInfoInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      gender: defaultValues?.gender || "",
      dateOfBirth: defaultValues?.dateOfBirth || "",
    },
  });

  const handleFormSubmit: SubmitHandler<AccountInfoInputs> = async (formData) => {
    try {
      await onSubmit(formData);
      showToast("Informasi akun berhasil diperbarui", "success");
    } catch (error: any) {
      showToast(
        error?.message || "Gagal memperbarui informasi akun",
        "danger"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
      <div className="grid md:grid-cols-2 gap-4">
        <InputText
          {...register("firstName", {
            required: "Nama depan wajib diisi",
            minLength: {
              value: 2,
              message: "Nama depan minimal 2 karakter",
            },
          })}
          label="Nama Depan *"
          errorMsg={errors?.firstName?.message}
          size="md"
          labelPlacement="outside"
        />

        <InputText
          {...register("lastName", {
            required: "Nama belakang wajib diisi",
            minLength: {
              value: 2,
              message: "Nama belakang minimal 2 karakter",
            },
          })}
          label="Nama Belakang *"
          errorMsg={errors?.lastName?.message}
          size="md"
          labelPlacement="outside"
        />

        <InputText
          {...register("email", {
            required: "Email wajib diisi",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format email tidak valid",
            },
          })}
          label="Email *"
          typeName="email"
          errorMsg={errors?.email?.message}
          size="md"
          labelPlacement="outside"
        />

        <InputText
          {...register("phone", {
            required: "Nomor telepon wajib diisi",
            pattern: {
              value: /^[0-9+\-\s()]+$/,
              message: "Format nomor telepon tidak valid",
            },
          })}
          label="Nomor Telepon *"
          typeName="tel"
          errorMsg={errors?.phone?.message}
          size="md"
          labelPlacement="outside"
        />

        <div className="max-w-full mb-2.5">
          <label
            className="mb-1 block font-medium text-gray-700 dark:text-white"
            htmlFor="gender"
          >
            Jenis Kelamin *
          </label>
          <select
            {...register("gender", {
              required: "Jenis kelamin wajib diisi",
            })}
            id="gender"
            className="w-full !rounded-[0.62rem] border border-gray-300 dark:border-white bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base px-3 py-2"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Male">Laki-laki</option>
            <option value="Female">Perempuan</option>
            <option value="Other">Lainnya</option>
          </select>
          {errors?.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <InputText
          {...register("dateOfBirth")}
          label="Tanggal Lahir"
          typeName="date"
          errorMsg={errors?.dateOfBirth?.message}
          size="md"
          labelPlacement="outside"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
