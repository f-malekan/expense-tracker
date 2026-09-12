"use client";

import { useState } from "react";
import BaseButton from "../Base/BaseButton";
import BaseModal from "../Base/BaseModal";
import BudgetForm from "./BudgetForm";
import type { CategoryType } from "@/lib/types/category";

interface Props {
  categories: CategoryType[];
}

const AddBudgetButton = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>
        افزودن بودجه
      </BaseButton>

      <BaseModal open={isOpen} onClose={() => setIsOpen(false)}>
        <BudgetForm
          categories={categories}
          onSuccess={() => setIsOpen(false)}
        />
      </BaseModal>
    </>
  );
};

export default AddBudgetButton;