"use client"

import { usePathname } from "next/navigation"
import Link from "next/link";

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <div id="sidebar" className="w-1/6 h-screen bg-gray-600">
            <nav className="font-inter font-light font-4xl text-white">
              <Link href={'/'} className={`link ${pathname === '/' ? 'active' : ''}`}>
                <p className="hover:cursor-pointer mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">
                  Home
                </p>
              </Link>
              <Link href={'/categories'} className={`link ${pathname === '/categories' ? 'active' : ''}`}>
                <p className="hover:cursor-pointer mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">
                  Categories
                </p>
              </Link>
              <Link href={'/subcategories'} className={`link ${pathname === '/subcategories' ? 'active' : ''}`}>
                <p className="hover:cursor-pointer mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">
                  Sub-categories
                </p>
              </Link>
              <Link href={'/categories/demo'} className={`link ${pathname === '/subcategories/demo' ? 'active' : ''}`}>
                <p className="hover:cursor-pointer mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">
                  Dropdown Demo
                </p>
              </Link>
            </nav>
        </div>
    )
}