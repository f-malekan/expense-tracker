import React from "react";
import { getCategories } from "@/lib/queries/category";
import CategoryTable from "../../components/Category/CategoryTable";
import AddCategoryButton from "../../components/Category/AddCategoryButton";
import EmptyState from "@/app/components/Base/EmptyState";
import ErrorState from "@/app/components/Base/ErrorState";

const CategoriesPage = async () => {
  const { data: categories, success } = await getCategories();
  if (!success) return <ErrorState />;
  if (!categories) {
    return <EmptyState />;
  }

  return (
    <div>
      <AddCategoryButton />
      <CategoryTable categories={categories} />;
    </div>
  );
};

export default CategoriesPage;
