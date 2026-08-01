import { Link } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      className="flex text-xs font-semibold text-stone-500 mb-6 space-x-2 rtl:space-x-reverse"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="hover:text-blue-600 transition-colors inline-flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[14px]">home</span>
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <span className="material-symbols-outlined text-[14px] text-stone-300 rtl:rotate-180">
            chevron_right
          </span>
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
