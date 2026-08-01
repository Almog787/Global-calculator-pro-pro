import { useParams } from 'react-router-dom';
import { Suspense, lazy, useMemo } from 'react';
import NotFound from './NotFound';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedCalculators from '../components/RelatedCalculators';
import { calculators } from '../data/calculators';

// Using Vite's import.meta.glob to dynamically discover all calculators in the folder.
const modules = import.meta.glob('./calculators/*.tsx');

export default function CalculatorWrapper() {
  const { slug } = useParams<{ slug: string }>();

  const Component = useMemo(() => {
    if (!slug) return null;
    
    // Find a file that matches the slug (e.g. 'auto-loan' -> 'AutoLoan.tsx')
    const match = Object.keys(modules).find(path => {
      const filename = path.split('/').pop()?.replace('.tsx', '').toLowerCase();
      const cleanSlug = slug.replace(/-/g, '').toLowerCase();
      return filename === cleanSlug;
    });

    if (match) {
      return lazy(modules[match] as any);
    }
    
    return null;
  }, [slug]);

  if (!Component) {
    return <NotFound />;
  }

  const currentPath = `/calculators/${slug}`;
  const calcData = calculators.find(c => c.path === currentPath);

  return (
    <div className="w-full">
      <Breadcrumbs items={[
        { label: 'Library', path: '/all' },
        { label: calcData?.fallbackTitle || slug || 'Calculator' }
      ]} />
      
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div>
        </div>
      }>
        <Component />
      </Suspense>

      <RelatedCalculators currentId={currentPath} />
    </div>
  );
}
