import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaEdit, FaFolderPlus, FaTrash } from 'react-icons/fa';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { headerConfig } from '../../../../utils/headerConfig';

const ContainersUserIndex: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [data, setData] = useState([]);

  // Fetch Data from API
  useEffect(() => {
    const getData = async () => {
      await axios
        .get('/petugas', headerConfig())
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, []);

  // Badge Color by Level
  const badgeColor = (level: string) => {
    if (level === 'kasir') {
      return (
        <p className="bg-blue-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Kasir
        </p>
      );
    } else if (level === 'admin') {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Admin
        </p>
      );
    } else {
      return (
        <p className="bg-yellow-500 px-2 py-0.5 rounded-xl text-black whitespace-no-wrap">
          Pemilik
        </p>
      );
    }
  };

  // Handle DELETE Data
  const handleDelete = async (id: any) => {
    alert('Apakah anda yakin ingin menghapus data ini?');

    await axios
      .delete(`/petugas/${id}`, headerConfig())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    router.reload();
  };

  return (
    <>
      <Head>
        <title>Daftar Petugas | KuyLaundry</title>
      </Head>

      <SidebarAdmin />

      <section className="bg-white dark:bg-gray-900 md:ml-64 min-h-screen">
        <div className="p-10 rounded-md w-full">
          <div className="flex flex-wrap items-center justify-between pb-6">
            <div>
              <h2 className="text-black dark:text-white text-2xl font-semibold">
                Daftar Petugas
              </h2>
            </div>
            <div className="lg:ml-20 ml-10 space-x-8">
              <Link href="/admin/user/add" legacyBehavior>
                <a className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  <FaFolderPlus className="mr-2" /> Tambah Petugas
                </a>
              </Link>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden">
                {!data.length ? (
                  <p className="text-black dark:text-white text-center mx-auto">
                    Memuat Data????...
                  </p>
                ) : (
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Nama Petugas
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Password
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((val: any, index) => (
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
                                {val.nama_petugas}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.username}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                ********
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {badgeColor(val.level)}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link
                              href={`/admin/user/edit/${val.id_petugas}`}
                              className="w-lg flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                            >
                              <FaEdit className="mr-2" /> Ubah
                            </Link>
                            <button
                              type="button"
                              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
                              onClick={() => handleDelete(val.id_petugas)}
                            >
                              <FaTrash className="mr-2" /> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainersUserIndex;
