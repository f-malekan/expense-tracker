import { CategoryType } from "@/lib/types/category";
import CategoryActionColumn from "./CategoryActionColumn";

interface Props {
  categories: CategoryType[];
}

const CategoryTable = ({ categories }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-background">
          <tr>
            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              نام دسته‌بندی
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              تاریخ ایجاد
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => {

            return (
              <tr
                key={category.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-background/60"
              >
                <td className="px-5 py-4 font-medium text-text">
                  {category.name}
                </td>

                <td className="px-5 py-4 text-text-secondary">
                  {new Intl.DateTimeFormat("fa-IR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(category.createdAt))}
                </td>

                <td className="px-5 py-4">
                  <CategoryActionColumn category={category} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
