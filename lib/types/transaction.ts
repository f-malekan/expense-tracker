export interface TransactionDataType {
  id: string;
  title: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  description: string | null;
  date: Date;

  userId: string;
  categoryId: string;

  createdAt: Date;
  updatedAt: Date;
}