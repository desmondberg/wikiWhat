import React, { useState } from 'react'
import SearchBar from './SearchBar';
export default function Header({method}:any) {

    return (
        <header className="flex items-center justify-evenly">
            <div className="logo p-8 border-2 rounded">
                <h1 className="text-6xl  text-orange-400 ">wikiWhat</h1>
                <sub>search wikipedia with a rough description</sub>
                {/* <nav>
                    <button type="button" className="bg-orange-300 hover:bg-orange-400 text-slate-900 p-1 m-2 rounded text-xl">Log in</button>
                </nav> */}
            </div>
            <SearchBar onSearch={method} />
        </header>
    )
}
