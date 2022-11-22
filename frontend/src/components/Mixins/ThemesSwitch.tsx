import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemesSwitch: FC = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <FaSun
          className="text-xl"
          role="button"
          onClick={() => setTheme('light')}
        />
      );
    } else {
      return (
        <FaMoon
          className="text-xl"
          role="button"
          onClick={() => setTheme('dark')}
        />
      );
    }
  };

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white dark:hover:bg-sky-500 hover:bg-sky-500 hover:text-zinc-50">
      {renderThemeChanger()}
    </div>
  );
};

export default ThemesSwitch;
