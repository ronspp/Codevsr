export type Genre = 'Romance' | 'Action' | 'Fantasy' | 'Drama' | 'Comedy' | 'Mature';
export interface Manga { id: string; title: string; author: string; genre: Genre; genres: Genre[]; cover: string; description: string; reads: string; chapters: Chapter[]; }
export interface Chapter { id: number; title: string; thumbnail?: string; }
export interface Catalog { items: Manga[]; trending: string[]; popular: string[]; comedy: string[]; fantasy: string[]; nextReads: string[]; delicate: string[]; picks: string[]; }
export interface ReaderPage { id: string; image: string; width: number; height: number; alt: string; }
export interface ChapterContent { mangaId: string; chapterId: number; title: string; isPreview: boolean; pages: ReaderPage[]; }
