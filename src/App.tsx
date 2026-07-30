import MortgageCalculator from './pages/MortgageCalculator';
import CompoundInterest from './pages/CompoundInterest';
import PercentageFinder from './pages/PercentageFinder';
import UnitConverter from './pages/UnitConverter';

function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-body text-slate-900 pb-20">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-center items-center">
          <h1 className="text-2xl font-bold font-headline tracking-tight text-slate-900">
            GlobalCalc<span className="text-blue-600">.</span>
          </h1>
        </div>
      </header>

      <div className="space-y-8">
        <MortgageCalculator />
        <div className="max-w-4xl mx-auto border-t border-slate-200"></div>
        <CompoundInterest />
        <div className="max-w-4xl mx-auto border-t border-slate-200"></div>
        <PercentageFinder />
        <div className="max-w-4xl mx-auto border-t border-slate-200"></div>
        <UnitConverter />
      </div>
    </div>
  );
}

export default App;
