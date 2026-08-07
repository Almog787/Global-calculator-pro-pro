import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/i18n';

export default function Footer() {
  const { t } = useI18n();

  const calculatorLinks = [
    { path: '/mortgage-calculator', label: t.mortgageTitle },
    { path: '/compound-interest', label: t.compoundTitle },
    { path: '/percentage-finder', label: t.percFinderTitle },
    { path: '/unit-converter', label: t.unitConvTitle },
    { path: '/bmi-calculator', label: t.bmiTitle },
    { path: '/tip-calculator', label: t.tipTitle },
    { path: '/salary-calculator', label: t.salaryTitle },
    { path: '/age-calculator', label: t.ageTitle },
  ];

  const extraCalculators = [
    { path: '/calculators/auto-loan', label: 'Auto Loan' },
    { path: '/calculators/roi', label: 'ROI Calculator' },
    { path: '/calculators/margin', label: 'Margin Calculator' },
    { path: '/calculators/cap-rate', label: 'Cap Rate' },
    { path: '/calculators/freelance-net-income', label: 'Freelance Net Income' },
    { path: '/calculators/debt-snowball', label: 'Debt Snowball' },
    { path: '/calculators/fuel-split', label: 'Fuel Split' },
    { path: '/calculators/goal-savings', label: 'Goal Savings' },
    { path: '/calculators/download-time', label: 'Download Time' },
    { path: '/calculators/peltier-cooling', label: 'Peltier Cooling' },
    { path: '/calculators/rent-vs-buy', label: 'Rent vs Buy' },
  ];

  const legalLinks = [
    { path: '/suggest', label: t.suggestionsTitle },
    { path: '/about', label: t.aboutTitle },
    { path: '/contact', label: t.contactTitle },
    { path: '/privacy-policy', label: t.privacyTitle },
    { path: '/terms-of-service', label: t.termsTitle },
  ];

  return (
    <footer className="bg-primary-container dark:bg-primary-container mt-stack-lg w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md max-w-container-max mx-auto gap-base">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-on-primary-container hover:text-secondary-fixed transition-colors duration-200 cursor-pointer">
            {t.title}<span className="text-secondary-fixed">.</span>
          </Link>
          <p className="font-label-sm text-label-sm text-on-primary-container/80">
            &copy; {new Date().getFullYear()} GlobalCalc. {t.footerRights}
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4">
          <Link to="/privacy-policy" className="font-label-sm text-label-sm text-on-primary-container/80 hover:text-secondary-fixed transition-colors cursor-pointer">
            {t.privacyTitle}
          </Link>
          <Link to="/terms-of-service" className="font-label-sm text-label-sm text-on-primary-container/80 hover:text-secondary-fixed transition-colors cursor-pointer">
            {t.termsTitle}
          </Link>
          <Link to="/contact" className="font-label-sm text-label-sm text-on-primary-container/80 hover:text-secondary-fixed transition-colors cursor-pointer">
            {t.contactTitle}
          </Link>
          <Link to="/all" className="font-label-sm text-label-sm text-on-primary-container/80 hover:text-secondary-fixed transition-colors cursor-pointer">
            {t.catAll}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
