import { useState, useEffect } from 'react';
import type { Article, GuardianArticle } from '../types';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '4627ff5d-c097-449f-a90c-e842bfa3a378';

  useEffect(() => {
    fetch(
      `https://content.guardianapis.com/search?section=environment&show-fields=thumbnail,trailText&page-size=20&api-key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        const results = data.response.results;
        const formatted = results.map(
          (item: GuardianArticle): Article => ({
            id: item.id,
            title: item.webTitle,
            summary: item.fields?.trailText?.replace(/<[^>]*>?/gm, '') || '',
            image_url:
              item.fields?.thumbnail ||
              'https://via.placeholder.com/400x200?text=Sport+News',
            published_at: item.webPublicationDate,
          }),
        );

        setArticles(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { articles, loading };
};
