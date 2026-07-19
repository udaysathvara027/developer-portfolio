"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "ABOUT", href: "#about" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "SKILLS", href: "#skills" },
    { name: "EDUCATION", href: "#education" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-300 border-b border-[#353a52] bg-[#0d1224]/70 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-3xl font-bold text-[#16f2b3]">
            UDAY
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-white transition hover:text-[#16f2b3]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <HiMenuAlt3 size={32} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-500 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-1000 h-screen w-72 bg-[#10172d] border-l border-[#353a52] shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between border-b border-[#353a52] px-6">
          <span className="text-2xl font-bold text-[#16f2b3]">
            UDAY
          </span>

          <button onClick={() => setIsOpen(false)}>
            <HiX
              size={30}
              className="text-white hover:text-[#16f2b3]"
            />
          </button>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="px-8 py-4 text-lg text-white transition hover:bg-[#1a2342] hover:text-[#16f2b3]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
