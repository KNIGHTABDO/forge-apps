
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, ListTodo, Inbox } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('zen-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('zen-tasks', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const progress = todos.length > 0 ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ListTodo className="text-indigo-500" /> ZenTask
            </h1>
            <span className="text-xs font-mono text-slate-500">{todos.filter(t => !t.completed).length} remaining</span>
          </div>
          
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </header>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl transition-all">
            <Plus size={20} />
          </button>
        </form>

        <div className="flex gap-2 mb-6 text-sm">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full capitalize transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div 
                key={todo.id}
                className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800 group hover:border-slate-700 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? 
                    <CheckCircle className="text-emerald-500" size={22} /> : 
                    <Circle className="text-slate-600" size={22} />
                  }
                  <span className={`${todo.completed ? 'line-through text-slate-500' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-600">
              <Inbox size={48} className="mb-4 opacity-50" />
              <p>Your task list is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
