"use client"

import { useState } from "react";

export default function TopNav() {
  // state sederhana; sesuaikan kalau ingin di-lift ke parent
  const [language, setLanguage] = useState<"eng" | "man" | "russ">("eng");
  const [currency, setCurrency] = useState<"usd" | "eur">("usd");

  // warna mengikuti CSS variabel yang kamu punya
  const txt = "var(--main-nav-txt)";
  const bg = "var(--main-nav-bg)";

  return (
    <div
      className="hidden lg:block border-b border-white/20 py-[14px]"
      style={{ backgroundColor: bg }}
    >
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex items-center justify-between">
          {/* Left: Text */}
          <div className="text-[14px]" style={{ color: txt }}>
            Selamat datanng di E-Commerce Fashionix
          </div>

          {/* Right: Social + Switchers */}
          <div className="flex items-center">
            {/* Social */}
            <ul className="flex items-center gap-3 pr-6 mr-6 border-r border-white/20">
              <li className="text-[14px]" style={{ color: txt }}>
                Ikuti kami:
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-6 w-6 items-center justify-center opacity-90 hover:opacity-100"
                  aria-label="Twitter"
                  title="Twitter"
                  style={{ color: txt }}
                >
                  {/* Twitter */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M19.633 7.997c.013.18.013.362.013.544 0 5.545-4.221 11.94-11.94 11.94-2.37 0-4.573-.693-6.427-1.885.33.04.648.053.99.053a8.46 8.46 0 0 0 5.244-1.806 4.227 4.227 0 0 1-3.946-2.929c.258.04.514.066.785.066.38 0 .759-.053 1.113-.146a4.219 4.219 0 0 1-3.387-4.14v-.053c.56.31 1.21.5 1.899.526A4.213 4.213 0 0 1 2.86 6.7c0-.785.21-1.5.58-2.128a12.001 12.001 0 0 0 8.705 4.417 4.758 4.758 0 0 1-.106-.968 4.216 4.216 0 0 1 7.296-2.883 8.3 8.3 0 0 0 2.673-1.02 4.23 4.23 0 0 1-1.853 2.33 8.447 8.447 0 0 0 2.43-.65 9.075 9.075 0 0 1-2.351 2.215z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-6 w-6 items-center justify-center opacity-90 hover:opacity-100"
                  aria-label="Facebook"
                  title="Facebook"
                  style={{ color: txt }}
                >
                  {/* Facebook */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M22 12.07C22 6.49 17.52 2 11.94 2 6.36 2 1.88 6.49 1.88 12.07c0 5.02 3.66 9.19 8.44 9.99v-7.06H7.9v-2.93h2.42V9.41c0-2.4 1.43-3.73 3.63-3.73 1.05 0 2.15.19 2.15.19v2.38h-1.21c-1.19 0-1.57.74-1.57 1.5v1.8h2.67l-.43 2.93h-2.24v7.06c4.77-.8 8.44-4.97 8.44-9.99z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-6 w-6 items-center justify-center opacity-90 hover:opacity-100"
                  aria-label="Pinterest"
                  title="Pinterest"
                  style={{ color: txt }}
                >
                  {/* Pinterest */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.55 2 4 5.58 4 8.82c0 1.99.75 3.77 2.36 4.43.26.11.49 0 .56-.28.05-.19.18-.69.24-.9.08-.28.05-.38-.16-.62-.46-.54-.75-1.24-.75-2.24 0-2.89 2.17-5.48 5.65-5.48 3.08 0 4.78 1.88 4.78 4.39 0 3.31-1.47 6.11-3.66 6.11-1.21 0-2.12-1-1.83-2.23.35-1.47 1.03-3.06 1.03-4.13 0-.95-.51-1.75-1.57-1.75-1.25 0-2.26 1.29-2.26 3.01 0 1.1.37 1.84.37 1.84l-1.49 6.3c-.44 1.88-.07 4.18-.04 4.41.02.07.1.1.15.04.07-.08 1.02-1.45 1.43-2.79.1-.35.56-2.2.56-2.2.28.53 1.09 1 1.95 1 2.57 0 4.52-2.43 4.52-5.68C17.15 5.6 15.02 2 12.04 2z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-6 w-6 items-center justify-center opacity-90 hover:opacity-100"
                  aria-label="Reddit"
                  title="Reddit"
                  style={{ color: txt }}
                >
                  {/* Reddit */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM9.25 10.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 18.25c1.4 0 2.6-.56 3.45-1.44.2-.2.2-.52 0-.72a.5.5 0 0 0-.71 0c-.66.68-1.7 1.11-2.74 1.11-1.03 0-2.07-.43-2.74-1.1a.5.5 0 1 0-.71.71c.85.87 2.05 1.44 3.45 1.44ZM14.5 6.25l1.77.38a1.75 1.75 0 1 0 .2 1.1l-1.9-.41-.44 2.08a6 6 0 1 0-.94.1l.31-1.46.4-1.79Z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-6 w-6 items-center justify-center opacity-90 hover:opacity-100"
                  aria-label="YouTube"
                  title="YouTube"
                  style={{ color: txt }}
                >
                  {/* YouTube */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M23 7.5s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C17.7 4 12 4 12 4h0s-5.7 0-8.1.3c-.4 0-1.3.1-2.1.9C1.1 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.8 2.3c.8.8 1.9.8 2.4.9 1.8.2 7.8.3 7.8.3s5.7 0 8.1-.3c.4 0 1.3-.1 2.1-.9.6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8ZM9.75 14.5V8.9l6.05 2.8-6.05 2.8Z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-6 w-6 items-center justify-center opacity-90 hover:opacity-100"
                  aria-label="Instagram"
                  title="Instagram"
                  style={{ color: txt }}
                >
                  {/* Instagram */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11.001 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7.001 3.5 3.5 0 0 0 0-7ZM18 6.9a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2Z"/>
                  </svg>
                </a>
              </li>
            </ul>

            {/* Switchers */}
            <div className="flex items-center gap-2">
              {/* Language */}
              <div className="relative">
                <select
                  aria-label="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as typeof language)}
                  className="appearance-none bg-transparent pr-7 pl-3 py-1.5 text-sm font-normal outline-none cursor-pointer"
                  style={{ color: txt }}
                >
                  <option value="russ">id Indonesia</option>
                  <option value="man">🇨🇳 Mandarin</option>
                  <option value="eng">🇺🇸 English</option>
                </select>
                {/* caret */}
                <svg
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: txt }}
                >
                  <path
                    d="M5 7l5 6 5-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Currency */}
              <div className="relative">
                <select
                  aria-label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as typeof currency)}
                  className="appearance-none bg-transparent pr-7 pl-3 py-1.5 text-sm font-normal outline-none cursor-pointer"
                  style={{ color: txt }}
                >
                  <option value="eur">IDR — Rupiah</option>
                  <option value="usd">USD — Dollar</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: txt }}
                >
                  <path
                    d="M5 7l5 6 5-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* /Switchers */}
          </div>
        </div>
      </div>
    </div>
  );
}

