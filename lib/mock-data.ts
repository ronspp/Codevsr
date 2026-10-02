import type { Catalog, Manga, Genre } from './types';
const rows: [string,string,string,Genre,string?][] = [
['goodbye-my-rose-garden','Goodbye, My Rose Garden','Dr. Pepperco','Romance','In an English rose garden, a young maid and her mistress find a connection neither of them expected. A tender historical romance about finding the courage to be yourself.'],
['a-white-rose-in-bloom','A White Rose in Bloom','Asumiko Nakamura','Romance','At an isolated boarding school, Ruby finds herself drawn to the mysterious and distant Steph. An unexpected winter together begins to change everything.'],
['chasing-spica','Chasing Spica','Chihiro Orihi','Drama','Two students from different worlds find their paths intertwined, in a story of ambition, rivalry, and the feelings that bloom between them.'],
['amongst-us','Amongst Us','Shilin Huang','Action','Veloce and Blackbird are an unlikely pair. Follow their extraordinary everyday life, filled with music, humor, and a little bit of chaos.'],
['how-do-we-relationship','How Do We Relationship?','Tamifull','Mature',"Shy Miwa has always dreamed of finding love, but living in small-town Japan made finding the right match difficult—especially since she likes girls! Even going away to college didn't seem to help, until one day her outgoing classmate Saeko suggests they might as well start dating each other since it’s not like either of them has other options."],
['namekawa-san','Namekawa-san Won’t Take a Licking! Vol. 1','Rie Ato','Comedy','After putting up with years of bullying in junior high, Namekawa-san decides to make a preemptive strike when she starts high school. Her plan? Become a delinquent!'],
['5-seconds','5 Seconds Before a Witch Falls in Love','Zeniko Sumiya','Fantasy','Solitary witch Meg likes to be mischievous and make trouble in the forest for her nemesis, Lilith the Witch Hunter. But when an altercation goes sideways…'],
['villainess','I’m in Love with the Villainess','Inori, Aonoshimo','Fantasy'],
['school-zone-girls','School Zone Girls','Ningiyau','Comedy'],
['dragon-maid','Miss Kobayashi’s Dragon Maid','coolkyousinnjya','Fantasy'],
['kindred-spirits','Kindred Spirits on the Roof','Hachi Ito','Romance'],
['my-next-life','My Next Life as a Villainess','Satoru Yamaguchi','Fantasy'],
['nameless-asterism','Nameless Asterism*','Kina Kobayashi','Romance'],
['my-cute-little-kitten','My Cute Little Kitten','Milk Morinaga','Romance'],
['after-hours','After Hours','Yuhta Nishio','Drama'],
['her-pet','Her Pet','Pito','Mature'],
['dallae','Dallae','Choonae','Fantasy'],
['getting-to-know-grace','Getting to Know Grace','Hilde, Mokma','Drama'],
['chasing-lilies','Chasing Lilies','Deepsleep','Action'],
['bloom-into-you','Bloom Into You','Nio Nakatani','Romance','Yuu has always loved shoujo manga and the promise of love. But when she meets student council member Touko, she begins to discover what those feelings really mean.'],
['seagull-villa','Days of Love at the Seagull Villa','Kodama Naoko','Drama','A fresh start in a seaside town brings an unexpected friendship, a place to belong, and the possibility of love.'],
['cats-and-sugar-bowls','Cats and Sugar Bowls','Yukiko','Mature','A collection of sweet and surprising stories about women in love, from quiet everyday moments to magical encounters.']
];
const chapterTitles=['The Confession','Our First Date','Testing the Waters','Mixed Signals','Growing Pains','A Little Closer','What We Leave Unsaid','A New Beginning','Finding Our Rhythm','Just the Two of Us'];
export const manga: Manga[]=rows.map(([id,title,author,genre,description],i)=>({id,title,author,genre,genres:id==='how-do-we-relationship'?['Romance','Mature','Comedy']:[genre],cover:`/images/${id}.jpg`,description:description??`Discover ${title}, a story of unexpected connections, everyday adventures, and the feelings that bring us together.`,reads:i===21?'1m':i===20?'69k':'100k',chapters:chapterTitles.map((title,j)=>({id:j+1,title,thumbnail:`/images/relationship-panel-${j%2+1}.jpg`}))}));
export const mockCatalog: Catalog={items:manga,trending:manga.slice(0,5).map(m=>m.id),popular:['how-do-we-relationship','bloom-into-you','villainess','amongst-us','a-white-rose-in-bloom'],comedy:['namekawa-san','5-seconds'],fantasy:['villainess','school-zone-girls','dragon-maid','kindred-spirits','my-next-life'],nextReads:['nameless-asterism','my-cute-little-kitten','after-hours','how-do-we-relationship'],delicate:['her-pet','dallae','getting-to-know-grace','chasing-lilies'],picks:['bloom-into-you','seagull-villa','cats-and-sugar-bowls','a-white-rose-in-bloom']};
