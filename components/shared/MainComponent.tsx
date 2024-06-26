"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import MyMultiButton from "./MyMultiButton";
import Image from "next/image";
import { useSold } from "@/hooks/useSold";
import { Spin } from "antd";
import { CiWallet } from "react-icons/ci";

export default function MainComponent() {
  const wallet = useWallet();
  const [leftTab, setLeftTab] = useState(true);

  const {
    handleDepositFunds,
    handleWithdrawFunds,
    amount,
    setAmount,
    loading,
    userBalancePUSD,
    userBalanceUSDC,
  } = useSold();

  const handleAmountChange = (event: { target: { value: any } }) => {
    setAmount(parseFloat(event.target.value));
  };

  return (
    <section className="w-full my-10">
      <div
        className="w-full flex items-start lg:items-center justify-center px-4 lg:px-0"
        style={{ height: "calc(100vh - 104px)" }}
      >
        <div className="w-full max-w-md bg-brand-bg rounded-lg shadow-md border border-[#E5E7EB0A]  min-h-10">
          {/* tabs */}
          <div className="w-full flex items-center justify-between">
            <div
              className={`w-1/2 flex items-center justify-center p-4  text-white rounded-tl-lg  hover:bg-opacity-40 cursor-pointer ${leftTab ? "bg-[#0B0D0F] font-black" : "bg-[#060708] font-semibold hover:font-black"} ease-in-out transition-all duration-300`}
              onClick={() => setLeftTab(true)}
            >
              Mint
            </div>
            <div
              className={`w-1/2 flex items-center justify-center p-4   text-white rounded-tr-lg  hover:bg-opacity-40 cursor-pointer ${!leftTab ? "bg-[#0B0D0F] font-black" : "bg-[#060708] font-semibold hover:font-black"} ease-in-out transition-all duration-300`}
              onClick={() => setLeftTab(false)}
            >
              Redeem
            </div>
          </div>

          {/* content  */}
          {leftTab ? (
            <form className="w-full flex flex-col items-center justify-start gap-6 p-6 py-8">
              {/* from */}
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <div className="w-full flex items-center justify-start">
                  <span className="text-xs">You&apos;re giving</span>
                  {/* <div className="flex items-center justify-center gap-2">
                    <div className="w-full flex items-center justify-center opacity-50 gap-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.166016 4.25H11.2493C11.4041 4.25 11.5524 4.31146 11.6618 4.42085C11.7712 4.53025 11.8327 4.67862 11.8327 4.83333V10.6667C11.8327 10.8214 11.7712 10.9697 11.6618 11.0791C11.5524 11.1885 11.4041 11.25 11.2493 11.25H0.749349C0.594639 11.25 0.446266 11.1885 0.33687 11.0791C0.227474 10.9697 0.166016 10.8214 0.166016 10.6667V4.25ZM0.749349 0.75H9.49935V3.08333H0.166016V1.33333C0.166016 1.17862 0.227474 1.03025 0.33687 0.920854C0.446266 0.811458 0.594639 0.75 0.749349 0.75ZM7.74935 7.16667V8.33333H9.49935V7.16667H7.74935Z" fill="#69707D" />
                      </svg>
                      <span className="text-[10px]">
                        {userBalanceUSDC.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="rounded-2xl uppercase bg-opacity-10 bg-white border border-opacity-20 border-white hover:border-brand-secondary hover:border-opacity-40 hover:text-brand-secondary text-[8px] text-opacity-40 hover:text-opacity-100 px-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setAmount(userBalanceUSDC / 2);
                        }}
                      >
                        Half
                      </button>
                      <button
                        className="rounded-2xl uppercase bg-opacity-10 bg-white border border-opacity-20 border-white hover:border-brand-secondary hover:border-opacity-40 hover:text-brand-secondary text-[8px] text-opacity-40 hover:text-opacity-100 px-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setAmount(userBalanceUSDC);
                        }}
                      >
                        Max
                      </button>
                    </div>
                  </div> */}
                </div>
                <div className="relative w-full flex items-center justify-start">
                  <Image
                    width={40}
                    height={40}
                    src="/usdc.svg"
                    alt="usdc"
                    className="w-10 h-10 absolute z-30 left-3 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="number"
                    id="amount-buy"
                    className="w-full input text-end bg-[#1B1E24] px-16 pr-6 py-6 pb-10 relative !text-opacity-0 !text-transparent"
                    onChange={handleAmountChange}
                    onFocus={(e) =>
                      e.target.value === "0" && (e.target.value = "")
                    }
                  />
                  <span className="pr-6 absolute right-0 z-0 top-1/2 -translate-y-[55%] text-[14px] opacity-100 flex flex-col items-end justify-center -gap-0 pointer-events-none">
                    <span className="text-[20px] -mb-1 text-white">
                      {amount}
                    </span>
                    <span className="text-xs opacity-50">${amount}</span>
                  </span>
                  <div className="absolute top-1/2 -translate-y-1/2 left-16 flex flex-col items-start justify-start gap-1">
                    <span className="font-bold uppercase text-[18px] -mb-2">
                      USDC
                    </span>
                    <div className="flex items-center justify-start gap-1">
                      <div className="flex items-center justify-start gap-1">
                        <span className="text-xs opacity-40">Balance:</span>
                        <span className="text-xs ">
                          {userBalanceUSDC.toLocaleString()}
                        </span>
                      </div>
                      <button
                        className="rounded-2xl text-[#3B42FF] hover:text-brand-secondary  text-[12px] px-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setAmount(userBalanceUSDC);
                        }}
                      >
                        Max
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* to */}
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <div className="w-full flex items-center justify-start">
                  <span className="text-xs">To receive</span>
                  {/* <div className=" flex items-center justify-end opacity-50 gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.166016 4.25H11.2493C11.4041 4.25 11.5524 4.31146 11.6618 4.42085C11.7712 4.53025 11.8327 4.67862 11.8327 4.83333V10.6667C11.8327 10.8214 11.7712 10.9697 11.6618 11.0791C11.5524 11.1885 11.4041 11.25 11.2493 11.25H0.749349C0.594639 11.25 0.446266 11.1885 0.33687 11.0791C0.227474 10.9697 0.166016 10.8214 0.166016 10.6667V4.25ZM0.749349 0.75H9.49935V3.08333H0.166016V1.33333C0.166016 1.17862 0.227474 1.03025 0.33687 0.920854C0.446266 0.811458 0.594639 0.75 0.749349 0.75ZM7.74935 7.16667V8.33333H9.49935V7.16667H7.74935Z" fill="#69707D" />
                    </svg>
                    <span className="text-[10px]">
                      {userBalancePUSD.toLocaleString()}
                    </span>
                  </div> */}
                </div>
                <div className="relative w-full flex items-center justify-start">
                  <Image
                    width={40}
                    height={40}
                    src="/pusd.png"
                    alt="pusd"
                    className="w-10 h-10 absolute z-30 left-3 top-1/2 -translate-y-1/2 rounded-full"
                  />
                  <input
                    type="number"
                    disabled
                    className="w-full input text-end bg-[#1B1E24] px-16 pr-6 py-6 pb-10 relative !text-opacity-80 !text-transparent"
                    placeholder=""
                    value={amount}
                  />
                  <span className="pr-6 absolute right-0 z-0 top-1/2 -translate-y-[55%] text-[14px] opacity-100 flex flex-col items-end justify-center -gap-0 pointer-events-none">
                    <span className="text-[20px] -mb-1 text-white">
                      {amount}
                    </span>
                    <span className="text-xs opacity-50">${amount}</span>
                  </span>
                  <div className="absolute top-1/2 -translate-y-1/2 left-16 flex flex-col items-start justify-start gap-1">
                    <span className="font-bold uppercase text-[18px] -mb-2">
                      pUSD
                    </span>
                    <div className="flex items-center justify-start gap-1">
                      <div className="flex items-center justify-start gap-1">
                        <span className="text-xs opacity-40">Balance:</span>
                        <span className="text-xs ">
                          {userBalancePUSD.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-0.5 bg-[#E5E7EB14]"></div>

              {/* stats */}
              <div className="w-full flex flex-col items-start justify-start gap-4">
                {/* price */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Price</span>
                  <span className="text-xs ">1 PUSD PER USDC</span>
                </div>
                {/* slippage tolerance */}
                {/* <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Slippage tolerance</span>
                  <span className="text-xs ">-</span>
                </div> */}
                {/* minimum received */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Minimum received</span>
                  <span className="text-xs ">{amount} PUSD</span>
                </div>
                {/* swap fee */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Mint fee</span>
                  <span className="text-xs ">0.00%</span>
                </div>
              </div>

              {/* button */}
              <div className="w-full flex items-center justify-center">
                {wallet.publicKey ? (
                  <button
                    className={`w-full h-full rounded-lg text-white py-4 px-8 disabled:cursor-not-allowed uppercase bg-brand-first ${loading && `text-opacity-50`} disabled:text-gray-80 disabled:text-opacity-20  bg-opacity-100 disabled:bg-opacity-10 hover:bg-opacity-20 ease-in-out transition-all duration-300`}
                    onClick={handleDepositFunds}
                    disabled={loading || amount === 0}
                  >
                    {loading && <Spin size="small" />} {!loading && `Mint`}
                  </button>
                ) : (
                  <MyMultiButton />
                )}
              </div>
            </form>
          ) : (
            // right side
            <>
              <form className="w-full flex flex-col items-center justify-start gap-6 p-6 py-8">
                {/* from */}
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs">You&apos;re giving</span>
                    {/* <div className="flex items-center justify-center gap-2">
                      <div className="w-full flex items-center justify-center opacity-50 gap-1">
                        <CiWallet className="w-3 h-3" />
                        <span className="text-[10px]">
                          {userBalancePUSD.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="rounded-2xl uppercase bg-opacity-10 bg-white border border-opacity-20 border-white hover:border-brand-secondary hover:border-opacity-40 hover:text-brand-secondary text-[8px] text-opacity-40 hover:text-opacity-100 px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setAmount(userBalancePUSD / 2);
                          }}
                        >
                          half
                        </button>
                        <button
                          className="rounded-2xl uppercase bg-opacity-10 bg-white border border-opacity-20 border-white hover:border-brand-secondary hover:border-opacity-40 hover:text-brand-secondary text-[8px] text-opacity-40 hover:text-opacity-100 px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setAmount(userBalancePUSD);
                          }}
                        >
                          max
                        </button>
                      </div>
                    </div> */}
                  </div>
                  <div className="relative w-full flex items-center justify-start">
                    <Image
                      width={40}
                      height={40}
                      src="/pusd.png"
                      alt="pUSD"
                      className="w-10 h-10 absolute z-30 left-3 top-1/2 -translate-y-1/2 rounded-full"
                    />
                    <input
                      type="number"
                      id="amount-sell"
                      className="w-full input text-end bg-[#1B1E24] px-16 pr-6 py-6 pb-10 relative !text-opacity-0 !text-transparent"
                      onChange={handleAmountChange}
                      onFocus={(e) =>
                        e.target.value === "0" && (e.target.value = "")
                      }
                    />
                    <span className="pr-6 absolute right-0 z-0 top-1/2 -translate-y-[55%] text-[14px] opacity-100 flex flex-col items-end justify-center -gap-0 pointer-events-none">
                      <span className="text-[20px] -mb-1 text-white">
                        {amount}
                      </span>
                      <span className="text-xs opacity-50">${amount}</span>
                    </span>
                    <div className="absolute top-1/2 -translate-y-1/2 left-16 flex flex-col items-start justify-start">
                      <span className="font-bold uppercase text-[18px] -mb-2">
                        PUSD
                      </span>
                      <div className="flex items-center justify-start gap-1">
                        <div className="flex items-center justify-start gap-1">
                          <span className="text-xs opacity-40">Balance:</span>
                          <span className="text-xs ">
                            {userBalancePUSD.toLocaleString()}
                          </span>
                        </div>
                        <button
                          className="rounded-2xl text-[#3B42FF] hover:text-brand-secondary  text-[12px] px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setAmount(userBalanceUSDC);
                          }}
                        >
                          Max
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* to */}
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs">To receive</span>
                    {/* <div className="flex items-center justify-end opacity-50 gap-1">
                      <CiWallet className="w-3 h-3" />
                      <span className="text-[10px]">
                        {userBalanceUSDC.toLocaleString()}
                      </span>
                    </div> */}
                  </div>
                  <div className="relative w-full flex items-center justify-start">

                  </div>
                </div>

                <div className="w-full h-0.5 bg-[#E5E7EB14]"></div>

                {/* stats */}
                <div className="w-full flex flex-col items-start justify-start gap-4">
                  {/* price */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">Price</span>
                    <span className="text-xs ">1 USDC PER PUSD</span>
                  </div>
                  {/* slippage tolerance */}
                  {/* <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">
                      Slippage tolerance
                    </span>
                    <span className="text-xs ">-</span>
                  </div> */}
                  {/* minimum received */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">Minimum received</span>
                    <span className="text-xs ">{amount} USDC</span>
                  </div>
                  {/* swap fee */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">Redeem fee</span>
                    <span className="text-xs ">0.00%</span>
                  </div>
                </div>

                {/* button */}
                <div className="w-full flex items-center justify-center">
                  {wallet.publicKey ? (
                    <button
                      className={`w-full h-full rounded-lg text-white py-4 px-8 disabled:cursor-not-allowed uppercase bg-brand-first ${loading && `text-opacity-50`} disabled:text-gray-80 disabled:text-opacity-20  bg-opacity-100 disabled:bg-opacity-10 hover:bg-opacity-20 ease-in-out transition-all duration-300`}
                      onClick={handleWithdrawFunds}
                      disabled={loading || amount === 0}
                    >
                      {loading && <Spin size="small" />} {!loading && `Redeem`}
                    </button>
                  ) : (
                    <MyMultiButton />
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
