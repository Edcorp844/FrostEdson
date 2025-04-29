export interface News {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: String;
  content: string;
  source: string;
}

/*export function newsFromJson(json: any): News {
  return {
    title: json.title ?? '',
    description: json.description ?? '',
    url: json.url ?? '',
    imageUrl: json.urlToImage ?? '',
    publishedAt: json.publishedAt ? new Date(json.publishedAt) : new Date(),
    content: json.content ?? '',
    source: json.source?.name ?? '',
  };
}*/
