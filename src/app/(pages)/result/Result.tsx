"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ResultPage = () => {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const total = searchParams.get('total');

  return (
    <div>
      <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex justify-center items-center bg-cyan-400 w-[90%] md:w-[50%] h-[70%] md:h-[50%] rounded-lg text-white'>
                    <div className="text-center m-auto w-[40%] ">
                        <h1 className="text-2xl font-bold">Game Over</h1>
                        <p className="text-lg mt-2">Your score: {score} / {total}</p>

                        <Link href="/" className=" rounded-lg h-[50px] w-full mt-4 bg-white text-cyan-400 hover:bg-cyan-500 " >
                            Play Again
                        </Link>
                    </div>
                </div>
            </div>
    </div>
  );
};

const SuspendedResultPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResultPage />
  </Suspense>
);

export default SuspendedResultPage;
