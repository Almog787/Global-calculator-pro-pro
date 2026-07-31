import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { useI18n } from '../contexts/i18n';

export default function MortgageCalculator() {
  const { t, lang } = useI18n();
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    let mp = 0;
    
    if (monthlyRate === 0) {
      mp = principal / numberOfPayments;
    } else {
      mp = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
    
    if (isNaN(mp) || !isFinite(mp)) mp = 0;
    const totalPaid = mp * numberOfPayments;
    const ti = totalPaid - principal;
    setMonthlyPayment(mp);
    setTotalInterest(ti);
  }, [principal, rate, years]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate', {
          event_category: 'Mortgage Calculator',
          principal,
          rate,
          years
        });
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [principal, rate, years]);

  const defaultCurrency = lang === 'he' ? 'ILS' : lang === 'fr' || lang === 'es' ? 'EUR' : 'USD';
  const currencyFormat = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: defaultCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const chartData = [
    { name: t.loanAmount, value: principal },
    { name: t.totalInterest, value: totalInterest }
  ];
  const COLORS = ['#2563eb', '#f59e0b'];

  return (
    <article className="w-full h-full flex flex-col lg:flex-row bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200 gap-10">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/mortgage-calculator" />
        <title>{t.mortgageTitle} | {t.title}</title>
        <meta name="description" content={t.mortgageDesc} />
      </Helmet>
      
      <div className="flex-1 flex flex-col">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.mortgageTitle}</h2>
          <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-sm">{t.mortgageExplanation}</p>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-8">
            <div>
              <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.loanAmount}</label>
              <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            </div>
            <div>
              <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.interestRate}</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            </div>
            <div>
              <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.loanTerm}</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl md:text-3xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-stone-200">
            <div className="mb-6">
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-2">{t.monthlyPayment}</span>
              <div className="text-4xl md:text-5xl font-headline font-bold text-stone-900 tracking-tight" dir="ltr">{currencyFormat.format(monthlyPayment)}</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.totalInterest}</span>
              <div className="text-lg md:text-xl font-headline text-stone-600" dir="ltr">{currencyFormat.format(totalInterest)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center min-h-[300px] border-t lg:border-t-0 lg:border-l lg:rtl:border-r lg:rtl:border-l-0 border-stone-200 pt-10 lg:pt-0 lg:pl-10 lg:rtl:pr-10 lg:rtl:pl-0">
        <div className="w-full h-full min-h-[300px]" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number) => currencyFormat.format(value)}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}
