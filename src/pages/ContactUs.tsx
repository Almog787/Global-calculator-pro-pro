import { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '../contexts/i18n';

export default function ContactUs() {
  const { t } = useI18n();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'contact_form_submit', {
        event_category: 'Contact',
        subject: subject || 'General Inquiry'
      });
    }

    setIsSubmitted(true);
  };

  return (
    <article className="w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200 max-w-3xl mx-auto">
      <Helmet>
        <link rel="canonical" href="https://globalcalcpro.com/contact" />
        <title>{t.contactTitle} | {t.title}</title>
        <meta name="description" content={t.contactDesc} />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-headline text-stone-900 tracking-tight mb-3 font-bold">
          {t.contactTitle}
        </h1>
        <p className="text-stone-500 font-medium text-[15px] leading-relaxed">
          {t.contactExplanation}
        </p>
      </div>

      {/* Info Note - Contact details placeholder as requested */}
      <div className="mb-8 p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 text-sm flex items-start gap-3">
        <span className="material-symbols-outlined text-stone-400 text-xl leading-none mt-0.5">info</span>
        <div>{t.contactInfoNote}</div>
      </div>

      {isSubmitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
          <p className="font-semibold text-lg">{t.messageSentSuccess}</p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setMessage('');
              setSubject('');
            }}
            className="mt-4 text-sm font-bold text-emerald-700 underline hover:text-emerald-900"
          >
            {t.sendMessage}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-500 mb-2 block">
              {t.fullName}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-500 mb-2 block">
              {t.emailAddress}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="e.g. john@example.com"
            />
          </div>

          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-500 mb-2 block">
              {t.subject}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="e.g. General Inquiry"
            />
          </div>

          <div>
            <label className="text-xs tracking-wider uppercase font-bold text-stone-500 mb-2 block">
              {t.message}
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
              placeholder="..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            {t.sendMessage}
          </button>
        </form>
      )}
    </article>
  );
}
