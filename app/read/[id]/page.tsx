import {Suspense} from 'react';
import {manga} from '@/lib/mock-data';
import {notFound} from 'next/navigation';
import Reader from '@/components/reader';
export function generateStaticParams(){return manga.map(m=>({id:m.id}))}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const{id}=await params;return{title:`Read ${manga.find(m=>m.id===id)?.title??'Manga'} — Mangation`}}
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;const item=manga.find(m=>m.id===id);if(!item)notFound();return <Suspense fallback={<div className="reader-loading">Opening your story…</div>}><Reader initialManga={item}/></Suspense>}
