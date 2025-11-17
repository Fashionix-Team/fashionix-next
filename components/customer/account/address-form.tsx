"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import InputText from "@/components/checkout/cart/input";
import { useCustomToast } from "@/components/hooks/use-toast";
import { CountryArrayDataType } from "@/lib/bagisto/types";

export type AddressInputs = {
  firstName: string;
  lastName: string;
  companyName?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  email: string;
  phone: string;
  vatId?: string;
  addressType?: string;
};

interface AddressFormProps {
  title: string;
  defaultValues?: Partial<AddressInputs>;
  countries?: CountryArrayDataType[];
  onSubmit: (_data: AddressInputs) => Promise<void>;
}

export default function AddressForm({
  title,
  defaultValues,
  countries,
  onSubmit,
}: AddressFormProps) {
  const { showToast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      companyName: defaultValues?.companyName || "",
      address: defaultValues?.address || "",
      city: defaultValues?.city || "",
      state: defaultValues?.state || "",
      country: defaultValues?.country || "ID",
      postcode: defaultValues?.postcode || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      vatId: defaultValues?.vatId || "",
      addressType: defaultValues?.addressType || "both",
    },
  });

  const handleFormSubmit: SubmitHandler<AddressInputs> = async (formData) => {
    try {
      await onSubmit(formData);
      showToast("Alamat berhasil diperbarui", "success");
    } catch (error: any) {
      showToast(error?.message || "Gagal memperbarui alamat", "danger");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white shadow-sm rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold mb-5 border-b pb-2">{title}</h2>

      <div className="pl-8 pr-8">
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

          <div className="md:col-span-2">
            <InputText
              {...register("companyName")}
              label="Nama Perusahaan (Opsional)"
              errorMsg={errors?.companyName?.message}
              size="md"
              labelPlacement="outside"
            />
          </div>

          <div className="md:col-span-2">
            <InputText
              {...register("address", {
                required: "Alamat wajib diisi",
                minLength: {
                  value: 5,
                  message: "Alamat minimal 5 karakter",
                },
              })}
              label="Alamat Lengkap *"
              errorMsg={errors?.address?.message}
              size="md"
              labelPlacement="outside"
            />
          </div>

          <div className="max-w-full mb-2.5">
            <label
              className="mb-1 block font-medium text-gray-700 dark:text-white"
              htmlFor={`country-${title}`}
            >
              Negara *
            </label>
            <select
              {...register("country", {
                required: "Negara wajib dipilih",
              })}
              id={`country-${title}`}
              className="w-full !rounded-[0.62rem] border border-gray-300 dark:border-white bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base px-3 py-2"
            >
              <option value="">Pilih Negara</option>
              {countries && countries.length > 0 ? (
                countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="ID">Indonesia</option>
                  <option value="MY">Malaysia</option>
                  <option value="SG">Singapore</option>
                  <option value="US">United States</option>
                </>
              )}
            </select>
            {errors?.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country.message}
              </p>
            )}
          </div>

          <InputText
            {...register("state", {
              required: "Provinsi/Wilayah wajib diisi",
            })}
            label="Provinsi / Wilayah *"
            errorMsg={errors?.state?.message}
            size="md"
            labelPlacement="outside"
          />

          <InputText
            {...register("city", {
              required: "Kota wajib diisi",
            })}
            label="Kota *"
            errorMsg={errors?.city?.message}
            size="md"
            labelPlacement="outside"
          />

          <InputText
            {...register("postcode", {
              required: "Kode pos wajib diisi",
              pattern: {
                value: /^[0-9]{5,6}$/,
                message: "Kode pos harus 5-6 digit",
              },
            })}
            label="Kode Pos *"
            errorMsg={errors?.postcode?.message}
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
      </div>
    </form>
  );
}
