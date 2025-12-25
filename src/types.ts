export interface Article {
  id: string;
  title: string;
  summary: string | null;
  image_url: string;
  published_at: string;
}
export interface GuardianArticle {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
  };
}
