"use client";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface IGame {
  amount?: string;
  category?: string;
  difficulty?: string;
  type?: string;
}

interface IQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IGameType {
  data: IGame | undefined;
}

const Game = ({ data }: IGameType) => {
  const [dataGame, setDataGame] = useState<IGame | undefined>(data);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [answersOrder, setAnswersOrder] = useState<{ [key: number]: string[] }>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getQuestions = useCallback(async () => {
    if (!data) return;

    const { amount = dataGame?.amount, category = dataGame?.category, difficulty = dataGame?.difficulty, type = dataGame?.type } = data;

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      const result = await response.json();

      if (response.ok) {
        setQuestions(result.results || []);
        const shuffledAnswers = result.results.reduce((acc: { [key: number]: string[] }, q: IQuestion, index: number) => {
          acc[index] = [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5);
          return acc;
        }, {});
        setAnswersOrder(shuffledAnswers);
      } else {
        setError("Failed to fetch questions. Please try again.");
      }
    } catch (error) {
      setError("Error fetching questions: " + error);
    }
  }, [data, dataGame]);

// eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetQuestions = useCallback(debounce(getQuestions, 2000), [getQuestions]);

  useEffect(() => {
    if (data) {
      setDataGame(data);
      debouncedGetQuestions();
    }
    return () => {
      debouncedGetQuestions.cancel(); // Очищаємо debounce при unmount
    };
  }, [data, debouncedGetQuestions]);

  function decodeHtmlEntities(str: string) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleFinish = () => {
    let correctCount = 0;

    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correct_answer) {
        correctCount++;
      }
    });

    router.push(`/result?score=${correctCount}&total=${questions.length}`);
  };

  if (!dataGame) return <div>Loading...</div>;

  return (
    <div>
      <div className='m-2 flex text-lg'>
        <div className='p-1'>Number of questions: {dataGame.amount},</div>
        <div className='p-1'>Level: {dataGame.difficulty}</div>
      </div>
      <h2>Questions</h2>
      {error && <p>{error}</p>}
      {questions.length > 0 ? (
        <ul>
          {questions.map((q, index) => (
            <li key={index} className='mt-2'>
              <Card>
                <CardHeader><p>{decodeHtmlEntities(q.question)}</p></CardHeader>
                <CardContent>
                  {answersOrder[index]?.map((answer, idx) => (
                    <div key={idx} className="flex items-center mt-1">
                      <CardDescription>
                        <input
                          type="radio"
                          id={`answer-${index}-${idx}`}
                          name={`question-${index}`}
                          value={answer}
                          checked={userAnswers[index] === answer}
                          onChange={() => handleAnswerSelect(index, answer)}
                        />
                        <label htmlFor={`answer-${index}-${idx}`} className="ml-2">
                          {decodeHtmlEntities(answer)}
                        </label>
                      </CardDescription>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions loaded</p>
      )}

      {questions.length > 0 && (
        <div className="mt-4">
          <button className='w-full rounded-md bg-cyan-400 hover:bg-cyan-300 text-white h-[30px]' onClick={handleFinish}>Finish</button>
        </div>
      )}
    </div>
  );
};

export default Game;
