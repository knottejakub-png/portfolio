const siteUrl = 'https://portfolio-ashen-nine-29.vercel.app';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
