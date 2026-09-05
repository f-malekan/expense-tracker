"use client";

import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteTransaction } from "@/lib/actions/transaction";

import BaseModal from "../Base/BaseModal";
import TransactionForm from "./TransactionForm";
import ConfirmationModal from "../Base/ConfirmationModal";

import type { CategoryType } from "@/lib/types/category";
import type { TransactionDataType } from "@/lib/types/transaction";

import iziToast from "izitoast";

interface Props {
  transaction: TransactionDataType;
  categories: CategoryType[];
}

const TransactionActionColumn = ({ transaction, categories }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteRow = async () => {
    const { success, message } = await deleteTransaction(transaction.id);

    if (success) {
      iziToast.success({
        message: message,
        rtl: true,
      });

      setDeleteModalOpen(false);
    } else {
      iziToast.error({
        message: message,
        rtl: true,
      });
    }
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="ویرایش تراکنش"
          onClick={() => setIsEditOpen(true)}
          className="
            rounded-lg p-2
            text-text-secondary
            transition-colors
            hover:bg-primary/10
            hover:text-primary
          "
        >
          <FiEdit2 size={17} />
        </button>

        <button
          type="button"
          aria-label="حذف تراکنش"
          onClick={() => setDeleteModalOpen(true)}
          className="
            rounded-lg p-2
            text-text-secondary
            transition-colors
            hover:bg-destructive/10
            hover:text-destructive
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <FiTrash2 size={17} />
        </button>
      </div>

      <BaseModal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <TransactionForm
          transaction={transaction}
          categories={categories}
          mode="edit"
          onSuccess={handleEditSuccess}
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

export default TransactionActionColumn;
