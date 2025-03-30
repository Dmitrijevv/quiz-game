"use client"
import React, { useState } from 'react';
import MainPage from './(pages)/main/MainPage';
import EntryPgage from './EntryPgage';

const Switcher = () => {
  // const [isBrowser, setIsBrowser] = useState(false);
  const [isName, setIsName] = useState<string | null>(null); // Додаємо state для імені користувача


  return (
    <div>
      {isName ? (
        <>
          <MainPage />
          <button onClick={() => { 
            localStorage.removeItem('name'); 
            setIsName(null); // Оновлюємо стан після logout
          }}>
            Logout
          </button>
        </>
      ) : (
        <EntryPgage />
      )}
    </div>
  );
};

export default Switcher;
