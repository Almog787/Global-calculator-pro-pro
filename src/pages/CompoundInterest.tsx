import { useState, useEffect } from 'react';

export default function CompoundInterest() {
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

  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-16 flex-grow">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3 text-slate-900">Compound Interest</h1>
        <p className="text-slate-500">Calculate the future value of your investments.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="p-8 md:col-span-3 space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Initial Investment ($)</label>
              <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Monthly Contribution ($)</label>
              <input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Annual Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Years to Grow</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
          </div>
          
          <div className="p-8 bg-slate-50 md:col-span-2 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-sm font-medium text-slate-500 block mb-1">Future Value</span>
              <div className="text-4xl font-headline font-bold text-blue-600">{currencyFormat.format(futureValue)}</div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-slate-500 block mb-1">Total Contributions</span>
                <div className="text-xl font-medium text-slate-900">{currencyFormat.format(totalContributions)}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-500 block mb-1">Total Interest Earned</span>
                <div className="text-xl font-medium text-green-600">+{currencyFormat.format(totalInterest)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
