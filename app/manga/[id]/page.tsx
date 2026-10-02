import {manga} from '@/lib/mock-data';
import {notFound} from 'next/navigation';
import MangaDetail from '@/components/manga-detail';
export function generateStaticParams(){return manga.map(m=>({id:m.id}))}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const{id}=await params;const item=manga.find(m=>m.id===id);return {title:item?`${item.title} — Mangation`:'Story not found — Mangation',description:item?.description}}
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;const item=manga.find(m=>m.id===id);if(!item)notFound();return <MangaDetail initialManga={item}/>}
