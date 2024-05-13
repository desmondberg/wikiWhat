"use client"
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import Response from './components/Response';
import Header from './components/Header';
import { useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
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
