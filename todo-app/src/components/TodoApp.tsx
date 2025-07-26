'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ローカルストレージからTodoを読み込み
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Todoの読み込みに失敗しました:', error);
      }
    }
  }, []);

  // ローカルストレージにTodoを保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 新しいTodoを追加
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  // Todoを編集
  const editTodo = (id: string, newText: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  // Todoを削除
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Todo完了状態を切り替え
  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todoの順序を変更（ドラッグ&ドロップ用）
  const reorderTodos = (startIndex: number, endIndex: number) => {
    setTodos(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
      {/* Todo追加フォーム */}
      <TodoForm onAddTodo={addTodo} />
      
      {/* Todo統計 */}
      <div className="grid grid-cols-3 gap-2 sm:flex sm:justify-between sm:items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 sm:px-4 py-2">
        <span className="text-center sm:text-left">合計: {todos.length}件</span>
        <span className="text-center">完了: {todos.filter(todo => todo.completed).length}件</span>
        <span className="text-center sm:text-right">未完了: {todos.filter(todo => !todo.completed).length}件</span>
      </div>

      {/* Todoリスト */}
      <TodoList
        todos={todos}
        onEditTodo={editTodo}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
        onReorderTodos={reorderTodos}
      />

      {/* 空状態のメッセージ */}
      {todos.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-lg">まだTodoがありません</p>
          <p className="text-sm">上のフォームから新しいタスクを追加してみましょう</p>
        </div>
      )}
    </div>
  );
}