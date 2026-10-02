import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata={ title:'Mangation — Discover your next story', description:'Discover the full spectrum of girls’ love stories. Explore manga, find your next read, and fall in love with a new story.',icons:{icon:'/favicon.svg'}};
export const viewport: Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#ffffff'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
