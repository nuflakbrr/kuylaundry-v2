import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { headerConfig } from '../../../../utils/headerConfig';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { formatLocalTime } from '../../../../utils/formatLocalTime';

const ContainersAdminTransactionDetails: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [data, setData] = useState([]);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/transaksi/member/${id}`, headerConfig())
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  const badgeColorPayment = (status: string) => {
    if (status === 'lunas') {
      return (
        <p className="bg-green-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Lunas
        </p>
      );
    } else {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Belum Lunas
        </p>
      );
    }
  };

  const badgeColorTransaction = (status: string) => {
    if (status === 'baru') {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Baru
        </p>
      );
    } else if (status === 'proses') {
      return (
        <p className="bg-yellow-500 px-2 py-0.5 rounded-xl text-black whitespace-no-wrap">
          Proses
        </p>
      );
    } else if (status === 'selesai') {
      return (
        <p className="bg-green-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Selesai
        </p>
      );
    } else if (status === 'diambil') {
      return (
        <p className="bg-blue-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Diambil
        </p>
      );
    } else {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Dibatalkan
        </p>
      );
    }
  };

  console.log(data);

  return (
    <>
      <Head>
        <title>Detail Pembayaran - KuyLaundry</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-slate-900 md:ml-64 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        {!data.length ? (
          <p className="text-black dark:text-white text-center mx-auto">
            Memuat Data📦...
          </p>
        ) : (
          data.map((item: any) => (
            <div
              className="container bg-slate-100 dark:bg-white rounded-lg p-5 mb-5"
              key={item.id_transaksi}
            >
              <div className="flex items-center justify-between">
                <div className="w-full flex items-start justify-between px-2">
                  <section>
                    <div className="text-left">
                      <h1 className="font-bold text-sm text-slate-500">
                        Nama Member
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.member.nama_member || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Alamat
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.member.alamat || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Cabang Outlet
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.outlet.nama_outlet} {', '} {item.outlet.alamat}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tanggal Bayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatLocalTime(item.tgl_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left py-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Batas Waktu
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatLocalTime(item.tgl_batas) || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>

                  <section className="hidden md:block">
                    <div className="text-left">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tanggal Bayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatLocalTime(item.tgl_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Batas Waktu
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatLocalTime(item.tgl_batas) || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tanggal Pembayaran
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatLocalTime(item.tgl_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>

                  <section>
                    <div className="text-left pt-5 md:pt-0">
                      <h1 className="font-bold text-sm text-slate-500">
                        Status Pembayaran
                      </h1>
                      <h1 className="font-bold text-lg text-black text-center">
                        {badgeColorPayment(item.status_pembayaran) ||
                          'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5 md:pt-0">
                      <h1 className="font-bold text-sm text-slate-500">
                        Status Pengerjaan
                      </h1>
                      <h1 className="font-bold text-lg text-black text-center">
                        {badgeColorTransaction(item.status_pengerjaan) ||
                          'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Nama Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.nama_petugas || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left pt-5 pb-5 md:pb-0">
                      <h1 className="font-bold text-sm text-slate-500">
                        Level Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.level || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>

                  <section className="hidden md:block">
                    <div className="text-left">
                      <h1 className="font-bold text-sm text-slate-500">
                        Nama Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.nama_petugas || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5 pb-5 md:pb-0">
                      <h1 className="font-bold text-sm text-slate-500">
                        Level Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.level || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>
                </div>
              </div>

              <hr className="border-2 border-slate-300 my-5" />

              {item.detail_transaksi.map((val: any, i: any) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="w-full flex items-start justify-between px-2">
                    <section>
                      <div className="text-left pb-5 md:pb-0">
                        <h1 className="font-bold text-sm text-slate-500">
                          Nama Paket
                        </h1>
                        {item.paket.map((a: any) => (
                          <h1
                            className="font-bold text-lg text-black capitalize"
                            key={val.id_paket}
                          >
                            {a.nama_paket || 'Tidak diketahui'}
                          </h1>
                        ))}
                      </div>
                      <div className="text-left pt-5 pb-5 md:pb-0">
                        <h1 className="font-bold text-sm text-slate-500">
                          Kuantitas
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                          {val.qty || 'Tidak diketahui'}
                        </h1>
                      </div>
                    </section>

                    <section>
                      <div className="text-left pb-5 md:pb-0">
                        <h1 className="font-bold text-sm text-slate-500">
                          Harga Satuan
                        </h1>
                        {item.paket.map((a: any) => (
                          <h1
                            className="font-bold text-lg text-black capitalize"
                            key={val.id_paket}
                          >
                            {formatCurrency(a.harga) || 'Tidak diketahui'}
                          </h1>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="text-left pb-5 md:pb-0">
                        <h1 className="font-bold text-sm text-slate-500">
                          Total Harga
                        </h1>
                        {item.paket.map((a: any) => (
                          <h1
                            className="font-bold text-lg text-black capitalize"
                            key={val.id_paket}
                          >
                            {formatCurrency(a.harga * val.qty) ||
                              'Tidak diketahui'}
                          </h1>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <section className="md:max-w-xs flex">
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            <FaArrowLeft className="mr-2" /> Kembali
          </Link>
        </section>
      </main>
    </>
  );
};

export default ContainersAdminTransactionDetails;
