'use client';

import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = inputText.trim();
    
    if (trimmedText) {
      onAddTodo(trimmedText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいタスクを入力してください..."
          className="flex-1 min-w-0 px-4 py-3 text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400"
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          追加
        </button>
      </div>
      
      {/* 文字数カウンター */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 text-xs text-gray-400 dark:text-gray-500">
        <span className="hidden sm:inline">Enterキーでも追加できます</span>
        <span className="sm:hidden">Enter/追加ボタンでタスクを追加</span>
        <span className={`${inputText.length > 180 ? 'text-red-500' : ''}`}>
          {inputText.length}/200文字
        </span>
      </div>
    </form>
  );
}