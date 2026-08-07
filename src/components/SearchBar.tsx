import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchCalculators, CalculatorMeta } from "../data/calculators";
import { useI18n } from "../contexts/i18n";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<CalculatorMeta[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      setResults(searchCalculators(query));
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (path: string) => {
    setQuery("");
    setIsOpen(false);
    navigate(path);
  };

  const getTitle = (calc: CalculatorMeta) => {
    if (calc.titleKey && t[calc.titleKey as keyof typeof t]) {
      return t[calc.titleKey as keyof typeof t] as string;
    }
    return calc.fallbackTitle;
  };

  const placeholderText = t.dir === 'rtl' ? 'חפש מחשבון...' : 'Search calculators...';

  return (
    <div className="relative w-full max-w-md" ref={ref}>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </span>
        <input
          type="text"
          className="w-full bg-stone-100/80 border-none text-stone-900 text-sm rounded-xl pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 transition-colors font-medium placeholder:text-stone-400"
          placeholder={placeholderText}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim().length > 1) setIsOpen(true);
          }}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden max-h-[300px] overflow-y-auto">
          {results.length > 0 ? (
            <ul className="py-1">
              {results.map((calc) => (
                <li key={calc.id}>
                  <button
                    onClick={() => handleSelect(calc.path)}
                    className="w-full text-left rtl:text-right px-4 py-2 hover:bg-stone-50 focus:bg-stone-50 outline-none flex flex-col gap-0.5 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-stone-900">
                      {getTitle(calc)}
                    </span>
                    <span className="text-xs text-stone-500 truncate">
                      {calc.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-stone-500 text-center">
              {t.dir === 'rtl' ? 'לא נמצאו מחשבונים' : 'No calculators found.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
