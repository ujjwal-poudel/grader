'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Prediction', path: '/prediction' },
    { name: 'Multiple Prediction', path: '/multiple-prediction' },
    { name: 'Help', path: '/help' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // adjust threshold if needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/10 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Grader
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbar-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Items */}
        <div className={`${isOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-menu">
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:bg-transparent">
            {navItems.map(({ name, path }) => {
              const isActive = pathname === path;

              return (
                <li key={path}>
                  <Link
                    href={path}
                    className={`py-2 px-3 block md:inline md:px-0 md:py-0 transition-all
                    ${isActive ? 'text-purple-400 font-semibold' : 'text-white'}
                    hover:text-purple-300`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}