'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {BookOpen,ChevronRight,Heart,House,UserRound,ArrowLeft} from 'lucide-react';
import {Cover,StoryLink} from './ui';
import type {Catalog,Manga} from '@/lib/types';
type View='home'|'library'|'favorites'|'profile';
export default function MobileDiscover({catalog,onCollection,loading,error,onRetry}:{catalog:Catalog;loading:boolean;error:string;onRetry:()=>void;onCollection:(title:string,items:Manga[])=>void;onProfile:()=>void}){
 const [view,setView]=useState<View>('home');
 const [library,setLibrary]=useState<string[]>([]);
 const [favorites,setFavorites]=useState<string[]>([]);
 const [history,setHistory]=useState<string[]>([]);
 const find=(ids:string[])=>ids.map(id=>catalog.items.find(m=>m.id===id)).filter((m):m is Manga=>!!m);
 const featured=find([...new Set(['amongst-us',...catalog.trending])]);
 const next=find([...new Set([...catalog.comedy,...catalog.fantasy,...catalog.nextReads])]);
 useEffect(()=>{
  try{
   setLibrary(catalog.items.filter(m=>localStorage.getItem(`yrko:saved:${m.id}`)==='true').map(m=>m.id));
   setFavorites(catalog.items.filter(m=>localStorage.getItem(`yrko:liked:${m.id}`)==='true').map(m=>m.id));
   setHistory(catalog.items.filter(m=>localStorage.getItem(`yrko:progress:${m.id}`)).map(m=>m.id));
  }catch{}
 },[catalog,view]);
 function navigate(nextView:View){setView(nextView);window.scrollTo({top:0,behavior:'instant'})}
 const visible=view==='library'?find([...new Set([...library,...history])]):find(favorites);
 return <><main className="mobile-discover">
 {error?<div className="mobile-catalog-state" role="alert"><p>{error}</p><button onClick={onRetry}>Try again</button></div>:loading?<div className="mobile-catalog-state" role="status">Loading stories…</div>:view==='home'?<>
 <section className="mobile-featured" aria-label="Featured stories">{featured.map((m,i)=><StoryLink key={m.id} manga={m} className="mobile-featured-card"><Cover manga={m}/><div className="mobile-cover-caption"><span className="mobile-cover-rank">{i+1}</span><div><h2>{m.title}</h2><span>{m.author}</span></div></div></StoryLink>)}</section>
 <section className="mobile-next"><button className="mobile-section-title" onClick={()=>onCollection('Next Reads',next)}><h2>Next Reads</h2><ChevronRight size={17}/></button><div className="mobile-next-track">{next.map(m=><StoryLink key={m.id} manga={m}><Cover manga={m}/><h3>{m.title}</h3></StoryLink>)}</div></section></>:<section className="mobile-personal"><div className="mobile-personal-heading"><button aria-label="Back to discover" onClick={()=>navigate('home')}><ArrowLeft size={20}/></button><h1>{view==='library'?'Library':view==='favorites'?'Favorites':'Profile'}</h1></div>
 {view==='profile'?<div className="mobile-profile"><UserRound size={30}/><h2>Reading as a guest</h2><p>Your reading list and progress stay on this device.</p><button onClick={()=>navigate('library')}><BookOpen size={19}/>Library<span>{new Set([...library,...history]).size}</span><ChevronRight size={16}/></button><button onClick={()=>navigate('favorites')}><Heart size={19}/>Favorites<span>{favorites.length}</span><ChevronRight size={16}/></button><div className="mobile-profile-auth"><Link className="pill dark" href="/login/">Log in</Link><Link className="pill outlined" href="/register/">Create account</Link></div><small>Sign in to keep your library and progress across devices.</small></div>:visible.length?<div className="collection-grid">{visible.map(m=><StoryLink key={m.id} manga={m}><Cover manga={m}/><strong>{m.title}</strong><small>{history.includes(m.id)?'Continue reading':m.author}</small></StoryLink>)}</div>:<div className="mobile-empty"><BookOpen size={28}/><h2>{view==='library'?'Your next story starts here.':'Keep the stories you love.'}</h2><p>{view==='library'?'Start reading or save a manga to find it here.':'Tap the heart on a manga to add it to Favorites.'}</p><button className="pill dark" onClick={()=>navigate('home')}>Explore stories</button></div>}
 </section>}
 </main><nav className="mobile-bottom-nav" aria-label="Mobile navigation">{([{id:'home',label:'Menu',Icon:House},{id:'library',label:'Library',Icon:BookOpen},{id:'favorites',label:'Favorites',Icon:Heart},{id:'profile',label:'Profile',Icon:UserRound}] as const).map(({id,label,Icon})=><button key={id} className={view===id?'active':''} aria-current={view===id?'page':undefined} onClick={()=>navigate(id)}><Icon/><span>{label}</span></button>)}</nav></>;
}
