/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

import axios from '../../../../utils/axios';
import ThemesSwitch from '../../../Mixins/ThemesSwitch';
import { logout } from '../../../../utils/logout';
import { blockAccess } from '../../../../utils/blockAccess';

const SidebarOwner: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [collapseShow, setCollapseShow] = useState('hidden');
  const [adminName, setAdminName] = useState();

  // Get full year
  const year = new Date().getFullYear();

  // Active ClassName for Navigation
  const activeClass =
    'bg-sky-500 rounded dark:bg-transparent text-white hover:text-white text-xs uppercase p-3 dark:px-0 dark:py-3 font-bold flex';
  const inActiveClass =
    'text-black dark:text-gray-500 hover:text-gray-400 text-xs uppercase py-3 font-bold flex';

  const activeClassses = (path: any) =>
    router.asPath === path ? activeClass : inActiveClass;

  // Access Navigation for Owner
  const primaryLinks = [
    {
      path: '/owner/dashboard',
      name: 'Dashboard Pemilik',
      icon: <FaHome className="mr-2 text-lg" />,
    },
  ];

  // Render data from local storage
  useEffect(() => {
    const getAdmin = async () => {
      const owner = JSON.parse(localStorage.getItem('pemilik') || '{}');

      await axios
        .get('/petugas', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(() => setAdminName(owner.nama_petugas))
        .catch((err) => console.log(err));
    };

    Promise.all([getAdmin()]);
  }, []);

  // Block Access if Login level is not Owner
  blockAccess('pemilik', router);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between relative md:w-64 z-20 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <Link href="/owner/dashboard" legacyBehavior>
            {!adminName ? (
              <p className="md:block text-left md:pb-2 text-black dark:text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                Memuat Data📦...
              </p>
            ) : (
              <a className="md:block text-left md:pb-2 text-black dark:text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                Halo, {adminName}
              </a>
            )}
          </Link>

          <button
            className="cursor-pointer text-black dark:text-white focus:text-white md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() =>
              setCollapseShow('bg-slate-100 dark:bg-slate-800 m-2 py-3 px-6')
            }
          >
            <svg
              className="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/owner/dashboard" legacyBehavior>
                    <a className="md:block text-left text-white md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0">
                      <h1 className="text-black dark:text-white font-bold text-xl">
                        <span className="text-sky-500">Kuy</span>Laundry
                      </h1>
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black dark:text-white md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <h6 className="md:min-w-full text-slate-400 dark:text-gray-600 text-xs uppercase font-bold block mb-1">
              Navigasi
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {primaryLinks.map((link, index) => (
                <li key={index} className="items-center">
                  <Link href={link.path} legacyBehavior>
                    <a className={activeClassses(link.path)}>
                      {link.icon}
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}
            <h6 className="md:min-w-full text-slate-400 dark:text-gray-600 text-xs uppercase font-bold block mb-1">
              Pengaturan
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <button
                  className={inActiveClass}
                  onClick={() => logout('pemilik', router)}
                >
                  <FaSignOutAlt className="mr-2 text-lg" />
                  Keluar
                </button>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex md:items-center md:justify-between">
            <ThemesSwitch />
            <small className="text-[#B6B6B6]">&copy; {year} KuyLaundry</small>
          </div>
        </div>
      </nav>
      <div className="z-10 bg-slate-100 dark:bg-slate-800 hidden md:flex self-end justify-end items-center p-4 sticky top-0 cursor-default">
        <h1 className="text-black dark:text-white font-bold text-xl">
          <span className="text-sky-500">Kuy</span>Laundry
        </h1>
      </div>
      <div className="fixed bottom-16 right-6 md:hidden">
        <ThemesSwitch />
      </div>
    </>
  );
};

export default SidebarOwner;
