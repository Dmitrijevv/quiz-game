"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ResultPage = () => {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const total = searchParams.get('total');

  return (
    <div>
      <h1>Result</h1>
      <p>Your score: {score} / {total}</p>
    </div>
  );
};

const SuspendedResultPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResultPage />
  </Suspense>
);

export default SuspendedResultPage;
