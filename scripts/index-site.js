import { google } from 'googleapis';
import fs from 'fs';

async function indexSite() {
  const serviceAccountKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKeyRaw) {
    console.log('⚠️ GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set. Skipping Google Indexing submission.');
    return;
  }

  let credentials;
  try {
    const trimmed = serviceAccountKeyRaw.trim();
    if (trimmed.startsWith('{')) {
      credentials = JSON.parse(trimmed);
    } else if (fs.existsSync(trimmed)) {
      credentials = JSON.parse(fs.readFileSync(trimmed, 'utf8'));
    } else {
      // Try base64 decoding
      const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
      credentials = JSON.parse(decoded);
    }
  } catch (err) {
    console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:', err.message);
    return;
  }

  // Extract URLs from sitemap if available or fallback to list
  let urls = [
    'https://globalcalcpro.com/',
    'https://globalcalcpro.com/mortgage-calculator',
    'https://globalcalcpro.com/compound-interest',
    'https://globalcalcpro.com/percentage-finder',
    'https://globalcalcpro.com/unit-converter',
    'https://globalcalcpro.com/bmi-calculator',
    'https://globalcalcpro.com/tip-calculator',
    'https://globalcalcpro.com/salary-calculator',
    'https://globalcalcpro.com/age-calculator',
    'https://globalcalcpro.com/contact',
    'https://globalcalcpro.com/privacy-policy',
    'https://globalcalcpro.com/terms-of-service',
    'https://globalcalcpro.com/about',
    'https://globalcalcpro.com/suggest'
  ];

  try {
    if (fs.existsSync('public/sitemap.xml')) {
      const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
      const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
      if (matches && matches.length > 0) {
        urls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
      }
    }
  } catch (e) {
    // fallback to predefined list
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({
      version: 'v3',
      auth,
    });

    console.log(`🚀 Requesting Google Indexing for ${urls.length} URLs...`);

    for (const url of urls) {
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Indexing requested: ${url} (Status: ${res.status})`);
      } catch (urlErr) {
        console.error(`⚠️ Indexing failed for ${url}:`, urlErr.message);
      }
    }

    console.log('✨ Google Indexing API execution completed!');
  } catch (err) {
    console.error('❌ Google Indexing API Error:', err.message);
  }
}

indexSite();
