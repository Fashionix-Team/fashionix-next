"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tabs, Tab } from "@heroui/react";
import React, { FC } from "react";
import { Avatar } from "@heroui/avatar";

import Rating from ".";

import { GridTileImage } from "@/components/grid/tile";
import Prose from "@/components/prose";
import { isArray } from "@/lib/type-guards";
import { formatDate, getInitials, getReviews } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Tooltip } from "@heroui/react";
import { ReviewIcon } from "../icons/review";

export type additionalDataTypes = {
  id: string;
  code: string;
  label: string;
  value: null;
  admin_name: string;
  type: string;
};

export const ProductMoreDetails: FC<{
  description: string;
  additionalData: additionalDataTypes[];
  reviews: any[];
  totalReview: number;
}> = ({ description, additionalData, reviews, totalReview }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <Tabs 
        aria-label="Product Details"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-orange-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-orange-500"
        }}
      >
        <Tab
          key="description"
          title={
            <div className="flex items-center space-x-2">
              <span>DESKRIPSI</span>
            </div>
          }
        >
          <div className="py-6">
            <Prose className="text-sm text-gray-700" html={description} />
          </div>
        </Tab>
        
        <Tab
          key="additional"
          title={
            <div className="flex items-center space-x-2">
              <span>INFORMASI TAMBAHAN</span>
            </div>
          }
        >
          <div className="py-6">
            <div className="grid max-w-max grid-cols-[auto_1fr] gap-x-8 gap-y-4">
              {additionalData?.map((item) => (
                <React.Fragment key={item.label}>
                  <div className="grid">
                    <p className="text-sm font-medium text-gray-700">
                      {item?.label}:
                    </p>
                  </div>
                  <div className="grid">
                    <p className="text-sm text-gray-600">
                      {item?.value || "--"}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Tab>

        <Tab
          key="specifications"
          title={
            <div className="flex items-center space-x-2">
              <span>SPESIFIKASI</span>
            </div>
          }
        >
          <div className="py-6">
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
              <span className="font-medium text-gray-700">Berat:</span>
              <span className="text-gray-600">0.5 kg</span>
              
              <span className="font-medium text-gray-700">Dimensi:</span>
              <span className="text-gray-600">30 × 20 × 10 cm</span>
            </div>
          </div>
        </Tab>

        {totalReview ? (
          <Tab
            key="reviews"
            title={
              <div className="flex items-center space-x-2">
                <span>ULASAN</span>
              </div>
            }
          >
            <div className="py-6">
              <ReviewDetail reviewDetails={reviews} totalReview={totalReview} />
            </div>
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
};
export interface ReviewDatatypes {
  id: string;
  name: string;
  title: string;
  rating: 5;
  status: string;
  comment: string;
  productId: string;
  customerId: string;
  createdAt: string;
  images: {
    url: string;
    reviewId: string;
  }[];
  customer: {
    name: string;
    imageUrl: string;
  };
}
export interface Props {
  reviewDetails: ReviewDatatypes[];
  totalReview: number;
}
const ReviewDetail: FC<Props> = ({ reviewDetails, totalReview }) => {
  const { reviewAvg, ratingCounts } = getReviews(reviewDetails);

  return totalReview ? (
    <div className="flex flex-wrap gap-x-5 sm:gap-x-10">
      {/* Rating Summary */}

      <div className="my-2 flex w-full flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center min-[1350px]:flex-nowrap">
        <div className="flex items-center gap-x-2">
          <Rating
            length={5}
            size="size-5"
            star={reviewAvg}
            totalReview={totalReview}
          />
        </div>
        <div className="flex">
          {Object.entries(ratingCounts)
            .reverse()
            .map(([star, count]) => (
              <div key={star + count}>
                <Tooltip
                  content={
                    <p className="text-center">
                      {star} Star <br /> {count}{" "}
                      {count >= 2 ? "Reviews" : "Review"}
                    </p>
                  }
                  placement="top"
                >
                  <div
                    className={clsx(
                      "min-h-4 cursor-pointer",
                      star === "5" && "min-w-24 rounded-l-sm",
                      star === "4" && "min-w-16",
                      star === "3" && "min-w-12",
                      star === "2" && "min-w-12",
                      star === "1" && "min-w-6 rounded-r-sm",
                      count > 0
                        ? star === "5"
                          ? "bg-green-700"
                          : star === "4"
                            ? "bg-cyan-400"
                            : star === "3"
                              ? "bg-violet-600"
                              : star === "2"
                                ? "bg-yellow-400"
                                : "bg-red-600"
                        : "bg-gray-400"
                    )}
                  />
                </Tooltip>
              </div>
            ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="flex w-full flex-1 flex-col gap-5 py-2 sm:pt-6">
        {reviewDetails?.map(
          (
            { name, title, comment, createdAt, rating, images, customer },
            index
          ) => (
            <div key={index} className="flex flex-col gap-y-2">
              <h1 className="font-outfit text-xl font-medium text-black/[80%] dark:text-white">
                {title}
              </h1>
              <Rating className="my-1" length={5} size="size-5" star={rating} />
              <h2 className="font-outfit text-base font-normal text-black/[80%] dark:text-white">
                {comment}
              </h2>
              <div className="flex gap-4">
                <div className="flex w-full items-center gap-2">
                  <Avatar
                    className="h-[56px] min-w-[56px] border border-solid border-black/10 bg-white text-large dark:bg-neutral-900"
                    name={getInitials(name)}
                    src={customer?.imageUrl}
                  />
                  <div>
                    <h1 className="font-outfit text-base font-medium text-black/80 dark:text-white">
                      {name}
                    </h1>
                    <p className="text-base text-black/80 dark:text-white">
                      {formatDate(createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {isArray(images) && images.length > 0 && (
                <div className="mt-2 flex h-full min-h-[50px] w-full max-w-[60px] flex-wrap gap-2">
                  {images.map((img) => (
                    <GridTileImage
                      key={img.reviewId}
                      fill
                      alt={`${img.reviewId}-review`}
                      className="rounded-lg"
                      src={img.url}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center pb-2">
      <ReviewIcon />
      <h2 className="font-outfit text-xl tracking-wide">No Review found</h2>
      <p className="font-outfit tracking-wide text-neutral-800 dark:text-white">
        Be the first to review this product
      </p>
    </div>
  );
};
