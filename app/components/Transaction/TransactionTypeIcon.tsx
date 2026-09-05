import { TransactionType } from "@/app/generated/prisma/enums";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";

const TransactionTypeIcon = ({
  transactionType,
}: {
  transactionType: TransactionType;
}) => {
  const isIncome = transactionType === "INCOME";

  return (
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
      {isIncome ? <FiArrowDownLeft size={15} /> : <FiArrowUpRight size={15} />}
    </div>
  );
};

export default TransactionTypeIcon;
