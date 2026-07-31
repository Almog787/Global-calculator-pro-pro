import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '../contexts/i18n';

export default function CompoundInterest() {
  const { t, lang } = useI18n();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [contribution, setContribution] = useState(500);

  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    let fv = 0;
    
    if (r === 0) {
      fv = principal + (contribution * n);
    } else {
      fv = principal * Math.pow(1 + r, n) + contribution * ((Math.pow(1 + r, n) - 1) / r);
    }
    
    const tc = principal + (contribution * n);
    const ti = fv - tc;
    
    setFutureValue(fv);
    setTotalContributions(tc);
    setTotalInterest(ti);
  }, [principal, rate, years, contribution]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate', {
          event_category: 'Compound Interest',
          principal,
          rate,
          years,
          contribution
        });
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [principal, rate, years, contribution]);

  const defaultCurrency = lang === 'he' ? 'ILS' : lang === 'fr' || lang === 'es' ? 'EUR' : 'USD';
  const currencyFormat = new Intl.NumberFormat(lang, { style: 'currency', currency: defaultCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <article className="w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/compound-interest" />
        <title>{t.compoundTitle} | {t.title}</title>
        <meta name="description" content={t.compoundDesc} />
      </Helmet>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.compoundTitle}</h2>
        <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-sm">{t.compoundExplanation}</p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.initialInvestment}</label>
            <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.monthlyContribution}</label>
            <input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.interestRate}</label>
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.yearsToGrow}</label>
            <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="mb-6">
            <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-2">{t.futureValue}</span>
            <div className="text-4xl md:text-5xl font-headline font-bold text-stone-900 tracking-tight" dir="ltr">{currencyFormat.format(futureValue)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.totalContributions}</span>
              <div className="text-lg md:text-xl font-headline text-stone-600" dir="ltr">{currencyFormat.format(totalContributions)}</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.totalInterestEarned}</span>
              <div className="text-lg md:text-xl font-headline text-stone-600" dir="ltr">+{currencyFormat.format(totalInterest)}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
