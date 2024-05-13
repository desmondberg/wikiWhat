'use client'
import React, { useState } from 'react'

export default function SearchBar({ onSearch }: any) {
    const [query, setQuery] = useState('');
    const handleInputChange = (e:any) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    const handleEnter =(event:any)=>{
        if(event.key==='Enter'){
            event.preventDefault();
            handleSearchClick();
        }
    }

    return (
        
        <div className="search-bar">

            <div className="search-input flex flex-col items-left justify-evenly space-x-2.5 p-2">
                <textarea className="text-slate-400 text-3xl w-full bg-zinc-900 p-1 rounded min-h-28 max-h-28"  name=""
                value={query} onChange={handleInputChange} placeholder="what are you looking for?" onKeyDown={handleEnter}></textarea>
                <button className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-1 m-2 rounded max-w-96" onClick={handleSearchClick} >Submit</button>
            </div>
        </div>
    )
}