import { useState, useEffect } from 'react';

export default function MortgageCalculator() {
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

  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-16 flex-grow">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3 text-slate-900">Mortgage Calculator</h1>
        <p className="text-slate-500">Estimate your monthly payment and total interest cost.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="p-8 md:col-span-3 space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Loan Amount ($)</label>
              <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Annual Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Loan Term (Years)</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
          </div>
          
          <div className="p-8 bg-slate-50 md:col-span-2 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-sm font-medium text-slate-500 block mb-1">Monthly Payment</span>
              <div className="text-4xl font-headline font-bold text-blue-600">{currencyFormat.format(monthlyPayment)}</div>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-500 block mb-1">Total Interest Paid</span>
              <div className="text-xl font-medium text-slate-900">{currencyFormat.format(totalInterest)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
