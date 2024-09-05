import './App.css';
import Main from './crud/Main';
import Dashboard from './dashboard/Dashboard';
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter as Routes, Route } from 'react-router-dom';

function App() {
  return (

    <div className="App flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
