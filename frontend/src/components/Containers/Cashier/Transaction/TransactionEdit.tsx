/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarCashier from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { bindingState } from '../../../../utils/bindingState';
import { headerConfig } from '../../../../utils/headerConfig';
import { formatLocalTime } from '../../../../utils/formatLocalTime';

const ContainersTransactionEdit: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [data, setData] = useState([]);
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionDeadline, setTransactionDeadline] = useState('');
  const [transactionPayment, setTransactionPayment] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionPaymentStatus, setTransactionPaymentStatus] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/transaksi/${id}`, headerConfig())
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  // Handle PUT Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      id_transaksi: id,
      tgl_transaksi: transactionDate,
      tgl_batas: transactionDeadline,
      tgl_bayar: transactionPayment,
      status_pembayaran: transactionPaymentStatus,
      status_pengerjaan: transactionStatus,
    };

    axios
      .put('/transaksi', sendData, headerConfig())
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/cashier/dashboard');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Edit Transaksi | KuyLaundry</title>
      </Head>

      <SidebarCashier />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Ubah Transaksi</h1>
              </div>
              <form onSubmit={(e) => handleStore(e)}>
                {storeFailed && (
                  <div className="mt-4 bg-red-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Gagal mengubah data, silakan coba kembali!
                    </p>
                  </div>
                )}
                {storeSuccess && (
                  <div className="mt-4 bg-green-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Ubah Data Sukses!
                    </p>
                  </div>
                )}
                {data.map((item: any, index) => (
                  <div key={index}>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="old"
                      >
                        Tanggal Transaksi Old
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="old"
                        name="old"
                        type="text"
                        placeholder="Tanggal Transaksi Old"
                        value={
                          formatLocalTime(item.tgl_transaksi) ||
                          'Tidak Diketahui'
                        }
                        disabled
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="old"
                      >
                        Batas Waktu Old
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="old"
                        name="old"
                        type="text"
                        placeholder="Batas Waktu Old"
                        value={
                          formatLocalTime(item.tgl_batas) || 'Tidak Diketahui'
                        }
                        disabled
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="old"
                      >
                        Tanggal Pembayaran Old
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="old"
                        name="old"
                        type="text"
                        placeholder="Tanggal Pembayaran Old"
                        value={
                          item.tgl_bayar
                            ? formatLocalTime(item.tgl_bayar)
                            : 'Tidak Diketahui'
                        }
                        disabled
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="old"
                      >
                        Status Pembayaran Old
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="old"
                        name="old"
                        type="text"
                        placeholder="Status Pembayaran Old"
                        value={item.status_pembayaran || 'Tidak Diketahui'}
                        disabled
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="old"
                      >
                        Status Pengerjaan Old
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="old"
                        name="old"
                        type="text"
                        placeholder="Status Pengerjaan Old"
                        value={item.status_pengerjaan || 'Tidak Diketahui'}
                        disabled
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transactionDate"
                  >
                    Tanggal Transaksi
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="transactionDate"
                    name="transactionDate"
                    type="date"
                    placeholder="Tanggal Transaksi"
                    value={transactionDate}
                    onChange={(e) =>
                      bindingState(e, setTransactionDate, 'transactionDate')
                    }
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transactionDeadline"
                  >
                    Batas Waktu
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="transactionDeadline"
                    name="transactionDeadline"
                    type="date"
                    placeholder="Batas Waktu"
                    value={transactionDeadline}
                    onChange={(e) =>
                      bindingState(
                        e,
                        setTransactionDeadline,
                        'transactionDeadline'
                      )
                    }
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transactionPayment"
                  >
                    Tanggal Pembayaran
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="transactionPayment"
                    name="transactionPayment"
                    type="date"
                    placeholder="Tanggal Pembayaran"
                    value={transactionPayment}
                    onChange={(e) =>
                      bindingState(
                        e,
                        setTransactionPayment,
                        'transactionPayment'
                      )
                    }
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transactionPaymentStatus"
                  >
                    Status Pembayaran
                  </label>
                  <select
                    name="transactionPaymentStatus"
                    id="transactionPaymentStatus"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      bindingState(
                        e,
                        setTransactionPaymentStatus,
                        'transactionPaymentStatus'
                      )
                    }
                  >
                    <option selected disabled>
                      Pilih Status Pembayaran
                    </option>
                    <option value="lunas">Lunas</option>
                    <option value="belum_lunas">Belum Lunas</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transactionStatus"
                  >
                    Status Pengerjaan
                  </label>
                  <select
                    name="transactionStatus"
                    id="transactionStatus"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      bindingState(e, setTransactionStatus, 'transactionStatus')
                    }
                  >
                    <option selected disabled>
                      Pilih Status Pengerjaan
                    </option>
                    <option value="baru">Baru</option>
                    <option value="proses">Proses</option>
                    <option value="selesai">Selesai</option>
                    <option value="diambil">Diambil</option>
                    <option value="dibatalkan">Dibatalkan</option>
                  </select>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Ubah Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContainersTransactionEdit;
