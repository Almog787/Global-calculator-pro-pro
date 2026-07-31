import { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
const MortgageCalculator = lazy(() => import('./pages/MortgageCalculator'));
const CompoundInterest = lazy(() => import('./pages/CompoundInterest'));
const PercentageFinder = lazy(() => import('./pages/PercentageFinder'));
const UnitConverter = lazy(() => import('./pages/UnitConverter'));
const BmiCalculator = lazy(() => import('./pages/BmiCalculator'));
const TipCalculator = lazy(() => import('./pages/TipCalculator'));
const SalaryCalculator = lazy(() => import('./pages/SalaryCalculator'));
const AgeCalculator = lazy(() => import('./pages/AgeCalculator'));

import { useI18n } from './contexts/i18n';

function App() {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  const tabs = [
    { id: 'mortgage', path: '/mortgage-calculator', label: t.mortgageTitle },
    { id: 'compound', path: '/compound-interest', label: t.compoundTitle },
    { id: 'percentage', path: '/percentage-finder', label: t.percFinderTitle },
    { id: 'unit', path: '/unit-converter', label: t.unitConvTitle },
    { id: 'bmi', path: '/bmi-calculator', label: t.bmiTitle },
    { id: 'tip', path: '/tip-calculator', label: t.tipTitle },
    { id: 'salary', path: '/salary-calculator', label: t.salaryTitle },
    { id: 'age', path: '/age-calculator', label: t.ageTitle },
  ];

  return (
    <div className={`min-h-screen bg-stone-50 font-body text-stone-900 pb-20 ${t.dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <header className="w-full bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black font-headline tracking-tight text-stone-900">
            {t.title}<span className="text-blue-600">.</span>
          </Link>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
            className="bg-stone-100 border-none text-stone-700 text-sm rounded-lg px-4 py-2 cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 mt-2">
          <nav className="flex space-x-2 md:space-x-4 rtl:space-x-reverse overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`whitespace-nowrap px-4 py-3 font-semibold text-sm rounded-t-lg transition-colors border-b-[3px] ${isActive ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div></div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/mortgage-calculator" replace />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterest />} />
          <Route path="/percentage-finder" element={<PercentageFinder />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/tip-calculator" element={<TipCalculator />} />
          <Route path="/salary-calculator" element={<SalaryCalculator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
        </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
