import { FC, useState, useEffect } from 'react';
import Head from 'next/head';

import SidebarMember from './components/Sidebar';
import TransactionItem from './components/TransactionItem';
import axios from '../../../utils/axios';
import { headerConfig } from '../../../utils/headerConfig';

const ContainersDashboardMember: FC = () => {
  // Required state
  const [dataMember, setDataMember] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [memberId, setMemberId] = useState('');

  // Fetch data from API
  useEffect(() => {
    // Get Member Data Length
    const getMemberData = async () => {
      const member = JSON.parse(localStorage.getItem('member') || '{}');

      await axios
        .get('/member', headerConfig())
        .then((res) => setDataMember(res.data.data))
        .catch((err) => console.log(err));

      setMemberId(member.id_member);
    };

    // Get Transaction Data Length
    const getTransactionData = async () => {
      await axios
        .get(`/transaksi/member/${memberId}`, headerConfig())
        .then((res) => setDataTransaction(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getMemberData(), getTransactionData()]);
  }, [memberId]);

  return (
    <>
      <Head>
        <title>Dashboard Member - KuyLaundry</title>
      </Head>

      <SidebarMember />

      <section className="bg-white dark:bg-gray-900 md:ml-64 min-h-screen">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full p-10">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 py-5 gap-4">
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataMember.length}</p>
                    <p>Total Member</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataTransaction.length}</p>
                    <p>Histori Transaksi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-10">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-black dark:text-white text-2xl font-semibold">
                    Daftar Transaksi
                  </h2>
                </div>
              </div>
              <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full rounded-lg overflow-hidden">
                    {!dataTransaction.length ? (
                      <p className="text-black dark:text-white text-center mx-auto">
                        Memuat Data📦...
                      </p>
                    ) : (
                      dataTransaction.map((item: any) => (
                        <TransactionItem
                          memberName={item.member.nama_member}
                          outletName={item.outlet.nama_outlet}
                          dateTransaction={item.tgl_transaksi}
                          statusTransaction={item.status_pengerjaan}
                          statusPayment={item.status_pembayaran}
                          id={item.id_transaksi}
                          key={item.id_transaksi}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainersDashboardMember;
