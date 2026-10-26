const siteUrl = 'https://buildary.cz';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/build`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
