"use client"
// import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import MainPage from './(pages)/main/MainPage';
import EntryPgage from './EntryPgage';

const Switcher = () => {
  // const [isBrowser, setIsBrowser] = useState(false);
  const [isName, setIsName] = useState<string | null>(null); // Додаємо state для імені користувача

  // useEffect(() => {
  //   // Перевірка, чи код виконується в браузері
  //   if (typeof window !== 'undefined') {
  //     setIsBrowser(true);
  //     const storedName = localStorage.getItem('name'); // Отримуємо ім'я з localStorage
  //     setIsName(storedName);
  //   }
  // }, []);

  // if (!isBrowser || isName === null) {
  //   return <Loader />; // Показуємо лоадер, поки ми не визначили, чи є ім'я
  // }

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
