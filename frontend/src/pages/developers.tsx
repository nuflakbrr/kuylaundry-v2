/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import Head from 'next/head';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Me = 'https://nuflakbrr.vercel.app/static/images/profile-picture.png';
const Sch = 'https://nuflakbrr.vercel.app/static/images/SMK_TELKOM_MLG.png';

const Developers: FC = () => {
  return (
    <>
      <Head>
        <title>Pengembang Layanan - KuyLaundry</title>
      </Head>

      <Navbar />

      <main className="bg-white dark:bg-gray-900 py-20">
        <section className="pt-10">
          <div className="container">
            <div className="flex flex-wrap px-10">
              <div className="w-full px-4 lg:w-1/2">
                <div>
                  <img
                    src={Me}
                    alt="Naufal Akbar Nugroho"
                    className="mx-auto max-w-full"
                    width={300}
                    height={300}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="mt-10 lg:ml-5 xl:mt-0">
                  <h4 className="text-lg font-bold uppercase text-sky-500">
                    Pengembang Layanan
                  </h4>
                  <h2 className="my-3 max-w-md text-2xl font-bold text-black dark:text-zinc-50 lg:text-3xl">
                    Mari Berkenalan!
                  </h2>
                  <div className="prose max-w-xl text-slate-400 xl:col-span-2">
                    <p>
                      Hai, nama saya Naufal Akbar Nugroho. Atau Anda bisa
                      memanggil saya Akbar. Saya lahir pada tanggal 15 Juli 2004
                      di Kota Malang, Provinsi Jawa Timur, Indonesia. Saya
                      adalah salah satu siswa SMK Telkom Malang angkatan 29. SMK
                      Telkom Malang adalah sekolah teknologi. Sejak saya masuk
                      SMK Telkom Malang, saya menjadi sangat tertarik dengan
                      UI/UX dan Web Development.
                    </p>
                    <br />
                    <p>
                      Di SMK Telkom Malang banyak hal yang bisa saya lakukan,
                      seperti pendidikan karakter, disiplin, dan banyak hal
                      lainnya. Selain itu, saya juga belajar Desain Grafis,
                      beberapa bahasa pemrograman, Web Design, dan Web
                      Development. Saya sangat bersyukur bisa menjadi bagian
                      dari keluarga besar SMK Telkom Malang, karena saya menjadi
                      mengerti tentang dunia teknologi. Untuk saat ini saya
                      sedang mendalami bahasa pemrograman Java, HTML, CSS,
                      Vanilla JavaScript, Node.js, React.js, Next.js, dan masih
                      banyak lagi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <div className="flex flex-wrap items-center px-10">
              <div className="w-full px-4 lg:w-1/2">
                <img
                  src={Sch}
                  alt="SMK TELKOM MALANG"
                  className="mx-auto max-w-full rounded-xl object-cover object-center"
                  width={500}
                  height={300}
                  loading="lazy"
                />
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="mt-5 xl:mt-0">
                  <h4 className="text-lg font-bold uppercase text-sky-500">
                    Pendidikan
                  </h4>
                  <h4 className="mb-4 text-xl font-semibold text-slate-900 dark:text-zinc-50 lg:text-2xl">
                    Seorang Siswa SMK Telkom Malang
                  </h4>
                  <p className="mb-6 text-base max-w-xl font-medium text-slate-400">
                    Saya adalah salah satu siswa SMK Telkom Malang angkatan 29.
                    SMK Telkom Malang pelopor Sekolah menengah kejuruan pertama
                    di Indonesia di bidang Teknologi dan Informatika.
                    Berpengalaman sejak tahun 1992 yang telah terakreditasi{' '}
                    <b>"A"</b> dan mempunyai standart mutu ISO <b>9001:2015</b>.
                    SMK Telkom Malang juga merupakan sekolah adiwiyata yang
                    menerapkan prinsip sekolah hijau, hal tersebut semakin
                    memberikan suasana yang nyaman bagi warga sekolah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Developers;
