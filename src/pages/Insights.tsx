import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';

export default function Insights() {
  const [filter, setFilter] = useState('all');
  
  const posts = getAllPosts();

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.tags.map(t => t.toLowerCase()).includes(filter));

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-16 flex-grow">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight text-slate-900">
          Calculated <span className="text-blue-600">Insights.</span>
        </h1>
        <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
          Data-driven articles and expert analysis to empower your decisions.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 mb-12">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors border ${filter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
        >
          All Insights
        </button>
        {allTags.map(tag => (
          <button 
            key={tag}
            onClick={() => setFilter(tag.toLowerCase())}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors border ${filter === tag.toLowerCase() ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, i) => (
          <div key={post.slug} className={`${i === 0 ? 'md:col-span-2 lg:col-span-3' : ''}`}>
            <Link to={`/insights/${post.slug}`} className={`block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group flex flex-col ${i === 0 ? 'lg:flex-row' : ''} h-full`}>
              <div className={`${i === 0 ? 'lg:w-[55%] h-72 lg:h-auto' : 'h-56'} overflow-hidden relative shrink-0 border-r border-slate-100`}>
                {post.image ? (
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">{post.icon}</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span key={t} className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-100">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-center">
                <span className="text-sm text-slate-500 font-medium mb-3 block">{post.date}</span>
                <h2 className={`${i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold font-headline mb-4 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight`}>{post.title}</h2>
                <p className="text-slate-600 text-base leading-relaxed line-clamp-3">{post.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
