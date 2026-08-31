import { TransactionType } from "@/app/generated/prisma/enums";

export interface CategoryType {
  id: string;
  name: string;
  type: TransactionType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}