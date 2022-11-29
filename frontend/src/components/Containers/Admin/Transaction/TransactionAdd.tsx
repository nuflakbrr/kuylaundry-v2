import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { headerConfig } from '../../../../utils/headerConfig';
import { bindingState } from '../../../../utils/bindingState';
import { formatCurrency } from '../../../../utils/formatCurrency';

const ContainersTransactionAdd: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [idMember, setIdMember] = useState('');
  const [idAdmin, setIdAdmin] = useState('');
  const [idOutlet, setIdOutlet] = useState('');
  const [idPackage, setIdPackage] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionDeadline, setTransactionDeadline] = useState('');
  const [transactionPayment, setTransactionPayment] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionPaymentStatus, setTransactionPaymentStatus] = useState('');
  const [qty, setQty] = useState('');
  const [dataAdmin, setDataAdmin] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [dataOutlet, setDataOutlet] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Fetch Data from API
  useEffect(() => {
    // Fetch Admin
    const fetchAdmin = async () => {
      await axios
        .get('/petugas', headerConfig())
        .then((res) => setDataAdmin(res.data.data))
        .catch((err) => console.log(err));
    };

    // Fetch Member
    const fetchMember = async () => {
      await axios
        .get('/member', headerConfig())
        .then((res) => setDataMember(res.data.data))
        .catch((err) => console.log(err));
    };

    // Fetch Outlet
    const fetchOutlet = async () => {
      await axios
        .get('/outlet', headerConfig())
        .then((res) => setDataOutlet(res.data.data))
        .catch((err) => console.log(err));
    };

    // Fetch Package
    const fetchPackage = async () => {
      await axios
        .get('/paket', headerConfig())
        .then((res) => setDataPackage(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([fetchAdmin(), fetchMember(), fetchOutlet(), fetchPackage()]);
  }, []);

  // Handle POST Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      id_member: idMember,
      id_petugas: idAdmin,
      id_outlet: idOutlet,
      tgl_transaksi: transactionDate,
      tgl_batas: transactionDeadline,
      tgl_bayar: transactionPayment,
      status_pembayaran: transactionPaymentStatus,
      status_pengerjaan: transactionStatus,
      id_paket: idPackage,
      qty,
    };

    await axios
      .post('/transaksi', sendData)
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/dashboard');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Tambah Transaksi | KuyLaundry</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">
                  Tambah Transaksi
                </h1>
              </div>
              <form onSubmit={(e) => handleStore(e)}>
                {storeFailed && (
                  <div className="mt-4 bg-red-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Gagal menambahkan data, silakan coba kembali!
                    </p>
                  </div>
                )}
                {storeSuccess && (
                  <div className="mt-4 bg-green-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Tambah Data Sukses!
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idMember"
                  >
                    Nama Member
                  </label>
                  <select
                    name="idMember"
                    id="idMember"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e, setIdMember, 'idMember')}
                  >
                    <option selected disabled>
                      Pilih Member
                    </option>
                    {dataMember.map((item: any) => (
                      <option value={item.id_member} key={item.id_member}>
                        ID {item.id_member}: {item.nama_member}, {item.alamat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transactionDate"
                  >
                    Tanggal Transaksi
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                    Tanggal Bayar
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="transactionPayment"
                    name="transactionPayment"
                    type="date"
                    placeholder="Tanggal Bayar"
                    value={transactionPayment}
                    onChange={(e) =>
                      bindingState(
                        e,
                        setTransactionPayment,
                        'transactionPayment'
                      )
                    }
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
                    <option disabled selected>
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
                    <option disabled selected>
                      Pilih Status Pengerjaan
                    </option>
                    <option value="baru">Baru</option>
                    <option value="proses">Proses</option>
                    <option value="selesai">Selesai</option>
                    <option value="diambil">Diambil</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idPackage"
                  >
                    Paket
                  </label>
                  <select
                    name="idPackage"
                    id="idPackage"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e, setIdPackage, 'idPackage')}
                  >
                    <option selected disabled>
                      Pilih Paket
                    </option>
                    {dataPackage.map((item: any) => (
                      <option value={item.id_paket} key={item.id_paket}>
                        ID {item.id_paket}: {item.nama_paket}
                        {' => '}
                        {formatCurrency(item.harga)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="qty"
                  >
                    Kuantitas
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="qty"
                    name="qty"
                    type="text"
                    placeholder="Kuantitas"
                    value={qty}
                    onChange={(e) => bindingState(e, setQty, 'qty')}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idOutlet"
                  >
                    Cabang Outlet
                  </label>
                  <select
                    name="idOutlet"
                    id="idOutlet"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e, setIdOutlet, 'idOutlet')}
                  >
                    <option selected disabled>
                      Pilih Outlet
                    </option>
                    {dataOutlet.map((item: any) => (
                      <option value={item.id_outlet} key={item.id_outlet}>
                        ID {item.id_outlet}: {item.nama_outlet}, {item.alamat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idAdmin"
                  >
                    Petugas
                  </label>
                  <select
                    name="idAdmin"
                    id="idAdmin"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e, setIdAdmin, 'idAdmin')}
                  >
                    <option selected disabled>
                      Pilih Petugas
                    </option>
                    {dataAdmin.map((item: any) => (
                      <option value={item.id_petugas} key={item.id_petugas}>
                        ID {item.id_petugas}: {item.nama_petugas}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Tambah Data
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

export default ContainersTransactionAdd;
