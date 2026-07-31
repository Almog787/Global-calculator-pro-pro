import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '../contexts/i18n';

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
    <article className="w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/percentage-finder" />
        <title>{t.percFinderTitle} | {t.title}</title>
        <meta name="description" content={t.percFinderDesc} />
      </Helmet>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.percFinderTitle}</h2>
        <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-sm">{t.percFinderExplanation}</p>
      </div>

      <div className="flex-1 flex flex-col space-y-10">
        {/* Calc 1 */}
        <div className="relative">
          <h3 className="text-sm tracking-wider uppercase font-bold text-stone-400 mb-4">{t.whatIs} X {t.percOf} Y?</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 bg-stone-50/50 p-4 rounded-xl border border-stone-100">
            <span className="text-stone-500 font-medium whitespace-nowrap">{t.whatIs}</span>
            <input type="number" value={val1A} onChange={e => setVal1A(Number(e.target.value))} className="w-full md:w-24 bg-transparent border-0 border-b-2 border-stone-200 px-1 py-1 text-center text-xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            <span className="text-stone-500 font-medium whitespace-nowrap">{t.percOf}</span>
            <input type="number" value={val1B} onChange={e => setVal1B(Number(e.target.value))} className="w-full md:w-32 bg-transparent border-0 border-b-2 border-stone-200 px-1 py-1 text-center text-xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            <span className="text-stone-300 font-bold hidden md:block">=</span>
            <div className="w-full md:w-auto text-stone-900 font-bold text-2xl px-4 py-2 text-center md:text-right flex-grow min-w-[100px]">
              {!isNaN(res1) ? numFormat.format(res1) : '0'}
            </div>
          </div>
        </div>

        {/* Calc 2 */}
        <div className="relative">
          <h3 className="text-sm tracking-wider uppercase font-bold text-stone-400 mb-4">X {t.isWhatPercOf} Y?</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 bg-stone-50/50 p-4 rounded-xl border border-stone-100">
            <input type="number" value={val2A} onChange={e => setVal2A(Number(e.target.value))} className="w-full md:w-32 bg-transparent border-0 border-b-2 border-stone-200 px-1 py-1 text-center text-xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            <span className="text-stone-500 font-medium whitespace-nowrap">{t.isWhatPercOf}</span>
            <input type="number" value={val2B} onChange={e => setVal2B(Number(e.target.value))} className="w-full md:w-32 bg-transparent border-0 border-b-2 border-stone-200 px-1 py-1 text-center text-xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            <span className="text-stone-300 font-bold hidden md:block">=</span>
            <div className="w-full md:w-auto text-stone-900 font-bold text-2xl px-4 py-2 text-center md:text-right flex-grow min-w-[100px]" dir="ltr">
              {!isNaN(res2) ? numFormat.format(res2) : '0'}%
            </div>
          </div>
        </div>

        {/* Calc 3 */}
        <div className="relative">
          <h3 className="text-sm tracking-wider uppercase font-bold text-stone-400 mb-4">{t.percChange}</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 bg-stone-50/50 p-4 rounded-xl border border-stone-100">
            <span className="text-stone-500 font-medium whitespace-nowrap">{t.from}</span>
            <input type="number" value={val3A} onChange={e => setVal3A(Number(e.target.value))} className="w-full md:w-32 bg-transparent border-0 border-b-2 border-stone-200 px-1 py-1 text-center text-xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            <span className="text-stone-500 font-medium whitespace-nowrap">{t.to}</span>
            <input type="number" value={val3B} onChange={e => setVal3B(Number(e.target.value))} className="w-full md:w-32 bg-transparent border-0 border-b-2 border-stone-200 px-1 py-1 text-center text-xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            <span className="text-stone-300 font-bold hidden md:block">=</span>
            <div className={`w-full md:w-auto font-bold text-2xl px-4 py-2 text-center md:text-right flex-grow min-w-[100px] ${res3 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} dir="ltr">
              {!isNaN(res3) ? (res3 > 0 ? '+' : '') + numFormat.format(res3) : '0'}%
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
