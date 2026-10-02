import { mockCatalog } from './mock-data';
import type { Catalog, Manga, ChapterContent } from './types';
// Set NEXT_PUBLIC_API_BASE_URL to switch both screens to your API.
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
async function getJSON<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${baseURL}${path}`, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Unable to load stories (${response.status}). Please try again.`);
  return response.json() as Promise<T>;
}
export const catalogApi = {
  async getChapter(mangaId: string, chapterId: number, signal?: AbortSignal): Promise<ChapterContent> {
    if (baseURL) return getJSON<ChapterContent>(`/manga/${encodeURIComponent(mangaId)}/chapters/${chapterId}`, signal);
    const item = mockCatalog.items.find(m => m.id === mangaId);
    const chapter = item?.chapters.find(c => c.id === chapterId);
    if (!item || !chapter) throw new Error('Chapter not found.');
    const pages = mangaId === 'amongst-us'
      ? [2,3].map((n) => ({id:`sample-${n}`,image:`/images/amongst-page-${n}.jpg`,width:800,height:n===1?900:1280,alt:`Amongst Us — sample page ${n}`}))
      : mangaId === 'how-do-we-relationship'
        ? [{id:'sample',image:'/images/relationship-panel-1.jpg',width:704,height:704,alt:'How Do We Relationship? — sample page'}]
        : [];
    return { mangaId, chapterId, title: chapter.title, isPreview: true, pages };
  },
  async getCatalog(signal?: AbortSignal): Promise<Catalog> {
    if (!baseURL) return mockCatalog;
    const data = await getJSON<Catalog>('/catalog', signal);
    if (!Array.isArray(data.items) || !Array.isArray(data.trending)) throw new Error('The catalog response is invalid.');
    return data;
  },
  async getManga(id: string, signal?: AbortSignal): Promise<Manga> {
    if (baseURL) return getJSON<Manga>(`/manga/${encodeURIComponent(id)}`, signal);
    const item = mockCatalog.items.find(m => m.id === id);
    if (!item) throw new Error('Story not found.');
    return item;
  }
};
