"use client"

import React, { useEffect, useState } from 'react'
import { Theme } from '.'
import Link from 'next/link';
import useLocalStorage from 'use-local-storage';

const Navbar = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const switchTheme = (e) => {

    if(e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light")
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme)
  } , [theme])



  return (
    <div className="navbar border-b-2 border-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">WiW</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/countries'}>Countries</Link></li>
        </ul>
        <Theme onChange={switchTheme}/>
      </div>
    </div>
  )
}

export default Navbar