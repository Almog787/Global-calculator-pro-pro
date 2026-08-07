import { useState } from "react";
import { Link } from "react-router-dom";
import { calculators } from "../data/calculators";
import { Helmet } from "react-helmet-async";
import { useI18n } from "../contexts/i18n";

const dynamicTitles: Record<string, Record<string, string>> = {
  "auto-loan": {
    he: "מחשבון הלוואה לרכב",
    en: "Auto Loan Calculator",
    es: "Calculadora de Préstamo de Auto",
    fr: "Calculatrice de Prêt Auto",
    ar: "حاسبة قروض السيارات",
  },
  roi: {
    he: "מחשבון החזר השקעה (ROI)",
    en: "ROI Calculator",
    es: "Calculadora de ROI",
    fr: "Calculatrice de ROI",
    ar: "حاسبة العائد على الاستثمار",
  },
  margin: {
    he: "מחשבון רווח ושולי רווח",
    en: "Margin Calculator",
    es: "Calculadora de Margen",
    fr: "Calculatrice de Marge",
    ar: "حاسبة الهامش والربح",
  },
  "cap-rate": {
    he: "מחשבון שיעור תשואה נטו (Cap Rate)",
    en: "Cap Rate Calculator",
    es: "Calculadora de Cap Rate",
    fr: "Calculatrice de Taux de Capitalisation",
    ar: "حاسبة معدل الرأسمالية",
  },
  "freelance-net-income": {
    he: "מחשבון הכנסה נטו לפרילנסרים",
    en: "Freelance Net Income",
    es: "Ingreso Neto Freelance",
    fr: "Revenu Net Freelance",
    ar: "صافي الدخل للمستقلين",
  },
  "debt-snowball": {
    he: "מחשבון סילוק חובות (כדור שלג)",
    en: "Debt Snowball",
    es: "Bola de Nieve de Deudas",
    fr: "Boule de Neige de Dettes",
    ar: "كرة الثلج لسداد الديون",
  },
  "fuel-split": {
    he: "מחשבון השתתפות בדלק",
    en: "Fuel Split",
    es: "División de Combustible",
    fr: "Partage de Carburant",
    ar: "تقاسم الوقود",
  },
  "goal-savings": {
    he: "מחשבון חיסכון ליעד",
    en: "Goal Savings",
    es: "Ahorro para Meta",
    fr: "Épargne Objectif",
    ar: "الادخار للهدف",
  },
  "download-time": {
    he: "מחשבון זמן הורדה",
    en: "Download Time",
    es: "Tiempo de Descarga",
    fr: "Temps de Téléchargement",
    ar: "وقت التنزيل",
  },
  "peltier-cooling": {
    he: "מחשבון קירור פלטייה (Peltier)",
    en: "Peltier Cooling",
    es: "Enfriamiento Peltier",
    fr: "Refroidissement Peltier",
    ar: "التبريد بعنصر بيلتير",
  },
  "rent-vs-buy": {
    he: "מחשבון קנייה או שכירות",
    en: "Rent vs Buy Calculator",
    es: "Alquilar vs Comprar",
    fr: "Louer vs Acheter",
    ar: "الإيجار مقابل الشراء",
  },
};

export default function AllCalculators() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: t.catAll },
    { id: "finance", label: t.catFinance },
    { id: "real-estate", label: t.catRealEstate },
    { id: "health", label: t.catHealth },
    { id: "math", label: t.catMath },
    { id: "tech", label: t.catTech },
    { id: "lifestyle", label: t.catLifestyle },
  ];

  const filtered =
    activeCategory === "all"
      ? calculators
      : calculators.filter((c) => c.category === activeCategory);

  const getTitle = (calc: (typeof calculators)[0]) => {
    if (calc.titleKey && t[calc.titleKey as keyof typeof t]) {
      return t[calc.titleKey as keyof typeof t] as string;
    }
    if (dynamicTitles[calc.id]?.[lang]) {
      return dynamicTitles[calc.id][lang];
    }
    return calc.fallbackTitle;
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>{t.libraryTitle} | {t.title}</title>
        <meta
          name="description"
          content={t.librarySubtitle}
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-headline text-stone-900 tracking-tight mb-2 font-bold">
          {t.libraryTitle}
        </h1>
        <p className="text-stone-500 font-medium">
          {t.librarySubtitle}
        </p>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide space-x-2 rtl:space-x-reverse mb-8 pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
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
        {filtered.map((calc) => {
          const title = getTitle(calc);
          return (
            <Link
              key={calc.id}
              to={calc.path}
              className="group flex flex-col p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold font-headline text-stone-900 group-hover:text-blue-600 transition-colors">
                  {title}
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
          );
        })}
      </div>
    </div>
  );
}
