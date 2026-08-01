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
    percFinderExplanation: string;
    whatIs: string;
    percOf: string;
    isWhatPercOf: string;
    percChange: string;
    from: string;
    to: string;
    // Unit Converter
    unitConvTitle: string;
    unitConvDesc: string;
    unitConvExplanation: string;
    length: string;
    weight: string;
    temp: string;
    // Mortgage
    mortgageTitle: string;
    mortgageDesc: string;
    mortgageExplanation: string;
    loanAmount: string;
    interestRate: string;
    loanTerm: string;
    monthlyPayment: string;
    totalInterest: string;
    // Compound Interest
    compoundTitle: string;
    compoundDesc: string;
    compoundExplanation: string;
    initialInvestment: string;
    monthlyContribution: string;
    yearsToGrow: string;
    futureValue: string;
    footerCalculators?: string;
    footerLegal?: string;
    footerRights?: string;
    footerDisclaimer?: string;
    notFoundTitle?: string;
    notFoundDesc?: string;
    backToHome?: string;
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
    percFinderExplanation: 'Use this calculator to find percentages, calculate discounts, or determine the percentage difference between two numbers.',
    whatIs: 'What is',
    percOf: '% of',
    isWhatPercOf: 'is what % of',
    percChange: 'Percentage Change',
    from: 'From',
    to: 'to',
    unitConvTitle: 'Unit Converter',
    unitConvDesc: 'Quickly convert lengths, weights, and temperatures.',
    unitConvExplanation: 'Select the category and units you want to convert from and to, then enter a value to instantly see the result.',
    length: 'Length',
    weight: 'Weight',
    temp: 'Temp',
    mortgageTitle: 'Mortgage Calculator',
    mortgageDesc: 'Estimate your monthly payment and total interest cost.',
    mortgageExplanation: 'Enter your loan amount, interest rate, and term to see your estimated monthly payment and the total interest you will pay over the life of the loan.',
    loanAmount: 'Loan Amount ($)',
    interestRate: 'Annual Interest Rate (%)',
    loanTerm: 'Loan Term (Years)',
    monthlyPayment: 'Monthly Payment',
    totalInterest: 'Total Interest Paid',
    compoundTitle: 'Compound Interest',
    compoundDesc: 'Calculate the future value of your investments.',
    compoundExplanation: 'See how your money can grow over time with compound interest by inputting your initial investment, regular contributions, and expected return rate.',
    initialInvestment: 'Initial Investment ($)',
    monthlyContribution: 'Monthly Contribution ($)',
    yearsToGrow: 'Years to Grow',
    futureValue: 'Future Value',
    totalContributions: 'Total Contributions',
    totalInterestEarned: 'Total Interest Earned',

    bmiTitle: 'BMI Calculator',
    bmiDesc: 'Check your Body Mass Index.',
    bmiExplanation: 'Enter your height and weight to calculate your BMI and see which category you fall into.',
    height: 'Height',
    weightBmi: 'Weight',
    bmiResult: 'Your BMI',
    bmiCategory: 'Category',

    tipTitle: 'Tip Calculator',
    tipDesc: 'Calculate tips and split bills easily.',
    tipExplanation: 'Enter the bill amount and tip percentage to calculate the total and how much each person should pay.',
    billAmount: 'Bill Amount',
    tipPercentage: 'Tip %',
    numberOfPeople: 'Number of People',
    tipAmount: 'Tip Amount',
    totalPerPerson: 'Total per Person',

    salaryTitle: 'Salary Calculator',
    salaryDesc: 'Convert hourly, weekly, monthly, and annual salaries.',
    salaryExplanation: 'Enter your salary in any frequency to see the equivalent amount in other frequencies.',
    salaryAmount: 'Salary Amount',
    salaryFrequency: 'Frequency',
    hourly: 'Hourly',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',

    ageTitle: 'Age Calculator',
    ageDesc: 'Calculate your exact age in years, months, and days.',
    ageExplanation: 'Enter your date of birth to find out exactly how old you are today.',
    dateOfBirth: 'Date of Birth',
    exactAge: 'Exact Age',
    yearsOld: 'Years',
    monthsOld: 'Months',
    daysOld: 'Days',
    // Contact & Legal & About
    contactTitle: 'Contact Us',
    contactDesc: 'Get in touch with the GlobalCalc Pro team.',
    contactExplanation: 'Have a question, feedback, or suggestion? Send us a message using the form below.',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    messageSentSuccess: 'Thank you! Your message has been sent successfully.',
    contactInfoNote: 'Contact details will be updated soon. You can use the form above for any inquiries.',

    privacyTitle: 'Privacy Policy',
    privacyDesc: 'Learn how GlobalCalc Pro protects your privacy and data.',
    termsTitle: 'Terms of Service',
    termsDesc: 'Read our terms and conditions for using GlobalCalc Pro.',
    aboutTitle: 'About Us',
    aboutDesc: 'Discover GlobalCalc Pro - free, fast, and accessible online calculation tools.',

    footerCalculators: 'Calculators',
    footerLegal: 'Legal & Info',
    footerRights: 'All rights reserved.',
    footerDisclaimer: 'Calculations provided on this site are for informational purposes only.',
    notFoundTitle: 'Page Not Found',
    notFoundDesc: 'The page you are looking for does not exist or has been moved.',
    backToHome: 'Back to Home',
  },
  he: {
    dir: 'rtl',
    title: 'GlobalCalc',
    calculate: 'חשב',
    result: 'תוצאה',
    percFinderTitle: 'מחשבון אחוזים',
    percFinderDesc: 'חישוב אחוזים מהיר ומדויק לצרכים יומיומיים.',
    percFinderExplanation: 'השתמשו במחשבון זה למציאת אחוזים, חישוב הנחות, או בדיקת אחוז שינוי בין שני מספרים.',
    whatIs: 'כמה זה',
    percOf: '% מתוך',
    isWhatPercOf: 'זה איזה % מתוך',
    percChange: 'שינוי באחוזים',
    from: 'מ-',
    to: 'ל-',
    unitConvTitle: 'המרת מידות',
    unitConvDesc: 'המרת אורכים, משקלים וטמפרטורות בקלות.',
    unitConvExplanation: 'בחרו את הקטגוריה והיחידות שתרצו להמיר, ולאחר מכן הזינו ערך כדי לראות את התוצאה באופן מיידי.',
    length: 'אורך',
    weight: 'משקל',
    temp: 'טמפרטורה',
    mortgageTitle: 'מחשבון משכנתא',
    mortgageDesc: 'הערכת החזר חודשי וסך ריבית למשכנתא.',
    mortgageExplanation: 'הזינו את סכום ההלוואה, הריבית והתקופה כדי לראות את ההחזר החודשי המשוער וסך הריבית שתשלמו במהלך חיי ההלוואה.',
    loanAmount: 'סכום הלוואה (₪)',
    interestRate: 'ריבית שנתית (%)',
    loanTerm: 'תקופת הלוואה (שנים)',
    monthlyPayment: 'החזר חודשי',
    totalInterest: 'סך ריבית לתשלום',
    compoundTitle: 'ריבית דריבית',
    compoundDesc: 'חישוב הערך העתידי של ההשקעות שלך.',
    compoundExplanation: 'בדקו כיצד הכסף שלכם יכול לצמוח לאורך זמן בעזרת ריבית דריבית, על ידי הזנת השקעה ראשונית, הפקדות קבועות וריבית צפויה.',
    initialInvestment: 'השקעה התחלתית (₪)',
    monthlyContribution: 'הפקדה חודשית (₪)',
    yearsToGrow: 'שנות צמיחה',
    futureValue: 'ערך עתידי',
    totalContributions: 'סך הפקדות',
    totalInterestEarned: 'סך ריבית שנצברה',

    bmiTitle: 'מחשבון BMI',
    bmiDesc: 'בדוק את מדד מסת הגוף שלך.',
    bmiExplanation: 'הזן את הגובה והמשקל שלך כדי לחשב את ה-BMI שלך ולראות לאיזו קטגוריה אתה שייך.',
    height: 'גובה',
    weightBmi: 'משקל',
    bmiResult: 'ה-BMI שלך',
    bmiCategory: 'קטגוריה',

    tipTitle: 'מחשבון טיפים',
    tipDesc: 'חשב טיפים ופצל חשבונות בקלות.',
    tipExplanation: 'הזן את סכום החשבון ואחוז הטיפ כדי לחשב את הסך הכל וכמה כל אדם צריך לשלם.',
    billAmount: 'סכום החשבון',
    tipPercentage: 'אחוז טיפ',
    numberOfPeople: 'מספר אנשים',
    tipAmount: 'סכום הטיפ',
    totalPerPerson: 'סך הכל לאדם',

    salaryTitle: 'מחשבון שכר',
    salaryDesc: 'המרת שכר שעתי, שבועי, חודשי ושנתי.',
    salaryExplanation: 'הזן את השכר שלך בכל תדירות כדי לראות את הסכום המקביל בתדירויות אחרות.',
    salaryAmount: 'סכום השכר',
    salaryFrequency: 'תדירות',
    hourly: 'שעתי',
    weekly: 'שבועי',
    monthly: 'חודשי',
    yearly: 'שנתי',

    ageTitle: 'מחשבון גיל',
    ageDesc: 'חשב את גילך המדויק בשנים, חודשים וימים.',
    ageExplanation: 'הזן את תאריך הלידה שלך כדי לגלות בדיוק בן כמה אתה היום.',
    dateOfBirth: 'תאריך לידה',
    exactAge: 'גיל מדויק',
    yearsOld: 'שנים',
    monthsOld: 'חודשים',
    daysOld: 'ימים',
    // Contact & Legal & About
    contactTitle: 'צור קשר',
    contactDesc: 'צור קשר עם צוות GlobalCalc Pro.',
    contactExplanation: 'יש לך שאלה, משוב או הצעה? שלח לנו הודעה באמצעות הטופס למטה.',
    fullName: 'שם מלא',
    emailAddress: 'כתובת אימייל',
    subject: 'נושא',
    message: 'הודעה',
    sendMessage: 'שלח הודעה',
    messageSentSuccess: 'תודה! ההודעה שלך נשלחה בהצלחה.',
    contactInfoNote: 'פרטי התקשרות יעודכנו בקרוב. ניתן להשתמש בטופס שלמעלה לכל פנייה.',

    privacyTitle: 'מדיניות פרטיות',
    privacyDesc: 'למד כיצד GlobalCalc Pro מגינה על הפרטיות והנתונים שלך.',
    termsTitle: 'תנאי שימוש',
    termsDesc: 'קרא את תנאי השימוש עבור GlobalCalc Pro.',
    aboutTitle: 'אודותינו',
    aboutDesc: 'גלה את GlobalCalc Pro - כלי חישוב מקוונים חינמיים, מהירים ונגישים.',

    footerCalculators: 'מחשבונים',
    footerLegal: 'מידע ומשפטי',
    footerRights: 'כל הזכויות שמורות.',
    footerDisclaimer: 'החישובים המסופקים באתר זה נועדו למטרות מידע בלבד.',
    notFoundTitle: 'העמוד לא נמצא',
    notFoundDesc: 'העמוד שחיפשת אינו קיים או שהועבר לכתובת אחרת.',
    backToHome: 'חזרה לדף הבית',
  },
  es: {
    dir: 'ltr',
    title: 'GlobalCalc',
    calculate: 'Calcular',
    result: 'Resultado',
    percFinderTitle: 'Calculadora de Porcentajes',
    percFinderDesc: 'Cálculos de porcentajes rápidos y precisos para necesidades diarias.',
    percFinderExplanation: 'Utilice esta calculadora para encontrar porcentajes, calcular descuentos o determinar la diferencia porcentual entre dos números.',
    whatIs: '¿Cuánto es el',
    percOf: '% de',
    isWhatPercOf: 'es qué % de',
    percChange: 'Cambio Porcentual',
    from: 'De',
    to: 'a',
    unitConvTitle: 'Convertidor de Unidades',
    unitConvDesc: 'Convierte rápidamente longitudes, pesos y temperaturas.',
    unitConvExplanation: 'Seleccione la categoría y las unidades que desea convertir, luego ingrese un valor para ver el resultado al instante.',
    length: 'Longitud',
    weight: 'Peso',
    temp: 'Temp',
    mortgageTitle: 'Calculadora de Hipotecas',
    mortgageDesc: 'Estima tu pago mensual y el costo total de los intereses.',
    mortgageExplanation: 'Ingrese el monto del préstamo, la tasa de interés y el plazo para ver su pago mensual estimado y el interés total que pagará durante la vigencia del préstamo.',
    loanAmount: 'Monto del Préstamo ($)',
    interestRate: 'Tasa de Interés Anual (%)',
    loanTerm: 'Plazo del Préstamo (Años)',
    monthlyPayment: 'Pago Mensual',
    totalInterest: 'Total de Intereses Pagados',
    compoundTitle: 'Interés Compuesto',
    compoundDesc: 'Calcula el valor futuro de tus inversiones.',
    compoundExplanation: 'Vea cómo su dinero puede crecer con el tiempo con interés compuesto ingresando su inversión inicial, contribuciones regulares y tasa de retorno esperada.',
    initialInvestment: 'Inversión Inicial ($)',
    monthlyContribution: 'Contribución Mensual ($)',
    yearsToGrow: 'Años de Crecimiento',
    futureValue: 'Valor Futuro',
    totalContributions: 'Contribuciones Totales',
    totalInterestEarned: 'Total de Intereses Ganados',

    bmiTitle: 'Calculadora de IMC',
    bmiDesc: 'Comprueba tu Índice de Masa Corporal.',
    bmiExplanation: 'Ingresa tu altura y peso para calcular tu IMC y ver en qué categoría te encuentras.',
    height: 'Altura',
    weightBmi: 'Peso',
    bmiResult: 'Tu IMC',
    bmiCategory: 'Categoría',

    tipTitle: 'Calculadora de Propinas',
    tipDesc: 'Calcula propinas y divide cuentas fácilmente.',
    tipExplanation: 'Ingresa el monto de la cuenta y el porcentaje de propina para calcular el total y cuánto debe pagar cada persona.',
    billAmount: 'Monto de la Cuenta',
    tipPercentage: '% de Propina',
    numberOfPeople: 'Número de Personas',
    tipAmount: 'Monto de Propina',
    totalPerPerson: 'Total por Persona',

    salaryTitle: 'Calculadora de Salario',
    salaryDesc: 'Convierte salarios por hora, semanales, mensuales y anuales.',
    salaryExplanation: 'Ingresa tu salario en cualquier frecuencia para ver el monto equivalente en otras frecuencias.',
    salaryAmount: 'Monto del Salario',
    salaryFrequency: 'Frecuencia',
    hourly: 'Por Hora',
    weekly: 'Semanal',
    monthly: 'Mensual',
    yearly: 'Anual',

    ageTitle: 'Calculadora de Edad',
    ageDesc: 'Calcula tu edad exacta en años, meses y días.',
    ageExplanation: 'Ingresa tu fecha de nacimiento para descubrir exactamente cuántos años tienes hoy.',
    dateOfBirth: 'Fecha de Nacimiento',
    exactAge: 'Edad Exacta',
    yearsOld: 'Años',
    monthsOld: 'Meses',
    daysOld: 'Días',
    // Contact & Legal & About
    contactTitle: 'Contacto',
    contactDesc: 'Póngase en contacto con el equipo de GlobalCalc Pro.',
    contactExplanation: '¿Tiene preguntas, comentarios o sugerencias? Envíenos un mensaje con el formulario.',
    fullName: 'Nombre Completo',
    emailAddress: 'Correo Electrónico',
    subject: 'Asunto',
    message: 'Mensaje',
    sendMessage: 'Enviar Mensaje',
    messageSentSuccess: '¡Gracias! Su mensaje ha sido enviado con éxito.',
    contactInfoNote: 'Los detalles de contacto se actualizarán pronto. Puede utilizar el formulario anterior para cualquier consulta.',

    privacyTitle: 'Política de Privacidad',
    privacyDesc: 'Aprenda cómo GlobalCalc Pro protege su privacidad y sus datos.',
    termsTitle: 'Términos de Servicio',
    termsDesc: 'Lea nuestros términos y condiciones de uso para GlobalCalc Pro.',
    aboutTitle: 'Sobre Nosotros',
    aboutDesc: 'Descubra GlobalCalc Pro: herramientas de cálculo en línea gratuitas, rápidas y accesibles.',

    footerCalculators: 'Calculadoras',
    footerLegal: 'Información y Legal',
    footerRights: 'Todos los derechos reservados.',
    footerDisclaimer: 'Los cálculos proporcionados son solo para fines informativos.',
    notFoundTitle: 'Página no encontrada',
    notFoundDesc: 'La página que buscas no existe o ha sido movida.',
    backToHome: 'Volver al Inicio',
  },
  fr: {
    dir: 'ltr',
    title: 'GlobalCalc',
    calculate: 'Calculer',
    result: 'Résultat',
    percFinderTitle: 'Calculatrice de Pourcentages',
    percFinderDesc: 'Calculs de pourcentage rapides et précis pour les besoins quotidiens.',
    percFinderExplanation: 'Utilisez cette calculatrice pour trouver des pourcentages, calculer des remises ou déterminer la différence en pourcentage entre deux nombres.',
    whatIs: 'Quel est',
    percOf: '% de',
    isWhatPercOf: 'est quel % de',
    percChange: 'Changement en Pourcentage',
    from: 'De',
    to: 'à',
    unitConvTitle: 'Convertisseur d\'Unités',
    unitConvDesc: 'Convertissez rapidement longueurs, poids et températures.',
    unitConvExplanation: 'Sélectionnez la catégorie et les unités que vous souhaitez convertir, puis entrez une valeur pour voir instantanément le résultat.',
    length: 'Longueur',
    weight: 'Poids',
    temp: 'Temp',
    mortgageTitle: 'Calculatrice Hypothécaire',
    mortgageDesc: 'Estimez votre paiement mensuel et le coût total des intérêts.',
    mortgageExplanation: 'Entrez le montant de votre prêt, le taux d\'intérêt et la durée pour voir votre paiement mensuel estimé et les intérêts totaux que vous paierez sur la durée du prêt.',
    loanAmount: 'Montant du Prêt (€)',
    interestRate: 'Taux d\'Intérêt Annuel (%)',
    loanTerm: 'Durée du Prêt (Années)',
    monthlyPayment: 'Paiement Mensuel',
    totalInterest: 'Total des Intérêts Payés',
    compoundTitle: 'Intérêts Composés',
    compoundDesc: 'Calculez la valeur future de vos investissements.',
    compoundExplanation: 'Voyez comment votre argent peut fructifier au fil du temps grâce aux intérêts composés en entrant votre investissement initial, vos contributions régulières et le taux de rendement attendu.',
    initialInvestment: 'Investissement Initial (€)',
    monthlyContribution: 'Contribution Mensuelle (€)',
    yearsToGrow: 'Années de Croissance',
    futureValue: 'Valeur Future',
    totalContributions: 'Contributions Totales',
    totalInterestEarned: 'Total des Intérêts Gagnés',

    bmiTitle: 'Calculatrice IMC',
    bmiDesc: 'Vérifiez votre Indice de Masse Corporelle.',
    bmiExplanation: 'Entrez votre taille et votre poids pour calculer votre IMC et voir dans quelle catégorie vous vous situez.',
    height: 'Taille',
    weightBmi: 'Poids',
    bmiResult: 'Votre IMC',
    bmiCategory: 'Catégorie',

    tipTitle: 'Calculatrice de Pourboire',
    tipDesc: 'Calculez les pourboires et divisez les additions facilement.',
    tipExplanation: 'Entrez le montant de l\'addition et le pourcentage de pourboire pour calculer le total et combien chaque personne doit payer.',
    billAmount: 'Montant de l\'Addition',
    tipPercentage: '% de Pourboire',
    numberOfPeople: 'Nombre de Personnes',
    tipAmount: 'Montant du Pourboire',
    totalPerPerson: 'Total par Personne',

    salaryTitle: 'Calculatrice de Salaire',
    salaryDesc: 'Convertissez les salaires horaires, hebdomadaires, mensuels et annuels.',
    salaryExplanation: 'Entrez votre salaire pour n\'importe quelle fréquence afin de voir le montant équivalent pour d\'autres fréquences.',
    salaryAmount: 'Montant du Salaire',
    salaryFrequency: 'Fréquence',
    hourly: 'Horaire',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',

    ageTitle: 'Calculatrice d\'Âge',
    ageDesc: 'Calculez votre âge exact en années, mois et jours.',
    ageExplanation: 'Entrez votre date de naissance pour découvrir exactement quel âge vous avez aujourd\'hui.',
    dateOfBirth: 'Date de Naissance',
    exactAge: 'Âge Exact',
    yearsOld: 'Années',
    monthsOld: 'Mois',
    daysOld: 'Jours',
    // Contact & Legal & About
    contactTitle: 'Contactez-nous',
    contactDesc: 'Prenez contact avec l\'équipe de GlobalCalc Pro.',
    contactExplanation: 'Vous avez une question, une remarque ou une suggestion ? Envoyez-nous un message ci-dessous.',
    fullName: 'Nom Complet',
    emailAddress: 'Adresse E-mail',
    subject: 'Sujet',
    message: 'Message',
    sendMessage: 'Envoyer le Message',
    messageSentSuccess: 'Merci ! Votre message a été envoyé avec succès.',
    contactInfoNote: 'Les coordonnées seront bientôt mises à jour. Vous pouvez utiliser le formulaire ci-dessus pour toute demande.',

    privacyTitle: 'Politique de Confidentialité',
    privacyDesc: 'Découvrez comment GlobalCalc Pro protège votre vie privée et vos données.',
    termsTitle: 'Conditions d\'Utilisation',
    termsDesc: 'Lisez nos conditions d\'utilisation pour GlobalCalc Pro.',
    aboutTitle: 'À Propos',
    aboutDesc: 'Découvrez GlobalCalc Pro - des outils de calcul en ligne gratuits, rapides et accessibles.',

    footerCalculators: 'Calculatrices',
    footerLegal: 'Informations Légales',
    footerRights: 'Tous droits réservés.',
    footerDisclaimer: 'Les calculs fournis sur ce site sont à titre indicatif uniquement.',
    notFoundTitle: 'Page non trouvée',
    notFoundDesc: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    backToHome: 'Retour à l\'Accueil',
  },
  ar: {
    dir: 'rtl',
    title: 'GlobalCalc',
    calculate: 'احسب',
    result: 'النتيجة',
    percFinderTitle: 'حاسبة النسب المئوية',
    percFinderDesc: 'حسابات نسبة مئوية سريعة ودقيقة للاحتياجات اليومية.',
    percFinderExplanation: 'استخدم هذه الحاسبة للعثور على النسب المئوية، وحساب الخصومات، أو تحديد الفرق بالنسبة المئوية بين رقمين.',
    whatIs: 'ما هو',
    percOf: '% من',
    isWhatPercOf: 'هو أي % من',
    percChange: 'نسبة التغير',
    from: 'من',
    to: 'إلى',
    unitConvTitle: 'محول الوحدات',
    unitConvDesc: 'تحويل الأطوال والأوزان ودرجات الحرارة بسرعة.',
    unitConvExplanation: 'حدد الفئة والوحدات التي ترغب في التحويل منها وإليها، ثم أدخل قيمة لرؤية النتيجة فوراً.',
    length: 'الطول',
    weight: 'الوزن',
    temp: 'الحرارة',
    mortgageTitle: 'حاسبة الرهن العقاري',
    mortgageDesc: 'تقدير الدفع الشهري وإجمالي تكلفة الفائدة.',
    mortgageExplanation: 'أدخل مبلغ القرض، ومعدل الفائدة، والمدة لمعرفة الدفعة الشهرية المقدرة وإجمالي الفائدة التي ستدفعها على مدار فترة القرض.',
    loanAmount: 'مبلغ القرض',
    interestRate: 'معدل الفائدة السنوي (%)',
    loanTerm: 'مدة القرض (سنوات)',
    monthlyPayment: 'الدفع الشهري',
    totalInterest: 'إجمالي الفائدة المدفوعة',
    compoundTitle: 'الفائدة المركبة',
    compoundDesc: 'احسب القيمة المستقبلية لاستثماراتك.',
    compoundExplanation: 'شاهد كيف يمكن لأموالك أن تنمو بمرور الوقت مع الفائدة المركبة عن طريق إدخال استثمارك الأولي، والمساهمات المنتظمة، ومعدل العائد المتوقع.',
    initialInvestment: 'الاستثمار الأولي',
    monthlyContribution: 'المساهمة الشهرية',
    yearsToGrow: 'سنوات النمو',
    futureValue: 'القيمة المستقبلية',
    totalContributions: 'إجمالي المساهمات',
    totalInterestEarned: 'إجمالي الفائدة المكتسبة',
    notFoundTitle: 'الصفحة غير موجودة',
    notFoundDesc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    backToHome: 'العودة إلى الصفحة الرئيسية',
  }
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations[Language];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const savedLang = localStorage.getItem('globalcalc_lang') as Language;
  if (savedLang && translations[savedLang]) return savedLang;
  
  // Default to American English explicitly
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage());

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang === 'en' ? 'en-US' : lang;
    localStorage.setItem('globalcalc_lang', lang);
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
