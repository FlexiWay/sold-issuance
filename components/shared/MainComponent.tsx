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
              className={`w-1/2 flex items-center justify-center p-4  text-white rounded-tl-lg  hover:bg-opacity-40 cursor-pointer font-semibold  ${leftTab ? "bg-[#0B0D0F]" : "bg-[#060708]"} ease-in-out transition-all duration-300`}
              onClick={() => setLeftTab(true)}
            >
              Mint
            </div>
            <div
              className={`w-1/2 flex items-center justify-center p-4   text-white rounded-tr-lg  hover:bg-opacity-40 cursor-pointer font-semibold  ${!leftTab ? "bg-[#0B0D0F]" : "bg-[#060708]"} ease-in-out transition-all duration-300`}
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
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs">You&apos;re giving</span>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-full flex items-center justify-center opacity-50 gap-1">
                      {/* <CiWallet className="w-3 h-3" /> */}
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
                  </div>
                </div>
                <div className="relative w-full flex items-center justify-start">
                  <Image
                    width={20}
                    height={20}
                    src="/usdc.png"
                    alt="usdc"
                    className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="number"
                    id="amount-buy"
                    className="w-full input  bg-[#1B1E24] px-12 pr-4 py-2"
                    placeholder="100"
                    value={amount}
                    onChange={handleAmountChange}
                    onFocus={(e) =>
                      e.target.value === "0" && (e.target.value = "")
                    }
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-6">
                    USDC
                  </span>
                </div>
              </div>
              {/* to */}
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs">To receive</span>
                  <div className=" flex items-center justify-end opacity-50 gap-1">
                    {/* <CiWallet className="w-3 h-3" /> */}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.166016 4.25H11.2493C11.4041 4.25 11.5524 4.31146 11.6618 4.42085C11.7712 4.53025 11.8327 4.67862 11.8327 4.83333V10.6667C11.8327 10.8214 11.7712 10.9697 11.6618 11.0791C11.5524 11.1885 11.4041 11.25 11.2493 11.25H0.749349C0.594639 11.25 0.446266 11.1885 0.33687 11.0791C0.227474 10.9697 0.166016 10.8214 0.166016 10.6667V4.25ZM0.749349 0.75H9.49935V3.08333H0.166016V1.33333C0.166016 1.17862 0.227474 1.03025 0.33687 0.920854C0.446266 0.811458 0.594639 0.75 0.749349 0.75ZM7.74935 7.16667V8.33333H9.49935V7.16667H7.74935Z" fill="#69707D" />
                    </svg>
                    <span className="text-[10px]">
                      {userBalancePUSD.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="relative w-full flex items-center justify-start">
                  <Image
                    width={20}
                    height={20}
                    src="/pusd.png"
                    alt="pusd"
                    className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
                  />
                  <input
                    type="number"
                    disabled
                    className="w-full input !bg-[#1B1E24] px-12 pr-4 py-2 !text-opacity-80 !text-white"
                    placeholder="100"
                    value={amount}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-6">
                    pUSD
                  </span>
                </div>
              </div>

              <div className="w-full h-0.5 bg-[#E5E7EB14]"></div>


              {/* stats */}
              <div className="w-full flex flex-col items-start justify-start gap-4">
                {/* price */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Price</span>
                  <span className="text-xs ">1 pUSD PER USDC</span>
                </div>
                {/* slippage tolerance */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Slippage tolerance</span>
                  <span className="text-xs ">-</span>
                </div>
                {/* minimum received */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Minimum received</span>
                  <span className="text-xs ">{amount} pUSD</span>
                </div>
                {/* swap fee */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs opacity-40">Swap fee</span>
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
                    <div className="flex items-center justify-center gap-2">
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
                    </div>
                  </div>
                  <div className="relative w-full flex items-center justify-start">
                    <Image
                      width={20}
                      height={20}
                      src="/pusd.png"
                      alt="pUSD"
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
                    />
                    <input
                      type="number"
                      id="amount-sell"
                      className="w-full input !bg-[#1B1E24] px-12 pr-4 py-2"
                      placeholder="100"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 right-6">
                      pUSD
                    </span>
                  </div>
                </div>
                {/* to */}
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs">To receive</span>
                    <div className="flex items-center justify-end opacity-50 gap-1">
                      <CiWallet className="w-3 h-3" />
                      <span className="text-[10px]">
                        {userBalanceUSDC.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full flex items-center justify-start">
                    <Image
                      width={20}
                      height={20}
                      src="/usdc.png"
                      alt="usdc"
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
                    />
                    <input
                      type="number"
                      disabled
                      className="w-full input   px-12 pr-4 py-2  !bg-[#1B1E24] !text-white !text-opacity-100 "
                      placeholder="100"
                      value={amount}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 right-6">
                      USDC
                    </span>
                  </div>
                </div>

                <div className="w-full h-0.5 bg-[#E5E7EB14]"></div>

                {/* stats */}
                <div className="w-full flex flex-col items-start justify-start gap-4">
                  {/* price */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">Price</span>
                    <span className="text-xs ">1 USDC PER pUSD</span>
                  </div>
                  {/* slippage tolerance */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">
                      Slippage tolerance
                    </span>
                    <span className="text-xs ">-</span>
                  </div>
                  {/* minimum received */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">Minimum received</span>
                    <span className="text-xs ">{amount} USDC</span>
                  </div>
                  {/* swap fee */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs opacity-40">Swap fee</span>
                    <span className="text-xs ">0.00%</span>
                  </div>
                </div>

                {/* button */}
                <div className="w-full flex items-center justify-center">
                  {wallet.publicKey ? (
                    <button
                      className={`w-full h-full rounded-lg text-brand-main py-4 px-8 disabled:cursor-not-allowed uppercase bg-brand-main ${loading && `text-opacity-50`} disabled:text-gray-80 disabled:text-opacity-20  bg-opacity-10 disabled:bg-opacity-10 hover:bg-opacity-20 ease-in-out transition-all duration-300`}
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
