import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({exploreData,cardData}) {
  return (
    <div className="">
      <Head>
        <title>Cloned Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Header />
        <Banner />

        <main className='max-w-7xl mx-auto px-8 sm:px-16'>
          <section className='pt-6'>
             <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

             {/* data from server by api */}
             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
             {exploreData?.map(({img,distance,location}) => (
                <SmallCard 
                 key={img}
                 img={img}
                 distance={distance}
                 location={location}
                 />
             ))}
            </div>
          </section>

          <section>
             <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
             <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3'>
                 {cardData?.map(item => (
                <MediumCard key={item.img} img={item.img} title={item.title} />
                 )) }
             </div>
          </section>

          <LargeCard img='https://links.papareact.com/4cj'
               title='The Greates outdoor'
               description='Wishlists curated by airbnb'
               buttonText='Get Inspired' 
               />
        </main>

           <Footer />

    </div>
  )
}


export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/4G1G').
  then(
      (res) => res.json()
    );

  const cardData = await fetch('https://jsonkeeper.com/b/VHHT').
  then(
      (res) => res.json()
    );

  return {
     props: {
       exploreData,
       cardData
     },
  };
}
