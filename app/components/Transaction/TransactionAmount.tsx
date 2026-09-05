import { TransactionType } from "@/app/generated/prisma/enums";
import React from "react";

interface Props {
  transactionType: TransactionType;
  amount: string;
}

const TransactionAmount = ({ transactionType, amount }: Props) => {
  const isIncome = transactionType === "INCOME";

  return (
    <p
      className={`
                  shrink-0 text-xs font-semibold
                  ${isIncome ? "text-success" : "text-destructive"}
                `}
    >
      {isIncome ? "+" : "-"}
      {Number(amount).toLocaleString("fa-IR")}
    </p>
  );
};

export default TransactionAmount;
