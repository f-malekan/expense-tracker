import React from "react";
import { getCategories } from "@/lib/queries/category";
import CategoryTable from "../components/Category/CategoryTable";
import AddCategoryButton from "../components/Category/AddCategoryButton";

const CategoriesPage = async () => {
  const { data: categories, success, message } = await getCategories();
  if (!categories) {
    return;
  }

  return (
    <div>
      <AddCategoryButton />
      <CategoryTable categories={categories} />;
    </div>
  );
};

export default CategoriesPage;
