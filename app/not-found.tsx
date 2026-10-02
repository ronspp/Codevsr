import Link from 'next/link';
export default function NotFound(){return <main className="container empty-state" style={{paddingTop:140}}><h1 className="text-3xl mb-4">This story hasn’t arrived yet.</h1><p>Let’s find your next favorite read.</p><Link href="/" className="pill dark mt-6">Back to Discover</Link></main>}
