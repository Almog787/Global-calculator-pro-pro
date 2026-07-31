import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
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
  const currencyFormat = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: defaultCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const compactCurrencyFormat = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: defaultCurrency, notation: 'compact', compactDisplay: 'short', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const chartData = useMemo(() => {
    const data = [];
    const r = rate / 100 / 12;
    
    for (let i = 0; i <= years; i++) {
      const n = i * 12;
      let fv = 0;
      if (r === 0) {
        fv = principal + (contribution * n);
      } else {
        fv = principal * Math.pow(1 + r, n) + contribution * ((Math.pow(1 + r, n) - 1) / r);
      }
      const tc = principal + (contribution * n);
      const ti = fv - tc;
      data.push({
        year: i,
        [t.totalContributions]: Math.round(tc),
        [t.totalInterestEarned]: Math.round(ti)
      });
    }
    return data;
  }, [principal, rate, years, contribution, t.totalContributions, t.totalInterestEarned]);

  return (
    <article className="w-full h-full flex flex-col lg:flex-row bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200 gap-10">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/compound-interest" />
        <title>{t.compoundTitle} | {t.title}</title>
        <meta name="description" content={t.compoundDesc} />
      </Helmet>
      
      <div className="flex-1 flex flex-col">
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
      </div>

      <div className="flex-[1.5] flex flex-col justify-center items-center min-h-[400px] border-t lg:border-t-0 lg:border-l lg:rtl:border-r lg:rtl:border-l-0 border-stone-200 pt-10 lg:pt-0 lg:pl-10 lg:rtl:pr-10 lg:rtl:pl-0">
        <div className="w-full h-full min-h-[400px]" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#78716c', fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => val === 0 ? '0' : `${val}Y`}
              />
              <YAxis 
                tick={{ fill: '#78716c', fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => compactCurrencyFormat.format(val)}
                width={80}
              />
              <RechartsTooltip 
                formatter={(value: number) => currencyFormat.format(value)}
                labelFormatter={(label) => `${label} Years`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey={t.totalContributions} stackId="1" stroke="#2563eb" fill="url(#colorContributions)" strokeWidth={2} />
              <Area type="monotone" dataKey={t.totalInterestEarned} stackId="1" stroke="#f59e0b" fill="url(#colorInterest)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}
