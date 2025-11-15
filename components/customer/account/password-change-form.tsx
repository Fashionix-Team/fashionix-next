"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import InputText from "@/components/checkout/cart/input";
import { useCustomToast } from "@/components/hooks/use-toast";

export type PasswordChangeInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface PasswordChangeFormProps {
  onSubmit: (_data: PasswordChangeInputs) => Promise<void>;
}

export default function PasswordChangeForm({
  onSubmit,
}: PasswordChangeFormProps) {
  const { showToast } = useCustomToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordChangeInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const handleFormSubmit: SubmitHandler<PasswordChangeInputs> = async (
    formData
  ) => {
    try {
      await onSubmit(formData);
      showToast("Kata sandi berhasil diubah", "success");
      reset(); // Clear form after successful password change
    } catch (error: any) {
      showToast(error?.message || "Gagal mengubah kata sandi", "danger");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white shadow-sm rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold mb-5 border-b pb-2">
        Ubah Kata Sandi
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <InputText
            {...register("currentPassword", {
              required: "Kata sandi saat ini wajib diisi",
            })}
            label="Kata Sandi Saat Ini *"
            typeName="password"
            errorMsg={errors?.currentPassword?.message}
            size="md"
            labelPlacement="outside"
          />
        </div>

        <InputText
          {...register("newPassword", {
            required: "Kata sandi baru wajib diisi",
            minLength: {
              value: 8,
              message: "Kata sandi minimal 8 karakter",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message:
                "Kata sandi harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus",
            },
          })}
          label="Kata Sandi Baru *"
          typeName="password"
          errorMsg={errors?.newPassword?.message}
          size="md"
          labelPlacement="outside"
        />

        <InputText
          {...register("confirmPassword", {
            required: "Konfirmasi kata sandi wajib diisi",
            validate: (value) =>
              value === newPassword || "Kata sandi tidak cocok",
          })}
          label="Konfirmasi Kata Sandi *"
          typeName="password"
          errorMsg={errors?.confirmPassword?.message}
          size="md"
          labelPlacement="outside"
        />
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-600">
          <strong>Persyaratan kata sandi:</strong>
        </p>
        <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
          <li>Minimal 8 karakter</li>
          <li>Mengandung huruf besar dan huruf kecil</li>
          <li>Mengandung minimal 1 angka</li>
          <li>Mengandung minimal 1 karakter khusus (@$!%*?&)</li>
        </ul>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Mengubah..." : "Ubah Kata Sandi"}
        </button>
      </div>
    </form>
  );
}
