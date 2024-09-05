import './App.css';
import Main from './crud/Main';
import Dashboard from './dashboard/Dashboard';
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <main className="flex-1 p-4 mx-2 md:ml-[25vw] overflow-auto">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
