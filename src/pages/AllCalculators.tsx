import { useState } from "react";
import { Link } from "react-router-dom";
import { calculators } from "../data/calculators";
import { Helmet } from "react-helmet-async";
import { useI18n } from "../contexts/i18n";

export default function AllCalculators() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "finance", label: "Finance & Money" },
    { id: "real-estate", label: "Real Estate" },
    { id: "health", label: "Health & Body" },
    { id: "math", label: "Math & Conversions" },
    { id: "tech", label: "Tech & Engineering" },
    { id: "lifestyle", label: "Lifestyle & Everyday" },
  ];

  const filtered =
    activeCategory === "all"
      ? calculators
      : calculators.filter((c) => c.category === activeCategory);

  return (
    <div className="w-full">
      <Helmet>
        <title>All Calculators | Global Calc Pro</title>
        <meta
          name="description"
          content="Browse our complete collection of precision calculators."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-headline text-stone-900 tracking-tight mb-2">
          Calculator Library
        </h1>
        <p className="text-stone-500">
          Find the perfect tool for your calculations.
        </p>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide space-x-2 rtl:space-x-reverse mb-8 pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((calc) => (
          <Link
            key={calc.id}
            to={calc.path}
            className="group flex flex-col p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold font-headline text-stone-900 group-hover:text-blue-600 transition-colors">
                {calc.fallbackTitle}
              </span>
              <span className="material-symbols-outlined text-stone-300 group-hover:text-blue-500 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                arrow_forward
              </span>
            </div>
            <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
              {calc.description}
            </p>
            <div className="mt-4 pt-4 border-t border-stone-100 flex gap-2 overflow-hidden">
              {calc.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase font-bold tracking-wider text-stone-700 bg-stone-100 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
