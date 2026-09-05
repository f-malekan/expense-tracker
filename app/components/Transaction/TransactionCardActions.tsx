"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import TransactionActionColumn from "./TransactionActionColumn";
import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";

interface Props {
  transaction: TransactionDataType;
  categories: CategoryType[];
}

const TransactionCardActions = ({ transaction, categories }: Props) => {
  const [actionId, setActionId] = useState<string | null>(null);

  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActionOpen = actionId === transaction.id;

  return (
    <div ref={isActionOpen ? actionRef : null} className="relative shrink-0">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();

          setActionId(isActionOpen ? null : transaction.id);
        }}
        aria-label="عملیات"
      >
        <FiMoreVertical size={16} />
      </button>

      {isActionOpen && (
        <div className="absolute left-0 top-full z-20 rounded-lg bg-surface p-1 shadow-md">
          <TransactionActionColumn
            transaction={{
              ...transaction,
              amount: transaction.amount.toString(),
            }}
            categories={categories}
          />
        </div>
      )}

    </div>
  );
};

export default TransactionCardActions;
