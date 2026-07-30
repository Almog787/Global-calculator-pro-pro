import { useParams, Navigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { getPostBySlug } from '../utils/posts';
import { Link } from 'react-router-dom';

export default function Article() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/insights" />;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-16 flex-grow">
      <Link to="/insights" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
        Back to Insights
      </Link>
      
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(t => (
            <span key={t} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">{t}</span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-slate-900 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center text-slate-500 font-medium">
          <span className="material-symbols-outlined text-lg mr-2">calendar_today</span>
          {post.date}
        </div>
      </header>

      {post.image && (
        <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-sm border border-slate-200">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-headline prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-2xl">
        <Markdown>{post.content}</Markdown>
      </div>
    </main>
  );
}
