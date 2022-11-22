import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { bindingState } from '../../../../utils/bindingState';
import { headerConfig } from '../../../../utils/headerConfig';

const ContainersPackageEdit: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [namePackageOld, setNamePackageOld] = useState('');
  const [pricePackageOld, setPricePackageOld] = useState('');
  const [namePackage, setNamePackage] = useState('');
  const [pricePackage, setPricePackage] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/paket/${id}`, headerConfig())
        .then((res) => {
          setNamePackageOld(res.data.data.nama_paket);
          setPricePackageOld(res.data.data.harga);
        })
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  // Handle PUT Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      id_paket: id,
      nama_paket: namePackage,
      harga: pricePackage,
    };

    axios
      .put('/paket', sendData, headerConfig())
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/package');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Edit Paket | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Ubah Paket</h1>
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
                    Nama Paket (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Nama Paket Old"
                    value={namePackageOld}
                    disabled
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Harga (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Harga"
                    value={pricePackageOld}
                    required
                    disabled
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="namePackage"
                  >
                    Nama Paket
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="namePackage"
                    name="namePackage"
                    type="text"
                    placeholder="Nama Paket"
                    value={namePackage}
                    onChange={(e) =>
                      bindingState(e, setNamePackage, 'namePackage')
                    }
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="pricePackage"
                  >
                    Harga
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="pricePackage"
                    name="pricePackage"
                    type="text"
                    placeholder="Harga"
                    value={pricePackage}
                    onChange={(e) =>
                      bindingState(e, setPricePackage, 'pricePackage')
                    }
                    required
                  />
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

export default ContainersPackageEdit;
