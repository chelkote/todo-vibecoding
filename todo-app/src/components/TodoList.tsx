'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEditTodo: (id: string, newText: string) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onReorderTodos: (startIndex: number, endIndex: number) => void;
}

export default function TodoList({ 
  todos, 
  onEditTodo, 
  onDeleteTodo, 
  onToggleTodo,
  onReorderTodos 
}: TodoListProps) {
  // ドラッグ&ドロップのハンドラー
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      onReorderTodos(dragIndex, dropIndex);
    }
  };

  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className="group transition-all duration-200 hover:scale-[1.01] cursor-move animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TodoItem
            todo={todo}
            onEdit={(newText) => onEditTodo(todo.id, newText)}
            onDelete={() => onDeleteTodo(todo.id)}
            onToggle={() => onToggleTodo(todo.id)}
          />
        </div>
      ))}
    </div>
  );
}