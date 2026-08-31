"use client";

import { useState } from "react";
import BaseButton from "../Base/BaseButton";
import CategoryForm from "./CategoryForm";
import BaseModal from "../Base/BaseModal";

const AddCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>افزودن دسته‌بندی</BaseButton>

      <BaseModal open={isOpen} onClose={() => setIsOpen(false)}>
        <CategoryForm onSuccess={() => setIsOpen(false)} />
      </BaseModal>
    </>
  );
};

export default AddCategoryButton;
