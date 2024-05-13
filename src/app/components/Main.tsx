"use client"
import Image from "next/image";
import SearchBar from "./SearchBar";
import Response from './Response';
import Header from './Header';
import { useState } from "react";
import Footer from ".//Footer";

export default function Main() {
  require('dotenv').config();
  const [searchResult, setSearchResult] = useState('');
  const handleSearch = (query: any) => {
    setSearchResult(query);
  };

  const mainClasses = "flex min-h-screen flex-col items-center p-8 bg-zinc-900 "



  return (
    <>
      <main className={mainClasses}>
        <div className="container">
          <Header method={handleSearch} />
          <hr />
          <Response value={searchResult} />
          
        </div>
      </main>
      <Footer />
    </>
  );
}
