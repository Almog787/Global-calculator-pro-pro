import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '../contexts/i18n';

const conversions: Record<string, Record<string, (v: number) => number>> = {
  length: {
    'm-ft': v => v * 3.2808398950131,
    'ft-m': v => v / 3.2808398950131,
    'km-mi': v => v * 0.62137119223733,
    'mi-km': v => v / 0.62137119223733,
  },
  weight: {
    'kg-lbs': v => v * 2.2046226218488,
    'lbs-kg': v => v / 2.2046226218488,
  },
  temp: {
    'c-f': v => (v * 9/5) + 32,
    'f-c': v => (v - 32) * 5/9,
  }
};

export default function UnitConverter() {
  const { t, lang } = useI18n();
  const [val, setVal] = useState(1);
  const [cat, setCat] = useState('length');
  const [type, setType] = useState('m-ft');

  const res = conversions[cat]?.[type]?.(val) || 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate', {
          event_category: 'Unit Converter',
          category: cat,
          conversion_type: type,
          value: val
        });
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [val, cat, type]);

  const numFormat = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { maximumFractionDigits: 4 });

  const categoryNames: Record<string, string> = {
    length: t.length,
    weight: t.weight,
    temp: t.temp
  };

  return (
    <article className="w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/unit-converter" />
        <title>{t.unitConvTitle} | {t.title}</title>
        <meta name="description" content={t.unitConvDesc} />
      </Helmet>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.unitConvTitle}</h2>
        <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-sm">{t.unitConvExplanation}</p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex border-b border-stone-200">
            {['length', 'weight', 'temp'].map(c => (
              <button 
                key={c}
                onClick={() => { setCat(c); setType(Object.keys(conversions[c])[0]); }}
                className={`flex-1 pb-3 pt-2 font-bold uppercase tracking-wider text-xs transition-colors border-b-2 -mb-[2px] ${cat === c ? 'text-stone-900 border-stone-900' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
              >
                {categoryNames[c]}
              </button>
            ))}
          </div>

          <div>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-stone-50/50 border-0 border-b-2 border-stone-200 px-3 py-3 text-stone-900 font-medium focus:ring-0 focus:border-stone-900 transition-colors cursor-pointer appearance-none" dir="ltr">
              {Object.keys(conversions[cat]).map(k => {
                const [from, to] = k.split('-');
                return <option key={k} value={k}>{from.toUpperCase()} ➝ {to.toUpperCase()}</option>
              })}
            </select>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">Input</label>
              <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="mb-2">
            <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-2">Result</span>
            <div className="text-4xl md:text-5xl font-headline font-bold text-stone-900 tracking-tight truncate" dir="ltr">
              {!isNaN(res) ? numFormat.format(res) : '0'}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
