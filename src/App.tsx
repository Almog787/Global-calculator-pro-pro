import MortgageCalculator from './pages/MortgageCalculator';
import CompoundInterest from './pages/CompoundInterest';
import PercentageFinder from './pages/PercentageFinder';
import UnitConverter from './pages/UnitConverter';
import { useI18n } from './i18n';

function App() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className={`min-h-screen bg-[#F9FAFB] font-body text-slate-900 pb-20 ${t.dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-headline tracking-tight text-slate-900">
            {t.title}<span className="text-blue-600">.</span>
          </h1>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-pointer"
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </header>

      <div className="space-y-8 mt-6">
        <PercentageFinder />
        <div className="max-w-4xl mx-auto border-t border-slate-200"></div>
        <MortgageCalculator />
        <div className="max-w-4xl mx-auto border-t border-slate-200"></div>
        <UnitConverter />
        <div className="max-w-4xl mx-auto border-t border-slate-200"></div>
        <CompoundInterest />
      </div>
    </div>
  );
}

export default App;
