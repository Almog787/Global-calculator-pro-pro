import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-4 w-24 bg-stone-200 rounded mb-6"></div>
      <div className="w-full h-full flex flex-col lg:flex-row bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-100 gap-10">
        <div className="flex-1 flex flex-col">
          <div className="mb-10">
            <div className="h-8 w-3/4 bg-stone-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-stone-100 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-stone-100 rounded"></div>
          </div>
          <div className="space-y-8">
            <div>
              <div className="h-3 w-32 bg-stone-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-stone-100 rounded"></div>
            </div>
            <div>
              <div className="h-3 w-32 bg-stone-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-stone-100 rounded"></div>
            </div>
            <div>
              <div className="h-3 w-32 bg-stone-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-stone-100 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex-[1.5] hidden lg:block bg-stone-50/50 rounded-xl min-h-[320px]"></div>
      </div>
    </div>
  );
}
