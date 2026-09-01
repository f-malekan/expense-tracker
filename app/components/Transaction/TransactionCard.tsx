"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionActionColumn from "./TransactionActionColumn";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiMoreVertical,
} from "react-icons/fi";

interface Props {
  transactions: TransactionDataType[];
  categories: CategoryType[];
  className?: string;
}

const TransactionCard = ({
  transactions,
  categories,
  className = "",
}: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const actionRef = useRef<HTMLDivElement>(null);

  // Close actions when clicking outside
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

  return (
    <div className={`space-y-1 ${className}`}>
      {transactions.map((transaction) => {
        const isIncome = transaction.type === "INCOME";
        const isExpanded = expandedId === transaction.id;
        const isActionOpen = actionId === transaction.id;

        const formattedDate = new Intl.DateTimeFormat("fa-IR", {
          month: "short",
          day: "numeric",
        }).format(new Date(transaction.date));

        return (
          <article
            key={transaction.id}
            className="rounded-xl border border-border bg-surface"
          >
            {/* Main Row */}
            <div
              onClick={() => setExpandedId(isExpanded ? null : transaction.id)}
              className="
                flex cursor-pointer items-center gap-2.5
                px-3 py-2.5
              "
            >
              {/* Icon */}
              <div
                className={`
                  flex size-8 shrink-0 items-center justify-center
                  rounded-lg
                  ${
                    isIncome
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }
                `}
              >
                {isIncome ? (
                  <FiArrowDownLeft size={15} />
                ) : (
                  <FiArrowUpRight size={15} />
                )}
              </div>

              {/* Title + Category + Date */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text">
                  {transaction.title}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                  {transaction.category?.name ?? "بدون دسته‌بندی"}
                  <span className="mx-1">·</span>
                  {formattedDate}
                </p>
              </div>

              {/* Amount */}
              <p
                className={`
                  shrink-0 text-xs font-semibold
                  ${isIncome ? "text-success" : "text-destructive"}
                `}
              >
                {isIncome ? "+" : "-"}
                {Number(transaction.amount).toLocaleString("fa-IR")}
              </p>

              {/* Actions */}
              <div
                ref={isActionOpen ? actionRef : null}
                className="relative shrink-0"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    setActionId(isActionOpen ? null : transaction.id);
                  }}
                  className="
                    flex size-7 items-center justify-center
                    rounded-md
                    text-text-secondary
                    transition-colors
                    hover:bg-background
                    hover:text-text
                  "
                  aria-label="عملیات"
                >
                  <FiMoreVertical size={16} />
                </button>

                {isActionOpen && (
                  <div
                    className="
                      absolute left-0 top-full z-20 mt-1
                      min-w-32
                      rounded-lg
                      border border-border
                      bg-surface
                      p-1
                      shadow-md
                    "
                    onClick={(event) => event.stopPropagation()}
                  >
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
            </div>

            {/* Expanded Details */}
            {isExpanded && transaction.description && (
              <div className="border-t border-border px-3 py-2.5">
                <div className="flex items-start justify-between gap-4 text-xs">
                  <span className="shrink-0 text-text-secondary">توضیحات</span>

                  <span className="text-left text-text">
                    {transaction.description}
                  </span>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default TransactionCard;
