'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Grader
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Pages</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/prediction" className="hover:underline">Prediction</Link>
                </li>
                <li className="mb-4">
                  <Link href="/multiple-prediction" className="hover:underline">Multiple Prediction</Link>
                </li>
                <li>
                  <Link href="/help" className="hover:underline">Help</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://linkedin.com" className="hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li className="mb-4">
                  <a href="https://discord.com" className="hover:underline" target="_blank" rel="noopener noreferrer">Discord</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} YourAppName. All rights reserved.
        </div>
      </div>
    </footer>
  );
}