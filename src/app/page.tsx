"use client"
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import Response from './components/Response';
import Header from './components/Header';
import { useState } from "react";
import { Nunito } from "@next/font/google";
import Footer from "./components/Footer";
const nunito = Nunito({
  subsets: ['latin'],
  weight: "variable"
});

export default function Home() {
  require('dotenv').config();
  const [searchResult, setSearchResult] = useState('');
  const handleSearch = (query: any) => {
    setSearchResult(query);
  };

  const mainClasses = "flex min-h-screen flex-col items-center p-8 bg-zinc-900 "



  return (
    <>
      <Footer />
      <main className={mainClasses + nunito.className}>
        <Header method={handleSearch} />
        <hr />
        <div className="container">
          <Response value={searchResult} />
        </div>
      </main>
    </>
  );
}
