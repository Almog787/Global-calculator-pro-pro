import { useState } from 'react';

const conversions: Record<string, Record<string, (v: number) => number>> = {
  length: {
    'm-ft': v => v * 3.28084,
    'ft-m': v => v / 3.28084,
    'km-mi': v => v * 0.621371,
    'mi-km': v => v / 0.621371,
  },
  weight: {
    'kg-lbs': v => v * 2.20462,
    'lbs-kg': v => v / 2.20462,
  },
  temp: {
    'c-f': v => (v * 9/5) + 32,
    'f-c': v => (v - 32) * 5/9,
  }
};

export default function UnitConverter() {
  const [val, setVal] = useState(1);
  const [cat, setCat] = useState('length');
  const [type, setType] = useState('m-ft');

  const res = conversions[cat]?.[type]?.(val) || 0;

  return (
    <main className="w-full max-w-2xl mx-auto px-6 py-16 flex-grow">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3 text-slate-900">Unit Converter</h1>
        <p className="text-slate-500">Quickly convert lengths, weights, and temperatures.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          {['length', 'weight', 'temp'].map(c => (
            <button 
              key={c}
              onClick={() => { setCat(c); setType(Object.keys(conversions[c])[0]); }}
              className={`flex-1 py-4 font-medium capitalize text-sm transition-colors ${cat === c ? 'bg-slate-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-b-2 border-transparent'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="p-8">
          <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer">
            {Object.keys(conversions[cat]).map(k => {
              const [from, to] = k.split('-');
              return <option key={k} value={k}>{from.toUpperCase()} to {to.toUpperCase()}</option>
            })}
          </select>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-4 text-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center md:text-left" />
            
            <div className="hidden md:flex justify-center items-center text-slate-400">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
            <div className="md:hidden flex justify-center items-center text-slate-400 py-1">
              <span className="material-symbols-outlined">arrow_downward</span>
            </div>

            <div className="flex-1 bg-blue-50 border border-blue-100 text-blue-700 font-bold text-2xl px-4 py-4 rounded-lg text-center md:text-left truncate">
              {!isNaN(res) ? res.toFixed(4) : '0'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
