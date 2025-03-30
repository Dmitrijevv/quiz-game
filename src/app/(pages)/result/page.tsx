"use client";
import { useSearchParams, useRouter } from 'next/navigation';

const ResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get("score");
  const total = searchParams.get("total");

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex justify-center items-center bg-cyan-400 w-[90%] md:w-[50%] h-[70%] md:h-[50%] rounded-lg text-white'>
      <div className="text-center m-auto w-[40%] ">
      <h1 className="text-2xl font-bold">Game Over</h1>
      <p className="text-lg mt-2">Your score: {score} / {total}</p>
      
      <button className=" rounded-lg h-[50px] w-full mt-4 bg-white text-cyan-400 hover:bg-cyan-500 " onClick={() => router.push('/')}>
        Play Again
      </button>
    </div>
      </div>
    </div>
  );
};

export default ResultPage;
