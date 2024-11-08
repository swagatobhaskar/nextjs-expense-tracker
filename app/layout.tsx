import type { Metadata } from "next";
import {Inter, Spline_Sans} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spline = Spline_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spline',
})

export const metadata: Metadata = {
  title: "Tiny Expense Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spline.variable}`}>
      <body
        className=""
      >
        <div className="w-full h-20 bg-gray-700 content-center">
          <h4 className="font-spline text-white w-1/4 ml-20 text-4xl">
            My Tiny Expense Tracker
          </h4>
        </div>
        <div className="flex flex-row">
          <div id="sidebar" className="w-1/6 h-screen bg-gray-600">
            <nav className="font-inter font-light font-4xl text-white">
              <p className="mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">Home</p>
              <p className="mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">Categories</p>
              <p className="mx-2 mt-2 p-2 hover:font-semibold hover:bg-gray-700 hover:border-b-2">Sub-categories</p>
            </nav>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
