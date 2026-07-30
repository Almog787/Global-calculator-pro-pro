import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="font-body text-slate-900 flex flex-col min-h-screen">
      <header className="w-full bg-[#F9FAFB]/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold font-headline tracking-tight text-slate-900 hover:text-blue-600 transition-colors shrink-0">
            GlobalCalc<span className="text-blue-600">.</span>
          </Link>
          <div className="flex items-center gap-x-8 font-medium text-sm">
            <Link 
              to="/insights" 
              className={`transition-colors shrink-0 ${location.pathname === '/insights' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Insights
            </Link>
            <Link 
              to="/" 
              className={`transition-colors shrink-0 ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Tools
            </Link>
          </div>
        </nav>
      </header>

      <div className="flex-grow flex flex-col">
        <Outlet />
      </div>

      <footer className="text-center py-12 text-slate-500 text-sm mt-auto border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
          <div>
            <div className="font-headline font-semibold text-slate-900 text-base mb-1">GlobalCalc</div>
            <p className="text-slate-400">© {new Date().getFullYear()} Precision Tools. All rights reserved.</p>
          </div>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
