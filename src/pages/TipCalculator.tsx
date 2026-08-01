import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Decimal from 'decimal.js';
import { useI18n } from '../contexts/i18n';

export default function TipCalculator() {
  const { t, lang } = useI18n();
  const [bill, setBill] = useState(100);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);
  
  const [tipAmount, setTipAmount] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  useEffect(() => {
    try {
      const decBill = new Decimal(bill || 0);
      const decTipPercent = new Decimal(tipPercent || 0).div(100);
      const decTip = decBill.mul(decTipPercent);
      const decTotal = decBill.add(decTip);
      const decPeople = new Decimal(Math.max(1, people || 1));

      setTipAmount(decTip.toNumber());
      setTotalPerPerson(decTotal.div(decPeople).toNumber());
    } catch {
      setTipAmount(0);
      setTotalPerPerson(0);
    }
  }, [bill, tipPercent, people]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate', {
          event_category: 'Tip Calculator',
          bill,
          tipPercent,
          people
        });
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [bill, tipPercent, people]);

  const defaultCurrency = lang === 'he' ? 'ILS' : lang === 'fr' || lang === 'es' ? 'EUR' : 'USD';
  const currencyFormat = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: defaultCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <article className="w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/tip-calculator" />
        <title>{t.tipTitle} | {t.title}</title>
        <meta name="description" content={t.tipDesc} />
      </Helmet>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.tipTitle}</h2>
        <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-sm">{t.tipExplanation}</p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.billAmount}</label>
            <input type="number" value={bill} onChange={e => setBill(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.tipPercentage}</label>
            <input type="number" value={tipPercent} onChange={e => setTipPercent(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.numberOfPeople}</label>
            <input type="number" value={people} onChange={e => setPeople(Math.max(1, Number(e.target.value)))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="mb-6">
            <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-2">{t.totalPerPerson}</span>
            <div className="text-4xl md:text-5xl font-headline font-bold text-stone-900 tracking-tight" dir="ltr">{currencyFormat.format(totalPerPerson)}</div>
          </div>
          <div>
            <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.tipAmount}</span>
            <div className="text-lg md:text-xl font-headline text-stone-600" dir="ltr">{currencyFormat.format(tipAmount)}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
