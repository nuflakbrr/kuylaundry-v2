/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { bindingState } from '../../../../utils/bindingState';
import { headerConfig } from '../../../../utils/headerConfig';

const ContainersAdminUserEdit: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [oldUsername, setOldUsername] = useState('');
  const [oldNameAdmin, setOldNameAdmin] = useState('');
  const [oldLevel, setOldLevel] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameAdmin, setNameAdmin] = useState('');
  const [level, setLevel] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/petugas/${id}`, headerConfig())
        .then((res) => {
          setOldUsername(res.data.data.username);
          setOldNameAdmin(res.data.data.nama_petugas);
          setOldLevel(res.data.data.level);
        })
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  // Handle PUT Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      id_petugas: id,
      username,
      password,
      nama_petugas: nameAdmin,
      level,
    };

    axios
      .put('/petugas', sendData, headerConfig())
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/user');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Edit Petugas | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Ubah Petugas</h1>
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
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Nama Petugas Old
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Nama Petugas Old"
                    value={oldNameAdmin}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Username Old
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Username Old"
                    value={oldUsername}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Level Old
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Level Old"
                    value={oldLevel}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nameAdmin"
                  >
                    Nama Petugas
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="nameAdmin"
                    name="nameAdmin"
                    type="text"
                    placeholder="Nama Petugas"
                    value={nameAdmin}
                    onChange={(e) => bindingState(e, setNameAdmin, 'nameAdmin')}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => bindingState(e, setUsername, 'username')}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => bindingState(e, setPassword, 'password')}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="level"
                  >
                    Level
                  </label>
                  <select
                    name="level"
                    id="level"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e, setLevel, 'level')}
                  >
                    <option selected disabled>
                      Pilih Level
                    </option>
                    <option value="admin">Admin</option>
                    <option value="kasir">Kasir</option>
                    <option value="pemilik">Pemilik</option>
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

export default ContainersAdminUserEdit;
