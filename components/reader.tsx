'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {useRouter,useSearchParams} from 'next/navigation';
import {ArrowLeft,ArrowRight,MoreVertical,Sun,Moon,X} from 'lucide-react';
import {catalogApi} from '@/lib/catalog';
import type {ChapterContent,Manga} from '@/lib/types';

export default function Reader({initialManga}:{initialManga:Manga}){
 const params=useSearchParams();
 const chapterId=Number(params.get('chapter')??1);
 return <ReaderChapter key={`${initialManga.id}:${chapterId}`} initialManga={initialManga} chapterId={chapterId}/>;
}
function ReaderChapter({initialManga,chapterId}:{initialManga:Manga;chapterId:number}){
 const router=useRouter();
 const [manga,setManga]=useState(initialManga);
 const [content,setContent]=useState<ChapterContent|null>(null);
 const [error,setError]=useState('');
 const [retry,setRetry]=useState(0);
 const [light,setLight]=useState(false);
 const [menu,setMenu]=useState(false);
 const [failedImages,setFailedImages]=useState<string[]>([]);
 const restored=useRef(false);

 useEffect(()=>{
  try{setLight(localStorage.getItem('yrko:minimal-reader-theme')==='light')}catch{}
 },[]);

 useEffect(()=>{
  const controller=new AbortController();
  catalogApi.getManga(initialManga.id,controller.signal).then(setManga).catch(()=>{});
  setContent(null);setError('');setFailedImages([]);restored.current=false;
  if(!Number.isInteger(chapterId)||chapterId<1){setError('This chapter is not available.');return()=>controller.abort()}
  catalogApi.getChapter(initialManga.id,chapterId,controller.signal).then(data=>{
   if(!Array.isArray(data.pages))throw new Error('Unable to load chapter pages.');
   setContent(data);
  }).catch(e=>{if(e.name!=='AbortError')setError(e.message)});
  return()=>controller.abort();
 },[initialManga.id,chapterId,retry]);

 useEffect(()=>{
  if(!content)return;
  const frame=requestAnimationFrame(()=>{
   let savedPage=1;
   try{const saved=JSON.parse(localStorage.getItem(`yrko:progress:${manga.id}`)??'null');if(saved?.chapterId===chapterId)savedPage=Math.max(1,Math.min(saved.page??1,content.pages.length))}catch{}
   if(savedPage>1)document.getElementById(`reader-page-${savedPage}`)?.scrollIntoView({block:'start'});
   else window.scrollTo(0,0);
   restored.current=true;
   try{localStorage.setItem(`yrko:progress:${manga.id}`,JSON.stringify({chapterId,page:savedPage,updatedAt:Date.now()}))}catch{}
  });
  const saveProgress=()=>{
   if(!restored.current)return;
   const current=Array.from(document.querySelectorAll<HTMLElement>('[data-reader-page]')).filter(n=>n.getBoundingClientRect().top<window.innerHeight*.55).at(-1);
   try{localStorage.setItem(`yrko:progress:${manga.id}`,JSON.stringify({chapterId,page:Number(current?.dataset.readerPage??1),updatedAt:Date.now()}))}catch{}
  };
  window.addEventListener('scroll',saveProgress,{passive:true});
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',saveProgress)};
 },[content,manga.id,chapterId]);

 useEffect(()=>{
  if(!menu)return;
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};
  window.addEventListener('keydown',escape);
  return()=>window.removeEventListener('keydown',escape);
 },[menu]);

 function goChapter(id:number){setMenu(false);router.push(`/read/${manga.id}/?chapter=${id}`,{scroll:false})}
 function toggleTheme(){setLight(v=>{try{localStorage.setItem('yrko:minimal-reader-theme',v?'dark':'light')}catch{}return !v})}
 const index=manga.chapters.findIndex(c=>c.id===chapterId);
 const previous=manga.chapters[index-1];
 const next=manga.chapters[index+1];
 const title=content?.title??manga.chapters[index]?.title??'';

 return <main className={`minimal-reader ${light?'minimal-reader-light':''}`}>
  <header className="minimal-reader-header">
   <Link href={`/manga/${manga.id}/`} aria-label="Back to manga details" className="minimal-reader-icon"><ArrowLeft size={20}/></Link>
   <div><h1>Chapter {chapterId}</h1><p>{title}</p></div>
   <button aria-label="Reader menu" aria-expanded={menu} onClick={()=>setMenu(v=>!v)} className="minimal-reader-icon"><MoreVertical size={21}/></button>
  </header>
  {menu&&<><button className="minimal-menu-backdrop" aria-label="Close reader menu" onClick={()=>setMenu(false)}/><section className="minimal-reader-menu" aria-label="Reader options">
   <div className="minimal-menu-title"><span>{manga.title}</span><button aria-label="Close menu" onClick={()=>setMenu(false)}><X size={17}/></button></div>
   <label>Chapter<select aria-label="Select chapter" value={chapterId} onChange={e=>goChapter(Number(e.target.value))}>{manga.chapters.map(c=><option key={c.id} value={c.id}>Chapter {c.id} · {c.title}</option>)}</select></label>
   <button className="minimal-theme-toggle" onClick={toggleTheme}>{light?<Moon size={16}/>:<Sun size={16}/>} {light?'Dark background':'Light background'}</button>
   <Link href={`/manga/${manga.id}/`}>All chapters</Link>
  </section></>}
  <div className="minimal-reader-content">
   {error?<div role="alert" className="minimal-reader-state"><p>{error}</p><button onClick={()=>setRetry(r=>r+1)}>Try again</button></div>:!content?<div className="minimal-reader-state" role="status">Loading…</div>:<>
    {content.pages.map((p,i)=><figure id={`reader-page-${i+1}`} data-reader-page={i+1} key={`${chapterId}-${p.id}`} className="minimal-reader-page">
     {failedImages.includes(p.id)?<div className="minimal-reader-state"><p>This page couldn’t load.</p><button onClick={()=>setFailedImages(ids=>ids.filter(id=>id!==p.id))}>Try again</button></div>:<img src={p.image} alt={p.alt} width={p.width} height={p.height} loading={i<2?'eager':'lazy'} onError={()=>setFailedImages(ids=>[...ids,p.id])}/>}
    </figure>)}
    {content.pages.length?<p className="minimal-reader-note">{content.isPreview?'End of sample preview':'End of chapter'}</p>:<div className="minimal-reader-state"><p>Chapter pages aren’t available in this preview.</p><Link href={`/manga/${manga.id}/`}>Back to chapters</Link><Link href="/read/amongst-us/?chapter=1">Read the Amongst Us sample</Link></div>}
   </>}
  </div>
  <nav className="minimal-reader-nav" aria-label="Chapter navigation">
   <button disabled={!previous} onClick={()=>previous&&goChapter(previous.id)}><ArrowLeft size={18}/><span>Previous</span></button>
   <span className="minimal-nav-divider"/>
   {next?<button onClick={()=>goChapter(next.id)}><span>Next</span><ArrowRight size={18}/></button>:<Link href={`/manga/${manga.id}/`}>All chapters <ArrowRight size={18}/></Link>}
  </nav>
 </main>;
}
