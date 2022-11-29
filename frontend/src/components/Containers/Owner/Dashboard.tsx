import { FC, useState, useEffect, createRef } from 'react';
import Head from 'next/head';
import { FaFileDownload } from 'react-icons/fa';
import Pdf from 'react-to-pdf';

import SidebarOwner from './components/Sidebar';
import TransactionItem from './components/TransactionItem';
import axios from '../../../utils/axios';
import { headerConfig } from '../../../utils/headerConfig';
import { formatLocalTime } from '../../../utils/formatLocalTime';

const ContainersDashboardOwner: FC = () => {
  // Define ref for pdf
  const ref = createRef();

  // Options for pdf
  const options = { orientation: 'landscape', unit: 'in', format: [8.6, 8.6] };

  // Required state
  const [dataOutlet, setDataOutlet] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);

  // Fetch data from API
  useEffect(() => {
    // Get Outlet Data Length
    const getOutletData = async () => {
      await axios
        .get('/outlet', headerConfig())
        .then((res) => setDataOutlet(res.data.data))
        .catch((err) => console.log(err));
    };

    // Get Member Data Length
    const getMemberData = async () => {
      await axios
        .get('/member', headerConfig())
        .then((res) => setDataMember(res.data.data))
        .catch((err) => console.log(err));
    };

    // Get Transaction Data Length
    const getTransactionData = async () => {
      await axios
        .get('/transaksi', headerConfig())
        .then((res) => setDataTransaction(res.data.data))
        .catch((err) => console.log(err));
    };

    // Get Admin Data Length
    const getAdminData = async () => {
      await axios
        .get('/petugas', headerConfig())
        .then((res) => setDataAdmin(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([
      getOutletData(),
      getMemberData(),
      getTransactionData(),
      getAdminData(),
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard Pemilik - KuyLaundry</title>
      </Head>

      <SidebarOwner />

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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataOutlet.length}</p>
                    <p>Total Outlet</p>
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
                    <p>Total Transaksi</p>
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataAdmin.length}</p>
                    <p>Total Petugas</p>
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
                <div className="flex flex-wrap items-center justify-between">
                  <div className="lg:ml-2 ml-10 space-x-8">
                    <Pdf
                      targetRef={ref}
                      filename="Report-Owner.pdf"
                      options={options}
                    >
                      {({ toPdf }: any) => (
                        <button
                          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2 lg:mt-0"
                          onClick={toPdf}
                        >
                          <FaFileDownload className="mr-2" /> Unduh Laporan
                        </button>
                      )}
                    </Pdf>
                  </div>
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

      <section
        className="absolute top-1 -z-10"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                NO
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Nama Member
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Tanggal Transaksi
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Status Transaksi
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Status Pengerjaan
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Cabang Outlet
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTransaction.map((item: any, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {index + 1}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.member.nama_member}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatLocalTime(item.tgl_transaksi)}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.status_pembayaran}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.status_pengerjaan}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.outlet.nama_outlet}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ContainersDashboardOwner;
