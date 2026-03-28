
import React, { useState } from 'react';
import { Check, Menu, X, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_TASKS = [
  { id: 1, title: 'Refine Project Proposal', category: 'Work', time: '10:30 AM', completed: false },
  { id: 2, title: 'Weekly Grocery Run', category: 'Personal', time: '2:00 PM', completed: true },
  { id: 3, title: 'Design Review Meeting', category: 'Work', time: '4:00 PM', completed: false },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      category: 'General',
      time: 'Just now',
      completed: false
    };
    setTasks([...tasks, newTask]);
    setPage('home');
  };

  const navigate = (p) => {
    setPage(p);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f7] text-[#2c2f30] font-sans">
      {sidebarOpen && <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
      
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 shadow-2xl p-6 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setSidebarOpen(false)} className="mb-8 p-2 hover:bg-[#f5f6f7] rounded-full"><X size={20} /></button>
        <nav className="space-y-4">
          <button onClick={() => navigate('home')} className="block w-full text-left font-bold text-lg hover:text-[#0058ba]">Dashboard</button>
          <button onClick={() => navigate('new-intent')} className="block w-full text-left font-bold text-lg hover:text-[#0058ba]">New Intent</button>
          <button onClick={() => navigate('calendar')} className="block w-full text-left font-bold text-lg hover:text-[#0058ba]">Calendar</button>
        </nav>
      </div>

      {page === 'home' && <HomePage tasks={tasks} toggleTask={toggleTask} setSidebarOpen={setSidebarOpen} />}
      {page === 'new-intent' && <NewIntentPage navigate={navigate} addTask={addTask} />}
      {page === 'calendar' && <CalendarPage setSidebarOpen={setSidebarOpen} />}
    </div>
  );
}

function HomePage({ tasks, toggleTask, setSidebarOpen }) {
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <>
      <header className="bg-[#f5f6f7] w-full pt-8 pb-4 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 w-full max-w-xl mx-auto">
          <button onClick={() => setSidebarOpen(true)} className="text-[#0058ba] hover:bg-[#eff1f2] p-2 rounded-full transition-colors"><Menu size={24} /></button>
          <h1 className="font-bold text-2xl tracking-tight">Today</h1>
          <div className="w-8 h-8 rounded-full bg-[#c6cfff]" />
        </div>
      </header>
      <main className="max-w-xl mx-auto px-6 mt-6 pb-20">
        <section className="mb-10 flex items-center justify-between p-6 bg-white rounded-xl shadow-[0px_10px_30px_rgba(0,88,186,0.04)]">
          <div>
            <span className="text-[#595c5d] font-medium text-sm">Daily Goal</span>
            <div className="font-extrabold text-3xl">{progress}%</div>
          </div>
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <path className="text-[#eff1f2] stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
            <path className="text-[#0058ba] stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray={`${progress}, 100`} strokeLinecap="round" strokeWidth="3"></path>
          </svg>
        </section>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg bg-white hover:shadow-md transition-all">
              <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-[#0058ba] border-[#0058ba]' : 'border-[#abadae]'}`}>
                <Check size={14} className={task.completed ? 'text-white' : 'text-transparent'} />
              </button>
              <h3 className={`font-semibold ${task.completed ? 'line-through text-[#757778]' : ''}`}>{task.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function NewIntentPage({ navigate, addTask }) {
  const [title, setTitle] = useState('');
  
  return (
    <div className="max-w-xl mx-auto px-6 pt-8 pb-20">
      <button onClick={() => navigate('home')} className="mb-6 flex items-center gap-2 text-[#595c5d]"><X size={20}/> Close</button>
      <h1 className="text-3xl font-bold mb-8">New Intent</h1>
      <div className="space-y-6">
        <input 
          className="w-full p-4 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#0058ba] outline-none" 
          placeholder="What needs to be done?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
          onClick={() => title && addTask(title)}
          disabled={!title}
          className="w-full py-4 bg-[#0058ba] text-white font-bold rounded-xl shadow-lg hover:bg-[#004da4] disabled:opacity-50 transition-all"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

function CalendarPage({ setSidebarOpen }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <>
      <header className="pt-8 pb-4">
        <div className="flex items-center justify-between px-6 w-full max-w-xl mx-auto">
          <button onClick={() => setSidebarOpen(true)} className="text-[#0058ba] p-2 rounded-full"><Menu size={24} /></button>
          <h1 className="font-bold text-2xl">Calendar</h1>
          <div className="w-8 h-8 rounded-full bg-[#c6cfff]" />
        </div>
      </header>
      <main className="max-w-xl mx-auto px-6 py-6">
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-xl">October 2023</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-[#f5f6f7] rounded-full"><ChevronLeft size={20}/></button>
              <button className="p-2 hover:bg-[#f5f6f7] rounded-full"><ChevronRight size={20}/></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-y-6 text-center">
            {days.map(d => <div key={d} className="text-[10px] font-bold uppercase tracking-widest text-[#595c5d]">{d}</div>)}
            {[...Array(30)].map((_, i) => (
              <div key={i} className={`py-2 text-sm ${i === 10 ? 'bg-[#0058ba] text-white rounded-lg shadow-lg font-bold' : ''}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
