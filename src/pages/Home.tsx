import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 flex-grow flex flex-col">
      <header className="max-w-3xl mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Precision tools for everyday calculations.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Fast, clean, and accurate calculators designed to help you manage finances, convert units, and analyze data without the clutter.
        </p>
      </header>

      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/mortgage-calculator" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
              <span className="material-symbols-outlined text-3xl block">real_estate_agent</span>
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Mortgage Calculator</h3>
              <p className="text-slate-500 leading-relaxed">Calculate monthly payments and total interest for your home loan.</p>
            </div>
          </Link>

          <Link to="/compound-interest" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
              <span className="material-symbols-outlined text-3xl block">payments</span>
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Compound Interest</h3>
              <p className="text-slate-500 leading-relaxed">Project the future value of your investments over time.</p>
            </div>
          </Link>

          <Link to="/percentage" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
              <span className="material-symbols-outlined text-3xl block">percent</span>
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Percentage Finder</h3>
              <p className="text-slate-500 leading-relaxed">Quickly find percentages, discounts, and relative changes.</p>
            </div>
          </Link>

          <Link to="/unit-converter" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
              <span className="material-symbols-outlined text-3xl block">straighten</span>
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Unit Converter</h3>
              <p className="text-slate-500 leading-relaxed">Convert between metric and imperial measurements instantly.</p>
            </div>
          </Link>
        </div>
      </section>

      <article className="max-w-3xl border-t border-slate-200 pt-16">
        <h2 className="text-2xl font-bold font-headline mb-6 text-slate-900">Built for clarity</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            At GlobalCalc, we believe software should respect your time. Our tools load instantly, require no account to use, and process all calculations directly on your device for complete privacy.
          </p>
          <p>
            Whether you are analyzing a major financial decision or making a quick conversion, you deserve accurate results presented without unnecessary complexity.
          </p>
        </div>
      </article>
    </main>
  );
}
