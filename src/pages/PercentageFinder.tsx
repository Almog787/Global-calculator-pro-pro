import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

export default function PercentageFinder() {
  const { t, lang } = useI18n();
  const [val1A, setVal1A] = useState(20);
  const [val1B, setVal1B] = useState(150);
  const res1 = (val1A / 100) * val1B;

  const [val2A, setVal2A] = useState(50);
  const [val2B, setVal2B] = useState(200);
  const res2 = val2B !== 0 ? (val2A / val2B) * 100 : 0;

  const [val3A, setVal3A] = useState(100);
  const [val3B, setVal3B] = useState(120);
  const res3 = val3A !== 0 ? ((val3B - val3A) / Math.abs(val3A)) * 100 : 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate', {
          event_category: 'Percentage Finder',
          val1A, val1B,
          val2A, val2B,
          val3A, val3B
        });
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [val1A, val1B, val2A, val2B, val3A, val3B]);

  const numFormat = new Intl.NumberFormat(lang, { maximumFractionDigits: 4 });

  return (
    <main className="w-full max-w-3xl mx-auto px-4 md:px-6 flex-grow">
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold font-headline mb-3 text-slate-900">{t.percFinderTitle}</h2>
        <p className="text-slate-500">{t.percFinderDesc}</p>
      </div>

      <div className="space-y-6">
        {/* Calc 1 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 border border-slate-200">
          <h3 className="text-lg font-bold font-headline mb-6 text-slate-900">{t.whatIs} X {t.percOf} Y?</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-slate-600 font-medium whitespace-nowrap">{t.whatIs}</span>
            <input type="number" value={val1A} onChange={e => setVal1A(Number(e.target.value))} className="w-full md:w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <span className="text-slate-600 font-medium whitespace-nowrap">{t.percOf}</span>
            <input type="number" value={val1B} onChange={e => setVal1B(Number(e.target.value))} className="w-full md:w-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <span className="text-slate-400 font-bold hidden md:block">=</span>
            <div className="w-full md:w-auto bg-blue-50 text-blue-600 font-bold text-xl px-6 py-2 rounded-lg text-center flex-grow md:flex-grow-0 min-w-[120px]">
              {!isNaN(res1) ? numFormat.format(res1) : '0'}
            </div>
          </div>
        </div>

        {/* Calc 2 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 border border-slate-200">
          <h3 className="text-lg font-bold font-headline mb-6 text-slate-900">X {t.isWhatPercOf} Y?</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input type="number" value={val2A} onChange={e => setVal2A(Number(e.target.value))} className="w-full md:w-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <span className="text-slate-600 font-medium whitespace-nowrap">{t.isWhatPercOf}</span>
            <input type="number" value={val2B} onChange={e => setVal2B(Number(e.target.value))} className="w-full md:w-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <span className="text-slate-400 font-bold hidden md:block">=</span>
            <div className="w-full md:w-auto bg-blue-50 text-blue-600 font-bold text-xl px-6 py-2 rounded-lg text-center flex-grow md:flex-grow-0 min-w-[120px]" dir="ltr">
              {!isNaN(res2) ? numFormat.format(res2) : '0'}%
            </div>
          </div>
        </div>

        {/* Calc 3 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 border border-slate-200">
          <h3 className="text-lg font-bold font-headline mb-6 text-slate-900">{t.percChange}</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-slate-600 font-medium whitespace-nowrap">{t.from}</span>
            <input type="number" value={val3A} onChange={e => setVal3A(Number(e.target.value))} className="w-full md:w-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <span className="text-slate-600 font-medium whitespace-nowrap">{t.to}</span>
            <input type="number" value={val3B} onChange={e => setVal3B(Number(e.target.value))} className="w-full md:w-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <span className="text-slate-400 font-bold hidden md:block">=</span>
            <div className={`w-full md:w-auto font-bold text-xl px-6 py-2 rounded-lg text-center flex-grow md:flex-grow-0 min-w-[120px] ${res3 >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} dir="ltr">
              {!isNaN(res3) ? (res3 > 0 ? '+' : '') + numFormat.format(res3) : '0'}%
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
