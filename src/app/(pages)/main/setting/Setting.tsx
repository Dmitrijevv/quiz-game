"use client"
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Game from '../Game/Game'


interface Category {
  id: number
  name: string
}

interface SettingForm {
  amount?: string
  category?: string
  difficulty?: string
  type?: string
}

const Setting = () => {
  const { register, reset, handleSubmit } = useForm<SettingForm>()
  const [categories, setCategories] = useState<Category[]>([])
  const [dataGame, setDataGame] = useState<SettingForm | undefined>()
  const [started, setStarted] = useState<boolean>(false)
  
  const getCategory = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()
      setCategories([{ id: 0, name: "Any Category" }, ...data.trivia_categories]) // Додаємо варіант "Any"
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }
  
  useEffect(() => {
    getCategory()
  }, [])
  
  const onSubmit = (data: SettingForm, event?: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault(); // Запобігає оновленню сторінки
    }
    setDataGame(data);
    setStarted(true);
    reset();
  };
  
  
  




  return (
    <div className='w-full md:w-[30%]'>
      {started && dataGame ? (
  <div className='mt-10 p-3'>
    <div className='flex justify-end'>
    <button onClick={() => setStarted(false)}><X /></button>
    </div>
    <Game data={dataGame} />
  </div>
) : (
  <div className='mt-10 p-3'>
    <h1 className='text-lg font-mono'>Setting game</h1>
    <p>This is the setting page.</p>
    <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
      <label>Number of questions:</label>
      <input className='mb-5 w-full border-2 border-cyan-400 p-3 rounded-xl' defaultValue="10" {...register('amount')} required />
      <br />
      <label>Category:</label>
      <br />
      <select className='mb-5 w-full border-2 border-cyan-400 p-3 rounded-xl' {...register('category')} required>
        <option value="any">Any Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />
      <label>Level difficulty:</label>
      <br />
      <select className='mb-5 w-full border-2 border-cyan-400 p-3 rounded-xl' {...register('difficulty')} required>
        <option value="any">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br />
      <label>Select type:</label>
      <br />
      <select className='mb-5 w-full border-2 border-cyan-400 p-3 rounded-xl' {...register('type')} required>
        <option value="any">Any</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>

      <div className="mt-4 flex gap-2">
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">
          Start
        </button>
        <button type="button" onClick={() => reset()} className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  )
}

export default Setting
