// src/components/Header.jsx
import { NavLink } from 'react-router';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <nav className="flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Directory
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Admin
        </NavLink>
        <button
          className="btn btn-sm cursor-pointer btn-ghost text-xs text-sky-700"
          onClick={toggleTheme}>
          Current theme: {theme}
        </button>
      </nav>
    </div>
  );
}