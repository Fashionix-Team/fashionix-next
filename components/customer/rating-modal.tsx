"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { StarIcon } from "@heroicons/react/24/solid";
import { useCustomToast } from "@/components/hooks/use-toast";
import { submitReview } from "@/app/(public)/customer/dashboard/order-detail/[id]/actions";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  products: Array<{
    id: string;
    name: string;
    category: string;
    imageUrl: string;
  }>;
}

interface ReviewFormInputs {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  name?: string;
}

const ratingOptions = [
  { value: 5, label: "5 Star Rating" },
  { value: 4, label: "4 Star Rating" },
  { value: 3, label: "3 Star Rating" },
  { value: 2, label: "2 Star Rating" },
  { value: 1, label: "1 Star Rating" },
];

export default function RatingModal({
  isOpen,
  onClose,
  products,
}: RatingModalProps) {
  const { showToast } = useCustomToast();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInputs>({
    defaultValues: {
      productId: "",
      rating: 0,
      title: "",
      comment: "",
      name: "",
    },
  });

  const onSubmit = async (data: ReviewFormInputs) => {
    try {
      const result = await submitReview({
        productId: data.productId,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
        name: data.name || undefined,
      });

      if (result.success) {
        showToast(result.message, "success");
        reset();
        onClose();
      } else {
        showToast(result.message, "danger");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showToast("Terjadi kesalahan saat mengirim ulasan", "danger");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-200",
        body: "py-6",
        footer: "border-t border-gray-200",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-800 uppercase">
                Beri Penilaian
              </h2>
            </ModalHeader>

            <ModalBody>
              <form id="review-form" onSubmit={handleSubmit(onSubmit)}>
                {/* Penilaian Dropdown */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Penilaian
                  </label>
                  <Controller
                    name="rating"
                    control={control}
                    rules={{ required: "Penilaian harus dipilih", min: 1 }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="5 Star Rating"
                        aria-label="Rating"
                        classNames={{
                          trigger: "border border-gray-300 rounded-lg",
                        }}
                        selectedKeys={
                          field.value ? [field.value.toString()] : []
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? Number(value) : 0);
                        }}
                        renderValue={(items) => {
                          return items.map((item) => {
                            const rating = Number(item.key);
                            return (
                              <div key={item.key} className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                  <StarIcon
                                    key={index}
                                    className={`h-5 w-5 ${
                                      index < rating
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-sm">
                                  {rating} Star Rating
                                </span>
                              </div>
                            );
                          });
                        }}
                      >
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} textValue={option.label}>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, index) => (
                                <StarIcon
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < option.value
                                      ? "text-orange-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm">
                                {option.label}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.rating && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                {/* Umpan Balik Textarea */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Umpan Balik
                  </label>
                  <Textarea
                    {...register("comment", {
                      required: "Umpan balik harus diisi",
                    })}
                    placeholder="Tulis umpan balik Anda tentang produk dan layanan kami"
                    minRows={4}
                    classNames={{
                      input: "resize-y",
                      inputWrapper: "border border-gray-300 rounded-lg",
                    }}
                  />
                  {errors.comment && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.comment.message}
                    </p>
                  )}
                </div>

                {/* Product Selection */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Produk
                  </label>
                  <Controller
                    name="productId"
                    control={control}
                    rules={{ required: "Produk harus dipilih" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Pilih produk untuk direview"
                        aria-label="Product"
                        classNames={{
                          trigger: "border border-gray-300 rounded-lg",
                        }}
                        selectedKeys={field.value ? [field.value] : []}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {products.map((product) => (
                          <SelectItem key={product.id} textValue={product.name}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.productId && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.productId.message}
                    </p>
                  )}
                </div>

                {/* Title Input */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Judul Ulasan
                  </label>
                  <input
                    {...register("title", {
                      required: "Judul ulasan harus diisi",
                    })}
                    type="text"
                    placeholder="Masukkan judul ulasan"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Optional Name Input */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama (Opsional)
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Masukkan nama Anda"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                form="review-form"
                color="warning"
                className="bg-orange-500 font-medium uppercase text-white hover:bg-orange-600"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Kirim Ulasan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
