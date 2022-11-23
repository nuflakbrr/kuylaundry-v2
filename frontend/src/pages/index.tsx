import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Home: FC = () => {
  const links = [
    {
      name: 'Admin',
      href: '/admin',
    },
    {
      name: 'Kasir',
      href: '/cashier',
    },
    {
      name: 'Pemilik',
      href: '/owner',
    },
    {
      name: 'Member',
      href: '/member',
    },
  ];
  return (
    <>
      <Head>
        <title>Masuk - KuyLaundry</title>
      </Head>

      <Navbar />

      <main className="bg-white dark:bg-gray-900">
        <div className="py-36">
          <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center py-5">
                <h1 className="font-bold text-xl text-black">
                  Silahkan Pilih Menu Login
                </h1>
              </div>
              <div className="flex flex-row justify-center items-center py-5">
                {links?.map((l, i) => (
                  <Link href={l.href} legacyBehavior key={i}>
                    <a className="mx-2 focus:shadow-outline-blue inline rounded-lg border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:opacity-90 hover:shadow-lg focus:outline-none">
                      {l.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Home;
