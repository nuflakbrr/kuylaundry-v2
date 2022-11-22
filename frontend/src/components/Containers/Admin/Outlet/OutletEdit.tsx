import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { bindingState } from '../../../../utils/bindingState';
import { headerConfig } from '../../../../utils/headerConfig';

const ContainersOutletEdit: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [nameOutletOld, setNameOutletOld] = useState('');
  const [addressOutletOld, setAddressOutletOld] = useState('');
  const [phoneOutletOld, setPhoneOutletOld] = useState('');
  const [nameOutlet, setNameOutlet] = useState('');
  const [addressOutlet, setAddressOutlet] = useState('');
  const [phoneOutlet, setPhoneOutlet] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/outlet/${id}`, headerConfig())
        .then((res) => {
          setNameOutletOld(res.data.data.nama_outlet);
          setAddressOutletOld(res.data.data.alamat);
          setPhoneOutletOld(res.data.data.no_telp);
        })
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  // Handle PUT Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      id_outlet: id,
      nama_outlet: nameOutlet,
      alamat: addressOutlet,
      no_telp: phoneOutlet,
    };

    axios
      .put('/outlet', sendData, headerConfig())
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/outlet');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Edit Outlet | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Ubah Outlet</h1>
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
                    Nama Outlet (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Nama Outlet Old"
                    value={nameOutletOld}
                    disabled
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Alamat (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Alamat"
                    value={addressOutletOld}
                    required
                    disabled
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    No Telepon (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="No Telepon"
                    value={phoneOutletOld}
                    required
                    disabled
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nameOutlet"
                  >
                    Nama Outlet
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="nameOutlet"
                    name="nameOutlet"
                    type="text"
                    placeholder="Nama Outlet"
                    value={nameOutlet}
                    onChange={(e) =>
                      bindingState(e, setNameOutlet, 'nameOutlet')
                    }
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="addressOutlet"
                  >
                    Alamat
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="addressOutlet"
                    name="addressOutlet"
                    type="text"
                    placeholder="Alamat"
                    value={addressOutlet}
                    onChange={(e) =>
                      bindingState(e, setAddressOutlet, 'addressOutlet')
                    }
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="addressOutlet"
                  >
                    No Telepon
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneOutlet"
                    name="phoneOutlet"
                    type="text"
                    placeholder="No Telepon"
                    value={phoneOutlet}
                    onChange={(e) =>
                      bindingState(e, setPhoneOutlet, 'phoneOutlet')
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

export default ContainersOutletEdit;
