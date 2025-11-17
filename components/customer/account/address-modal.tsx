"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import AddressForm, { AddressInputs } from "./address-form";

interface Address {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  address?: string | string[];
  city?: string;
  state?: string;
  stateName?: string;
  country?: string;
  countryName?: string;
  postcode?: string;
  email?: string;
  phone?: string;
  vatId?: string;
  defaultAddress?: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (_data: AddressInputs) => Promise<void>;
  address?: Address | null;
  title: string;
}

export default function AddressModal({
  isOpen,
  onClose,
  onSubmit,
  address,
  title,
}: AddressModalProps) {
  const defaultValues = address
    ? {
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        companyName: address.companyName || "",
        address: Array.isArray(address.address)
          ? address.address.join(", ")
          : address.address || "",
        city: address.city || "",
        state: address.state || address.stateName || "",
        country: address.country || address.countryName || "ID",
        postcode: address.postcode || "",
        email: address.email || "",
        phone: address.phone || "",
        vatId: address.vatId || "",
      }
    : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <AddressForm
            title=""
            defaultValues={defaultValues}
            onSubmit={async (data) => {
              await onSubmit(data);
              onClose();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
