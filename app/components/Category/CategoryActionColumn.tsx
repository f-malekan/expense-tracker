"use client";

import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import BaseModal from "../Base/BaseModal";
import type { CategoryType } from "@/lib/types/category";
import ConfirmationModal from "../Base/ConfirmationModal";
import iziToast from "izitoast";
import CategoryForm from "./CategoryForm";
import { deleteCategory } from "@/lib/actions/category";

interface Props {
  category: CategoryType;
}

const CategoryActionColumn = ({ category }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteRow = async () => {
    const { success, message } = await deleteCategory(category.id);

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
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="ویرایش دسته بندی"
          onClick={() => setIsEditOpen(true)}
          className="rounded-md p-2 transition hover:bg-gray-100"
        >
          <FiEdit2 size={18} />
        </button>

        <button
          type="button"
          aria-label="حذف دسته بندی"
          onClick={() => setDeleteModalOpen(true)}
          className="rounded-md p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <BaseModal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <CategoryForm
          category={category}
          onSuccess={handleEditSuccess}
          mode="edit"
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

export default CategoryActionColumn;
