import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

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
    <main className="w-full max-w-4xl mx-auto px-4 md:px-6 flex-grow">
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold font-headline mb-3 text-slate-900">{t.compoundTitle}</h2>
        <p className="text-slate-500">{t.compoundDesc}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 rtl:md:divide-x-reverse">
          <div className="p-5 md:p-8 md:col-span-3 space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t.initialInvestment}</label>
              <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t.monthlyContribution}</label>
              <input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t.interestRate}</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t.yearsToGrow}</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
          </div>
          
          <div className="p-5 md:p-8 bg-slate-50 md:col-span-2 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-sm font-medium text-slate-500 block mb-1">{t.futureValue}</span>
              <div className="text-3xl md:text-4xl font-headline font-bold text-blue-600" dir="ltr">{currencyFormat.format(futureValue)}</div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-slate-500 block mb-1">{t.totalContributions}</span>
                <div className="text-xl font-medium text-slate-900" dir="ltr">{currencyFormat.format(totalContributions)}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-500 block mb-1">{t.totalInterestEarned}</span>
                <div className="text-xl font-medium text-green-600" dir="ltr">+{currencyFormat.format(totalInterest)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
