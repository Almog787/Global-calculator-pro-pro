import fs from 'fs';
import path from 'path';

// Read calculators.ts
const calculatorsPath = path.resolve('src/data/calculators.ts');
const content = fs.readFileSync(calculatorsPath, 'utf8');

// Extract all path properties
const pathRegex = /path:\s*['"]([^'"]+)['"]/g;
let match;
const dynamicPaths = [];

while ((match = pathRegex.exec(content)) !== null) {
  dynamicPaths.push(match[1]);
}

// Predefined general paths
const staticPaths = [
  '/',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/about',
  '/suggest'
];

const allPaths = Array.from(new Set([...staticPaths, ...dynamicPaths]));

const baseUrl = 'https://globalcalcpro.com';
const lastmod = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map(p => `  <url>
    <loc>${baseUrl}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p === '/' ? '1.0' : p.startsWith('/calculators') ? '0.8' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapContent);
console.log(`Generated sitemap with ${allPaths.length} URLs.`);
