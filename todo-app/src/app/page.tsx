import TodoApp from '@/components/TodoApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-4 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            📝 Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            シンプルで使いやすいタスク管理アプリ
          </p>
        </header>
        <main className="animate-slide-in">
          <TodoApp />
        </main>
      </div>
    </div>
  );
}
