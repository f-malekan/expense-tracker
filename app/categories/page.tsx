import React from "react";
import { getCategories } from "../../lib/actions/category";

const CategoriesPage = async () => {
  const { data: categories, success, message } = await getCategories();
  if (!categories) {
    return;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead className="bg-background border-b border-border">
          <tr>
            <th className="text-right px-6 py-4 font-medium text-text">
              نام دسته‌بندی
            </th>
            <th className="text-right px-6 py-4 font-medium text-text">
              تاریخ ایجاد
            </th>
            <th className="text-center px-6 py-4 font-medium text-text">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
            >
              <td className="px-6 py-4 text-text font-medium">
                {category.name}
              </td>
              <td className="px-6 py-4 text-text-secondary">
                {new Date(category.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  ویرایش
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
