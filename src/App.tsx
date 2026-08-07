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
const AllCalculators = lazy(() => import('./pages/AllCalculators'));
const CalculatorWrapper = lazy(() => import('./pages/CalculatorWrapper'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const SuggestFeature = lazy(() => import('./pages/SuggestFeature'));
const NotFound = lazy(() => import('./pages/NotFound'));

import { useI18n } from './contexts/i18n';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

import SkeletonLoader from './components/SkeletonLoader';

function App() {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  const tabs = [
    { id: 'all', path: '/all', label: t.allTools },
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
          <Link to="/" className="text-2xl font-black font-headline tracking-tight text-stone-900 shrink-0">
            {t.title}<span className="text-blue-600">.</span>
          </Link>
          <div className="hidden md:block flex-1 max-w-sm mx-4">
            <SearchBar />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/suggest"
              aria-label={t.suggestionsTitle || 'Suggest Feature'}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors border border-blue-200/80 shadow-xs"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">lightbulb</span>
              <span className="sr-only sm:not-sr-only sm:inline">{t.suggestionsTitle || 'Suggest Feature'}</span>
            </Link>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)}
              aria-label="Select Language"
              className="bg-stone-100 border-none text-stone-700 text-sm rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            >
              <option value="he">עברית</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
        <div className="md:hidden px-4 mb-3 mt-1">
          <SearchBar />
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 mt-2">
          <nav className="flex space-x-2 md:space-x-4 rtl:space-x-reverse overflow-x-auto scrollbar-hide" aria-label="Main Navigation">
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

      <main id="main-content" className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <Suspense fallback={<SkeletonLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/all" replace />} />
          <Route path="/all" element={<AllCalculators />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterest />} />
          <Route path="/percentage-finder" element={<PercentageFinder />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/tip-calculator" element={<TipCalculator />} />
          <Route path="/salary-calculator" element={<SalaryCalculator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/calculators/:slug" element={<CalculatorWrapper />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/suggest" element={<SuggestFeature />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
