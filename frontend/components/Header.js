import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="sticky w-full flex justify-between items-center max-w-7xl p-2 mx-auto font-mono">
      <Link href="/">
        <p className="cursor-pointer text-2xl font-bold" >Memoir Portal</p>
      </Link>
      <div className="flex items-center space-x-3">
        <Link className="cursor-pointer" href="/">
          Memoirs
        </Link>
        <Link href="/ideasboard">
          <a
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
           text-white rounded-lg py-1 px-2 cursor-pointer"
          >
            Ideas Board 💡
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
