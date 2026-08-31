"use client";

import React, { useState, useTransition } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteTransaction } from "@/lib/actions/transaction";
import BaseModal from "../Base/BaseModal";
import TransactionForm from "./TransactionForm";
import type { CategoryType } from "@/lib/types/category";
import type { TransactionDataType } from "@/lib/types/transaction";

interface Props {
  transaction: TransactionDataType;
  categories: CategoryType[];
}

const TransactionActionColumn = ({ transaction, categories }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteRow = () => {
    const confirmed = window.confirm("آیا از حذف این تراکنش مطمئن هستید؟");

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteTransaction(transaction.id);

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);
    });
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="ویرایش تراکنش"
          onClick={() => setIsEditOpen(true)}
          className="rounded-md p-2 transition hover:bg-gray-100"
        >
          <FiEdit2 size={18} />
        </button>

        <button
          type="button"
          aria-label="حذف تراکنش"
          onClick={deleteRow}
          disabled={isPending}
          className="rounded-md p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <BaseModal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <TransactionForm
          transaction={transaction}
          categories={categories}
          onSuccess={handleEditSuccess}
          mode="edit"
        />
      </BaseModal>
    </>
  );
};

export default TransactionActionColumn;
