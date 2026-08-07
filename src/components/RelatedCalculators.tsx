import { Link } from "react-router-dom";
import { getRelatedCalculators, CalculatorMeta } from "../data/calculators";
import { useI18n } from "../contexts/i18n";

export default function RelatedCalculators({
  currentId,
}: {
  currentId: string;
}) {
  const { t } = useI18n();
  const related = getRelatedCalculators(currentId, 3);

  if (related.length === 0) return null;

  const getTitle = (calc: CalculatorMeta) => {
    if (calc.titleKey && t[calc.titleKey as keyof typeof t]) {
      return t[calc.titleKey as keyof typeof t] as string;
    }
    return calc.fallbackTitle;
  };

  const sectionHeading = t.dir === 'rtl' ? 'מחשבונים קשורים' : 'Related Calculators';

  return (
    <div className="mt-12 pt-8 border-t border-stone-200">
      <h2 className="text-sm font-bold uppercase tracking-wider text-stone-600 mb-6">
        {sectionHeading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((calc) => (
          <Link
            key={calc.id}
            to={calc.path}
            className="group flex flex-col p-4 bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                {getTitle(calc)}
              </span>
              <span className="material-symbols-outlined text-[16px] text-stone-400 group-hover:text-blue-500 rtl:rotate-180">
                arrow_forward
              </span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
