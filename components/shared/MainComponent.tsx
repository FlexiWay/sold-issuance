'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import MyMultiButton from './MyMultiButton'
import Image from 'next/image'
import { useSold } from '@/hooks/useSold'
import { Spin } from 'antd'

export default function MainComponent() {
  const wallet = useWallet()
  const [leftTab, setLeftTab] = useState(true)

  const { handleDepositFunds, handleWithdrawFunds, amount, setAmount, loading } = useSold()

  const handleAmountChange = (event: { target: { value: any } }) => {
    setAmount(parseFloat(event.target.value));
  }


  return (
    <section className='w-full my-10'>
      <div
        className="w-full flex items-start lg:items-center justify-center px-4 lg:px-0"
        style={{ height: 'calc(100vh - 104px)' }}
      >

        <div className="w-full max-w-md bg-brand-bg rounded-lg shadow-md border border-white border-opacity-10 min-h-10">
          {/* tabs */}
          <div className="w-full flex items-center justify-between">
            <div
              className={`w-1/2 flex items-center justify-center p-4 bg-brand-secondary bg-opacity-10 text-brand-secondary rounded-tl-lg uppercase hover:bg-opacity-40 cursor-pointer font-bold  ${leftTab ? 'bg-opacity-40 text-opacity-100 ' : 'text-opacity-50'} ease-in-out transition-all duration-300`}
              onClick={() => setLeftTab(true)}
            >
              Deposit
            </div>
            <div
              className={`w-1/2 flex items-center justify-center p-4 bg-brand-main bg-opacity-10 text-brand-main rounded-tr-lg uppercase hover:bg-opacity-40 cursor-pointer font-bold  ${!leftTab ? 'bg-opacity-40 text-opacity-100 ' : 'text-opacity-50'} ease-in-out transition-all duration-300`}
              onClick={() => setLeftTab(false)}
            >
              Withdraw
            </div>
          </div>

          {/* content  */}
          {
            leftTab ? <form className="w-full flex flex-col items-center justify-start gap-6 p-6 py-8">
              {/* from */}
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <span className='text-xs'>FROM</span>
                <div className="relative w-full flex items-center justify-start">
                  <Image width={20} height={20} src="/usdc.png" alt="usdc" className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
                  <input
                    type="number"
                    id='amount-buy'
                    className='w-full input input-bordered bg-transparent px-12 pr-4 py-2'
                    placeholder='100'
                    value={amount}
                    onChange={handleAmountChange}
                    onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
                  />
                  <span className='absolute top-1/2 -translate-y-1/2 right-6'>USDC</span>
                </div>
              </div>
              {/* to */}
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <span className='text-xs'>TO</span>
                <div className="relative w-full flex items-center justify-start">
                  <Image width={20} height={20} src="/usdc.png" alt="usdc" className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
                  <input
                    type="number"
                    disabled
                    className='w-full input input-bordered !bg-brand-secondary !bg-opacity-5 px-12 pr-4 py-2 !text-opacity-80 !text-brand-secondary'
                    placeholder='100'
                    value={amount}
                  />
                  <span className='absolute top-1/2 -translate-y-1/2 right-6'>xSOLD</span>
                </div>
              </div>

              {/* stats */}
              <div className="w-full flex flex-col items-start justify-start gap-4 mt-8 opacity-60">
                {/* price */}
                <div className="w-full flex items-center justify-between">
                  <span className='text-xs uppercase'>Price</span>
                  <span className='text-xs '>1 xSOLD PER USDC</span>
                </div>
                {/* slippage tolerance */}
                <div className="w-full flex items-center justify-between">
                  <span className='text-xs uppercase'>Slippage tolerance</span>
                  <span className='text-xs '>-</span>
                </div>
                {/* minimum received */}
                <div className="w-full flex items-center justify-between">
                  <span className='text-xs uppercase'>Minimum received</span>
                  <span className='text-xs '>{amount} xSOLD</span>
                </div>
                {/* swap fee */}
                <div className="w-full flex items-center justify-between">
                  <span className='text-xs uppercase'>Swap fee</span>
                  <span className='text-xs '>0.00%</span>
                </div>

              </div>


              {/* button */}
              <div className="w-full flex items-center justify-center">
                {
                  wallet.publicKey ? <button
                    className={`w-full h-full rounded-lg text-brand-secondary py-4 px-8 disabled:cursor-not-allowed uppercase bg-brand-secondary ${loading && `text-opacity-50`} disabled:text-gray-80 disabled:text-opacity-20  bg-opacity-10 disabled:bg-opacity-10 hover:bg-opacity-20 ease-in-out transition-all duration-300`}
                    onClick={handleDepositFunds}
                    disabled={loading || amount === 0}
                  >
                    {loading && <Spin size='small' />} {!loading && `Deposit`}
                  </button> : <MyMultiButton />
                }
              </div>
            </form>
              :
              // right side
              <>
                <form className="w-full flex flex-col items-center justify-start gap-6 p-6 py-8">
                  {/* from */}
                  <div className="w-full flex flex-col items-start justify-start gap-2">
                    <span className='text-xs'>FROM</span>
                    <div className="relative w-full flex items-center justify-start">
                      <Image width={20} height={20} src="/usdc.png" alt="xsold" className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
                      <input
                        type="number"
                        id='amount-sell'
                        className='w-full input input-bordered bg-transparent px-12 pr-4 py-2'
                        placeholder='100'
                        value={amount}
                        onChange={handleAmountChange}
                      />
                      <span className='absolute top-1/2 -translate-y-1/2 right-6'>xSOLD</span>
                    </div>
                  </div>
                  {/* to */}
                  <div className="w-full flex flex-col items-start justify-start gap-2">
                    <span className='text-xs'>TO</span>
                    <div className="relative w-full flex items-center justify-start">
                      <Image width={20} height={20} src="/usdc.png" alt="usdc" className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
                      <input
                        type="number"
                        disabled
                        className='w-full input input-bordered  px-12 pr-4 py-2  !text-opacity-100 !text-brand-main !bg-brand-main !bg-opacity-5'
                        placeholder='100'
                        value={amount}
                      />
                      <span className='absolute top-1/2 -translate-y-1/2 right-6'>USDC</span>

                    </div>
                  </div>

                  {/* stats */}
                  <div className="w-full flex flex-col items-start justify-start gap-4 mt-8 opacity-60">
                    {/* price */}
                    <div className="w-full flex items-center justify-between">
                      <span className='text-xs uppercase'>Price</span>
                      <span className='text-xs '>1 USDC PER xSOLD</span>
                    </div>
                    {/* slippage tolerance */}
                    <div className="w-full flex items-center justify-between">
                      <span className='text-xs uppercase'>Slippage tolerance</span>
                      <span className='text-xs '>-</span>
                    </div>
                    {/* minimum received */}
                    <div className="w-full flex items-center justify-between">
                      <span className='text-xs uppercase'>Minimum received</span>
                      <span className='text-xs '>{amount} USDC</span>
                    </div>
                    {/* swap fee */}
                    <div className="w-full flex items-center justify-between">
                      <span className='text-xs uppercase'>Swap fee</span>
                      <span className='text-xs '>0.00%</span>
                    </div>

                  </div>


                  {/* button */}
                  <div className="w-full flex items-center justify-center">
                    {
                      wallet.publicKey ? <button
                        className={`w-full h-full rounded-lg text-brand-main py-4 px-8 disabled:cursor-not-allowed uppercase bg-brand-main ${loading && `text-opacity-50`} disabled:text-gray-80 disabled:text-opacity-20  bg-opacity-10 disabled:bg-opacity-10 hover:bg-opacity-20 ease-in-out transition-all duration-300`}
                        onClick={handleWithdrawFunds}
                        disabled={loading || amount === 0}
                      >
                        {loading && <Spin size='small' />} {!loading && `Withdraw`}
                      </button> : <MyMultiButton />
                    }
                  </div>
                </form>
              </>
          }

        </div>


      </div>
    </section>
  )
}
