import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionTypeIcon from "./TransactionTypeIcon";
import TransactionAmount from "./TransactionAmount";
import TransactionCardActions from "./TransactionCardActions";
import TransactionCardDescription from "./TransactionCardDescription";
import { formatDate } from "@/lib/utils/transaction";

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
  return (
    <div className={`space-y-1 ${className}`}>
      {transactions.map((transaction) => {
        return (
          <article
            key={transaction.id}
            className="rounded-xl border border-border bg-surface"
          >
            <div className="flex cursor-pointer items-center gap-2.5 p-3">
              <TransactionTypeIcon transactionType={transaction.type} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text">
                  {transaction.title}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                  {transaction.category?.name ?? "بدون دسته‌بندی"}
                  <span className="mx-1">·</span>
                  {formatDate(transaction.date)}
                </p>
              </div>

              <TransactionAmount
                transactionType={transaction.type}
                amount={transaction.amount}
              />

              <TransactionCardActions
                transaction={transaction}
                categories={categories}
              />
            </div>

            {transaction.description && (
              <TransactionCardDescription
                transactionId={transaction.id}
                description={transaction.description}
              />
            )}
          </article>
        );
      })}
    </div>
  );
};

export default TransactionCard;
