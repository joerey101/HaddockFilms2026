import { MetadataRoute } from 'next';
import { films } from '@/data/films';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://haddockfilms.com';

  const filmUrls: MetadataRoute.Sitemap = films
    .filter((film) => !!film.slug)
    .map((film) => ({
      url: `${baseUrl}/peliculas/${film.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...filmUrls,
  ];
}
