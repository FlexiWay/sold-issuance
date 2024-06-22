import React from 'react'
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

function Footer() {
  return (
    <footer className='w-full flex items-center justify-between gap-2 relative lg:absolute bottom-0 left-0 z-50 p-4'>
      <span className='text-xs'>Powered by @ 2024 Parity Finance</span>
      <div className="flex items-center justify-center gap-2">
        <a href="https://twitter.com/parityfinance" target="_blank" rel="noreferrer" className='text-xs'>
          <FaTwitter size={16} />
        </a>
        <a href="https://twitter.com/parityfinance" target="_blank" rel="noreferrer" className='text-xs'>
          <TbWorldWww size={16} />
        </a>
        <a href="https://twitter.com/parityfinance" target="_blank" rel="noreferrer" className='text-xs'>
          <FaLinkedin size={16} />
        </a>
      </div>
    </footer>
  )
}

export default Footer