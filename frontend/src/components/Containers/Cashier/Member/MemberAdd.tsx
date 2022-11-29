import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarCashier from '../components/Sidebar';
import axios from '../../../../utils/axios';
import { bindingState } from '../../../../utils/bindingState';

const ContainersMemberAdd: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [memberName, setMemberName] = useState('');
  const [memberAddress, setMemberAddress] = useState('');
  const [memberGender, setMemberGender] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberPassword, setMemberPassword] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Handle POST Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      nama_member: memberName,
      alamat: memberAddress,
      jenis_kelamin: memberGender,
      no_telp: memberPhone,
      password: memberPassword,
    };

    await axios
      .post('/member', sendData)
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/cashier/member');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Tambah Member | KuyLaundry</title>
      </Head>

      <SidebarCashier />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Tambah Member</h1>
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
                    htmlFor="memberName"
                  >
                    Nama Member
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="memberName"
                    name="memberName"
                    type="text"
                    placeholder="Nama Member"
                    value={memberName}
                    onChange={(e) =>
                      bindingState(e, setMemberName, 'memberName')
                    }
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="memberAddress"
                  >
                    Alamat
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="memberAddress"
                    name="memberAddress"
                    type="text"
                    placeholder="Alamat"
                    value={memberAddress}
                    onChange={(e) =>
                      bindingState(e, setMemberAddress, 'memberAddress')
                    }
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="memberGender"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="memberGender"
                    name="memberGender"
                    onChange={(e) =>
                      bindingState(e, setMemberGender, 'memberGender')
                    }
                  >
                    <option disabled selected>
                      Pilih Jenis Kelamin
                    </option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="memberPhone"
                  >
                    No Telepon
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="memberPhone"
                    name="memberPhone"
                    type="text"
                    placeholder="No Telepon"
                    value={memberPhone}
                    onChange={(e) =>
                      bindingState(e, setMemberPhone, 'memberPhone')
                    }
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="memberPassword"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="memberPassword"
                    name="memberPassword"
                    type="password"
                    autoComplete="off"
                    placeholder="********"
                    value={memberPassword}
                    onChange={(e) =>
                      bindingState(e, setMemberPassword, 'memberPassword')
                    }
                    required
                  />
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

export default ContainersMemberAdd;
