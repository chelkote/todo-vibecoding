'use client';

import { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
  onEdit: (newText: string) => void;
  onDelete: () => void;
  onToggle: () => void;
}

export default function TodoItem({ todo, onEdit, onDelete, onToggle }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // 編集モードに入った時にフォーカス
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // 編集を保存
  const handleSaveEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(trimmedText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  // 編集をキャンセル
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  // キーボードイベント
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // 作成日時のフォーマット
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes <= 0 ? 'たった今' : `${diffInMinutes}分前`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}時間前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}日前`;
    }
  };

  return (
    <div className={`
      bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600
      transition-all duration-300 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-400
      ${todo.completed ? 'opacity-60' : ''}
    `}>
      <div className="flex items-start gap-3">
        {/* 完了チェックボックス */}
        <button
          onClick={onToggle}
          className={`
            flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5
            transition-all duration-200 hover:scale-110
            ${todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 dark:border-gray-500 hover:border-green-400'
            }
          `}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* テキスト部分 */}
        <div className="flex-grow min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveEdit}
              className="w-full px-2 py-1 text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={200}
            />
          ) : (
            <div>
              <p 
                className={`
                  text-gray-700 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 break-words
                  ${todo.completed ? 'line-through' : ''}
                `}
                onClick={() => setIsEditing(true)}
              >
                {todo.text}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {formatDate(todo.createdAt)}
              </p>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        {!isEditing && (
          <div className="flex-shrink-0 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
              title="編集"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              title="削除"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ドラッグインジケーター */}
      <div className="mt-2 flex justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-200">
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}