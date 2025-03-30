"use client"
import React, { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const { push } = useRouter()
  const [isBrowser, setIsBrowser] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  // Перевірка чи код виконується в браузері
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true) // Якщо це браузер, встановлюємо state
    }
  }, [])

  const logout = () => {
    if (isBrowser) {
      localStorage.removeItem('name')
      setIsLoggedOut(true) // Оновлюємо стан, що користувач вийшов
      push('/') // Перенаправляємо на головну сторінку
    }
  }

  useEffect(() => {
    if (isLoggedOut) {
      // Після виходу оновлюємо сторінку, щоб знову отримати коректні дані
      setTimeout(() => {
        window.location.reload() // Перезавантажуємо сторінку після logout
      }, 1000) // Тримаємо маленьку затримку, щоб процес був плавним
    }
  }, [isLoggedOut])

  if (!isBrowser) {
    return <div>Loading...</div> // Показуємо лоадер до тих пір, поки не підтвердимо, що вікно доступне
  }

  return (
    <div className='p-2'>
      <button onClick={() => logout()}>
        <LogOut size={26} />
      </button>
    </div>
  )
}

export default Logout
