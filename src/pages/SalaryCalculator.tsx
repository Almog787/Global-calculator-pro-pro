import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '../contexts/i18n';

export default function SalaryCalculator() {
  const { t, lang } = useI18n();
  const [amount, setAmount] = useState(50000);
  const [frequency, setFrequency] = useState('yearly');
  
  const [results, setResults] = useState({
    hourly: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  });

  useEffect(() => {
    let yearlyAmount = 0;
    
    switch(frequency) {
      case 'hourly':
        yearlyAmount = amount * 40 * 52;
        break;
      case 'weekly':
        yearlyAmount = amount * 52;
        break;
      case 'monthly':
        yearlyAmount = amount * 12;
        break;
      case 'yearly':
      default:
        yearlyAmount = amount;
        break;
    }
    
    setResults({
      hourly: yearlyAmount / (40 * 52),
      weekly: yearlyAmount / 52,
      monthly: yearlyAmount / 12,
      yearly: yearlyAmount
    });
  }, [amount, frequency]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate', {
          event_category: 'Salary Calculator',
          amount,
          frequency
        });
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [amount, frequency]);

  const defaultCurrency = lang === 'he' ? 'ILS' : lang === 'fr' || lang === 'es' ? 'EUR' : 'USD';
  const currencyFormat = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: defaultCurrency, minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return (
    <article className="w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/salary-calculator" />
        <title>{t.salaryTitle} | {t.title}</title>
        <meta name="description" content={t.salaryDesc} />
      </Helmet>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.salaryTitle}</h2>
        <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-sm">{t.salaryExplanation}</p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.salaryAmount}</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.salaryFrequency}</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors cursor-pointer">
              <option value="hourly">{t.hourly}</option>
              <option value="weekly">{t.weekly}</option>
              <option value="monthly">{t.monthly}</option>
              <option value="yearly">{t.yearly}</option>
            </select>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.hourly}</span>
              <div className="text-xl md:text-2xl font-headline text-stone-900" dir="ltr">{currencyFormat.format(results.hourly)}</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.weekly}</span>
              <div className="text-xl md:text-2xl font-headline text-stone-900" dir="ltr">{currencyFormat.format(results.weekly)}</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.monthly}</span>
              <div className="text-xl md:text-2xl font-headline text-stone-900" dir="ltr">{currencyFormat.format(results.monthly)}</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.yearly}</span>
              <div className="text-xl md:text-2xl font-headline text-stone-900" dir="ltr">{currencyFormat.format(results.yearly)}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
