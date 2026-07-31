import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'he' | 'es' | 'fr' | 'ar';

type Translations = {
  [key in Language]: {
    dir: 'ltr' | 'rtl';
    title: string;
    // Common
    calculate: string;
    result: string;
    // Percentage Finder
    percFinderTitle: string;
    percFinderDesc: string;
    whatIs: string;
    percOf: string;
    isWhatPercOf: string;
    percChange: string;
    from: string;
    to: string;
    // Unit Converter
    unitConvTitle: string;
    unitConvDesc: string;
    length: string;
    weight: string;
    temp: string;
    // Mortgage
    mortgageTitle: string;
    mortgageDesc: string;
    loanAmount: string;
    interestRate: string;
    loanTerm: string;
    monthlyPayment: string;
    totalInterest: string;
    // Compound Interest
    compoundTitle: string;
    compoundDesc: string;
    initialInvestment: string;
    monthlyContribution: string;
    yearsToGrow: string;
    futureValue: string;
    totalContributions: string;
    totalInterestEarned: string;
  }
};

export const translations: Translations = {
  en: {
    dir: 'ltr',
    title: 'GlobalCalc',
    calculate: 'Calculate',
    result: 'Result',
    percFinderTitle: 'Percentage Finder',
    percFinderDesc: 'Fast and precise percentage calculations for everyday needs.',
    whatIs: 'What is',
    percOf: '% of',
    isWhatPercOf: 'is what % of',
    percChange: 'Percentage Change',
    from: 'From',
    to: 'to',
    unitConvTitle: 'Unit Converter',
    unitConvDesc: 'Quickly convert lengths, weights, and temperatures.',
    length: 'Length',
    weight: 'Weight',
    temp: 'Temp',
    mortgageTitle: 'Mortgage Calculator',
    mortgageDesc: 'Estimate your monthly payment and total interest cost.',
    loanAmount: 'Loan Amount ($)',
    interestRate: 'Annual Interest Rate (%)',
    loanTerm: 'Loan Term (Years)',
    monthlyPayment: 'Monthly Payment',
    totalInterest: 'Total Interest Paid',
    compoundTitle: 'Compound Interest',
    compoundDesc: 'Calculate the future value of your investments.',
    initialInvestment: 'Initial Investment ($)',
    monthlyContribution: 'Monthly Contribution ($)',
    yearsToGrow: 'Years to Grow',
    futureValue: 'Future Value',
    totalContributions: 'Total Contributions',
    totalInterestEarned: 'Total Interest Earned'
  },
  he: {
    dir: 'rtl',
    title: 'GlobalCalc',
    calculate: 'חשב',
    result: 'תוצאה',
    percFinderTitle: 'מחשבון אחוזים',
    percFinderDesc: 'חישוב אחוזים מהיר ומדויק לצרכים יומיומיים.',
    whatIs: 'כמה זה',
    percOf: '% מתוך',
    isWhatPercOf: 'זה איזה % מתוך',
    percChange: 'שינוי באחוזים',
    from: 'מ-',
    to: 'ל-',
    unitConvTitle: 'המרת מידות',
    unitConvDesc: 'המרת אורכים, משקלים וטמפרטורות בקלות.',
    length: 'אורך',
    weight: 'משקל',
    temp: 'טמפרטורה',
    mortgageTitle: 'מחשבון משכנתא',
    mortgageDesc: 'הערכת החזר חודשי וסך ריבית למשכנתא.',
    loanAmount: 'סכום הלוואה (₪)',
    interestRate: 'ריבית שנתית (%)',
    loanTerm: 'תקופת הלוואה (שנים)',
    monthlyPayment: 'החזר חודשי',
    totalInterest: 'סך ריבית לתשלום',
    compoundTitle: 'ריבית דריבית',
    compoundDesc: 'חישוב הערך העתידי של ההשקעות שלך.',
    initialInvestment: 'השקעה התחלתית (₪)',
    monthlyContribution: 'הפקדה חודשית (₪)',
    yearsToGrow: 'שנות צמיחה',
    futureValue: 'ערך עתידי',
    totalContributions: 'סך הפקדות',
    totalInterestEarned: 'סך ריבית שנצברה'
  },
  es: {
    dir: 'ltr',
    title: 'GlobalCalc',
    calculate: 'Calcular',
    result: 'Resultado',
    percFinderTitle: 'Calculadora de Porcentajes',
    percFinderDesc: 'Cálculos de porcentajes rápidos y precisos para necesidades diarias.',
    whatIs: '¿Cuánto es el',
    percOf: '% de',
    isWhatPercOf: 'es qué % de',
    percChange: 'Cambio Porcentual',
    from: 'De',
    to: 'a',
    unitConvTitle: 'Convertidor de Unidades',
    unitConvDesc: 'Convierte rápidamente longitudes, pesos y temperaturas.',
    length: 'Longitud',
    weight: 'Peso',
    temp: 'Temp',
    mortgageTitle: 'Calculadora de Hipotecas',
    mortgageDesc: 'Estima tu pago mensual y el costo total de los intereses.',
    loanAmount: 'Monto del Préstamo ($)',
    interestRate: 'Tasa de Interés Anual (%)',
    loanTerm: 'Plazo del Préstamo (Años)',
    monthlyPayment: 'Pago Mensual',
    totalInterest: 'Total de Intereses Pagados',
    compoundTitle: 'Interés Compuesto',
    compoundDesc: 'Calcula el valor futuro de tus inversiones.',
    initialInvestment: 'Inversión Inicial ($)',
    monthlyContribution: 'Contribución Mensual ($)',
    yearsToGrow: 'Años de Crecimiento',
    futureValue: 'Valor Futuro',
    totalContributions: 'Contribuciones Totales',
    totalInterestEarned: 'Total de Intereses Ganados'
  },
  fr: {
    dir: 'ltr',
    title: 'GlobalCalc',
    calculate: 'Calculer',
    result: 'Résultat',
    percFinderTitle: 'Calculatrice de Pourcentages',
    percFinderDesc: 'Calculs de pourcentage rapides et précis pour les besoins quotidiens.',
    whatIs: 'Quel est',
    percOf: '% de',
    isWhatPercOf: 'est quel % de',
    percChange: 'Changement en Pourcentage',
    from: 'De',
    to: 'à',
    unitConvTitle: 'Convertisseur d\'Unités',
    unitConvDesc: 'Convertissez rapidement longueurs, poids et températures.',
    length: 'Longueur',
    weight: 'Poids',
    temp: 'Temp',
    mortgageTitle: 'Calculatrice Hypothécaire',
    mortgageDesc: 'Estimez votre paiement mensuel et le coût total des intérêts.',
    loanAmount: 'Montant du Prêt (€)',
    interestRate: 'Taux d\'Intérêt Annuel (%)',
    loanTerm: 'Durée du Prêt (Années)',
    monthlyPayment: 'Paiement Mensuel',
    totalInterest: 'Total des Intérêts Payés',
    compoundTitle: 'Intérêts Composés',
    compoundDesc: 'Calculez la valeur future de vos investissements.',
    initialInvestment: 'Investissement Initial (€)',
    monthlyContribution: 'Contribution Mensuelle (€)',
    yearsToGrow: 'Années de Croissance',
    futureValue: 'Valeur Future',
    totalContributions: 'Contributions Totales',
    totalInterestEarned: 'Total des Intérêts Gagnés'
  },
  ar: {
    dir: 'rtl',
    title: 'GlobalCalc',
    calculate: 'احسب',
    result: 'النتيجة',
    percFinderTitle: 'حاسبة النسب المئوية',
    percFinderDesc: 'حسابات نسبة مئوية سريعة ودقيقة للاحتياجات اليومية.',
    whatIs: 'ما هو',
    percOf: '% من',
    isWhatPercOf: 'هو أي % من',
    percChange: 'نسبة التغير',
    from: 'من',
    to: 'إلى',
    unitConvTitle: 'محول الوحدات',
    unitConvDesc: 'تحويل الأطوال والأوزان ودرجات الحرارة بسرعة.',
    length: 'الطول',
    weight: 'الوزن',
    temp: 'الحرارة',
    mortgageTitle: 'حاسبة الرهن العقاري',
    mortgageDesc: 'تقدير الدفع الشهري وإجمالي تكلفة الفائدة.',
    loanAmount: 'مبلغ القرض',
    interestRate: 'معدل الفائدة السنوي (%)',
    loanTerm: 'مدة القرض (سنوات)',
    monthlyPayment: 'الدفع الشهري',
    totalInterest: 'إجمالي الفائدة المدفوعة',
    compoundTitle: 'الفائدة المركبة',
    compoundDesc: 'احسب القيمة المستقبلية لاستثماراتك.',
    initialInvestment: 'الاستثمار الأولي',
    monthlyContribution: 'المساهمة الشهرية',
    yearsToGrow: 'سنوات النمو',
    futureValue: 'القيمة المستقبلية',
    totalContributions: 'إجمالي المساهمات',
    totalInterestEarned: 'إجمالي الفائدة المكتسبة'
  }
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations[Language];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('he');

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang]
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
