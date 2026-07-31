const fs = require('fs');
let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

const newUrls = `  <url>
    <loc>https://globalcalcpro.com/bmi-calculator</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://globalcalcpro.com/tip-calculator</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://globalcalcpro.com/salary-calculator</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://globalcalcpro.com/age-calculator</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

sitemap = sitemap.replace(/<\/urlset>/, newUrls);

fs.writeFileSync('public/sitemap.xml', sitemap);
