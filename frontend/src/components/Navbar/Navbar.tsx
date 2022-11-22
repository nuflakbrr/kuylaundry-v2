import { FC, useEffect } from 'react';
import Link from 'next/link';

import styles from './Navbar.module.css';
import ThemesSwitch from '../Mixins/ThemesSwitch';
// import Logo from ''

const Navbar: FC = () => {
  // Navbar fixed position if scrolling
  useEffect(() => {
    window.onscroll = () => {
      const header = document.querySelector('header');
      const fixNav = header?.offsetTop ?? 0;

      if (window.pageYOffset > fixNav) {
        header?.classList.add(styles.navbarFixed);
      } else {
        header?.classList.remove(styles.navbarFixed);
      }
    };
  }, []);

  // Hamburger menu handler
  const hamburgerHandler = () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#navMenu');

    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle(styles.hamburgerActive);
      navMenu?.classList.toggle('hidden');
    });
  };

  const links = [
    { path: '/', name: 'Masuk' },
    { path: '/developers', name: 'Developer' },
  ];

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link href="/" legacyBehavior>
                <a className="block py-6">
                  <h1 className="dark:text-white text-black font-bold text-xl">
                    <span className="text-sky-500">Kuy</span>Laundry
                  </h1>
                </a>
              </Link>
            </div>
            <div className="flex items-center px-4">
              <button
                id="hamburger"
                name="hamburger"
                type="button"
                className="block absolute right-4 lg:hidden"
                onClick={hamburgerHandler}
              >
                <span
                  className={`${styles.hamburgerLine} origin-top-left transition duration-300 ease-in-out bg-black dark:bg-white`}
                ></span>
                <span
                  className={`${styles.hamburgerLine} transition duration-300 ease-in-out bg-black dark:bg-white`}
                ></span>
                <span
                  className={`${styles.hamburgerLine} origin-bottom-left transition duration-300 ease-in-out bg-black dark:bg-white`}
                ></span>
              </button>

              <nav
                id="navMenu"
                className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                  <ul className="block lg:flex">
                    {links.map((l, i) => (
                      <li className="group" key={i}>
                        <Link href={l.path} legacyBehavior>
                          <a className="text-base dark:text-black lg:dark:text-white text-black py-2 mx-8 lg:mx-2 flex group-hover:text-sky-500 transition duration-300 ease-in-out">
                            {l.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="block mx-8 lg:mx-2">
                    <ThemesSwitch />
                  </div>
                  {/* <ThemesSwitch /> */}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
