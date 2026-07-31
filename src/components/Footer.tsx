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

  const legalLinks = [
    { path: '/about', label: t.aboutTitle },
    { path: '/contact', label: t.contactTitle },
    { path: '/privacy-policy', label: t.privacyTitle },
    { path: '/terms-of-service', label: t.termsTitle },
  ];

  return (
    <footer className="w-full bg-white border-t border-stone-200 mt-16 pt-12 pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-100">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="text-2xl font-black font-headline tracking-tight text-stone-900 inline-block">
              {t.title}<span className="text-blue-600">.</span>
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              {t.footerDisclaimer}
            </p>
          </div>

          {/* Calculators Nav */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t.footerCalculators}
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-stone-600">
              {calculatorLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-stone-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info Nav */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t.footerLegal}
            </h3>
            <ul className="space-y-2 text-sm text-stone-600">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-stone-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} GlobalCalc Pro. {t.footerRights}
          </div>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <Link to="/privacy-policy" className="hover:text-stone-600 transition-colors">
              {t.privacyTitle}
            </Link>
            <span>&bull;</span>
            <Link to="/terms-of-service" className="hover:text-stone-600 transition-colors">
              {t.termsTitle}
            </Link>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-stone-600 transition-colors">
              {t.contactTitle}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
