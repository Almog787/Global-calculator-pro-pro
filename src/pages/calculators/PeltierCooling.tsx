import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Decimal from 'decimal.js';
import { Bar } from 'react-chartjs-2';
import { useI18n } from '../../contexts/i18n';

const localDict = {
  en: {
    title: 'Peltier Cooling Calculator',
    description: 'Calculate the expected cooling capacity and efficiency (COP) of a Thermoelectric Cooler.',
    maxCooling: 'Max Cooling Power (Qmax in Watts)',
    maxDeltaT: 'Max Temp Difference (ΔTmax in °C)',
    operatingDeltaT: 'Operating Temp Difference (ΔT in °C)',
    voltage: 'Operating Voltage (V)',
    current: 'Operating Current (A)',
    coolingCapacity: 'Actual Cooling Capacity',
    powerConsumption: 'Power Consumption',
    cop: 'Coefficient of Performance (COP)',
  },
  he: {
    title: 'מחשבון קירור פלטייה (Peltier)',
    description: 'חשב את עוצמת הקירור ואת מקדם היעילות (COP) של רכיב קירור תרמואלקטרי.',
    maxCooling: 'הספק קירור מקסימלי (Qmax בוואט)',
    maxDeltaT: 'הפרש טמפ\' מקסימלי (ΔTmax ב-°C)',
    operatingDeltaT: 'הפרש טמפ\' בפועל (ΔT ב-°C)',
    voltage: 'מתח עבודה (V)',
    current: 'זרם עבודה (A)',
    coolingCapacity: 'הספק קירור בפועל',
    powerConsumption: 'צריכת חשמל',
    cop: 'מקדם יעילות (COP)',
  }
};

export default function PeltierCooling() {
  const { lang, t: globalT } = useI18n();
  const t = localDict[lang as keyof typeof localDict] || localDict.en;

  const [qmax, setQmax] = useState(60);
  const [deltaTmax, setDeltaTmax] = useState(67);
  const [operatingDeltaT, setOperatingDeltaT] = useState(20);
  const [voltage, setVoltage] = useState(12);
  const [current, setCurrent] = useState(5);

  const [results, setResults] = useState({ capacity: 0, power: 0, cop: 0 });

  useEffect(() => {
    try {
      const decQmax = new Decimal(qmax || 0);
      const decDtMax = new Decimal(deltaTmax || 1);
      const decOpDt = new Decimal(operatingDeltaT || 0);
      const decV = new Decimal(voltage || 0);
      const decI = new Decimal(current || 0);

      // Linear approximation: Qc = Qmax * (1 - dT/dTmax)
      let capacity = decQmax.mul(new Decimal(1).sub(decOpDt.div(decDtMax)));
      if (capacity.isNegative()) capacity = new Decimal(0);

      const power = decV.mul(decI);
      
      let cop = new Decimal(0);
      if (!power.isZero()) {
        cop = capacity.div(power);
      }

      setResults({
        capacity: capacity.toNumber(),
        power: power.toNumber(),
        cop: cop.toNumber(),
      });
    } catch {
      setResults({ capacity: 0, power: 0, cop: 0 });
    }
  }, [qmax, deltaTmax, operatingDeltaT, voltage, current]);

  const chartData = {
    labels: [t.coolingCapacity, t.powerConsumption],
    datasets: [{
      label: 'Watts (W)',
      data: [results.capacity, results.power],
      backgroundColor: ['#3b82f6', '#ef4444'],
      borderRadius: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw.toFixed(2)} W`,
        }
      }
    },
    scales: {
      y: {
        title: { display: true, text: 'Watts (W)' },
        grid: { color: '#f3f4f6' },
      },
      x: { grid: { display: false } },
    }
  };

  return (
    <article className="w-full h-full flex flex-col lg:flex-row bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200 gap-10">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/calculators/peltier-cooling" />
        <title>{t.title} | {globalT.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="flex-[1.5] flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-headline text-stone-900 tracking-tight mb-3">{t.title}</h1>
          <p className="text-stone-500 font-medium text-[15px] leading-relaxed max-w-md">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.maxCooling}</label>
            <input type="number" value={qmax} onChange={e => setQmax(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.maxDeltaT}</label>
            <input type="number" value={deltaTmax} onChange={e => setDeltaTmax(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.operatingDeltaT}</label>
            <input type="number" value={operatingDeltaT} onChange={e => setOperatingDeltaT(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-blue-200 px-0 py-2 text-2xl font-headline text-blue-700 focus:ring-0 focus:border-blue-700 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.voltage}</label>
            <input type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-400 mb-1 block">{t.current}</label>
            <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-stone-200 px-0 py-2 text-2xl font-headline text-stone-900 focus:ring-0 focus:border-stone-900 transition-colors" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="grid grid-cols-3 gap-x-4 gap-y-8">
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.coolingCapacity}</span>
              <div className="text-2xl md:text-3xl font-headline text-blue-600" dir="ltr">{results.capacity.toFixed(1)}W</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.powerConsumption}</span>
              <div className="text-xl md:text-2xl font-headline text-stone-900" dir="ltr">{results.power.toFixed(1)}W</div>
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase font-bold text-stone-400 block mb-1">{t.cop}</span>
              <div className="text-xl md:text-2xl font-headline text-stone-900" dir="ltr">{results.cop.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l lg:rtl:border-r lg:rtl:border-l-0 border-stone-200 pt-10 lg:pt-0 lg:pl-10 lg:rtl:pr-10 lg:rtl:pl-0">
        <div className="w-full h-[320px]" dir="ltr">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </article>
  );
}
