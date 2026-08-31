"use client";
import React, { useState } from "react";
import BaseButton from "../Base/BaseButton";
import AddTransactionForm from "./TransactionForm";
import BaseModal from "../Base/BaseModal";
import { CategoryType } from "@/lib/types/category";

const AddTransActionButton = ({ categories }: {categories: CategoryType[]}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <BaseButton onClick={() => setIsOpen(true)}>افزودن تراکنش</BaseButton>
      <BaseModal open={isOpen} onClose={() => setIsOpen(false)}>
        <AddTransactionForm categories={categories}/>
      </BaseModal>
    </div>
  );
};

export default AddTransActionButton;
