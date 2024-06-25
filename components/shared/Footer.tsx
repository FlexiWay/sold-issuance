import Image from 'next/image';
import React from "react";
import { FaTwitter, FaLinkedin, FaX } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

function Footer() {
  return (
    <footer className="w-full flex items-center justify-start container mx-auto sm:px-6 lg:px-8 gap-2 relative lg:absolute bottom-0 left-0 z-50 p-4">
      {/* <span className="text-xs">Powered by @ 2024 Parity Finance</span> */}
      <div className="flex items-center justify-center gap-2">
        <a
          href="https://twitter.com/parityfinance"
          target="_blank"
          rel="noreferrer"
          data-tip="X"
          className="text-xs tooltip opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          {/* <FaTwitter size={16} /> */}
          <Image width={16} height={16} src="/images/x.svg" alt="x" className='w-4 h-4' />
        </a>
        <a
          href="https://twitter.com/parityfinance"
          target="_blank"
          rel="noreferrer"
          data-tip="Telegram"
          className="text-xs tooltip opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          {/* <TbWorldWww size={16} /> */}
          <Image width={16} height={16} src="/images/telegram.svg" alt="telegram" className='w-4 h-4' />
        </a>
        <a
          href="https://twitter.com/parityfinance"
          target="_blank"
          rel="noreferrer"
          data-tip="Discord"
          className="text-xs tooltip opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          {/* <FaLinkedin size={16} /> */}
          <Image width={16} height={16} src="/images/discord.svg" alt="discord" className='w-4 h-4' />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
