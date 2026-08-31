"use client";

import { useState } from "react";
import BaseButton from "../Base/BaseButton";
import TransactionForm from "./TransactionForm";
import BaseModal from "../Base/BaseModal";
import { CategoryType } from "@/lib/types/category";

const AddTransactionButton = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>افزودن تراکنش</BaseButton>

      <BaseModal open={isOpen} onClose={() => setIsOpen(false)}>
        <TransactionForm
          categories={categories}
          onSuccess={() => setIsOpen(false)}
        />
      </BaseModal>
    </>
  );
};

export default AddTransactionButton;
