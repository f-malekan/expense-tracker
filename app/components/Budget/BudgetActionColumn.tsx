"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import BaseModal from "../Base/BaseModal";
import ConfirmationModal from "../Base/ConfirmationModal";
import BudgetForm from "./BudgetForm";
import type { CategoryType } from "@/lib/types/category";
import { deleteBudget } from "@/lib/actions/budget";
import iziToast from "izitoast";

interface BudgetData {
  id: string;
  amount: string;
  month: number;
  year: number;
  categoryId: string;
}

interface Props {
  budget: BudgetData;
  categories: CategoryType[];
}

const BudgetActionColumn = ({ budget, categories }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRow = async () => {
    setIsDeleting(true);

    const result = await deleteBudget(budget.id);

    if (result.success) {
      iziToast.success({
        message: result.message,
        rtl: true,
      });

      setDeleteModalOpen(false);
    } else {
      iziToast.error({
        message: result.message,
        rtl: true,
      });
    }

    setIsDeleting(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="ویرایش بودجه"
          onClick={() => setIsEditOpen(true)}
          className="rounded-md p-2 transition hover:bg-gray-100"
        >
          <FiEdit2 size={18} />
        </button>

        <button
          type="button"
          aria-label="حذف بودجه"
          onClick={() => setDeleteModalOpen(true)}
          disabled={isDeleting}
          className="rounded-md p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <BaseModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      >
        <BudgetForm
          mode="edit"
          budget={budget}
          categories={categories}
          onSuccess={() => setIsEditOpen(false)}
        />
      </BaseModal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={deleteRow}
      />
    </>
  );
};

export default BudgetActionColumn;