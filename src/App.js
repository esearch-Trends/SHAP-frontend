import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Display from './pages/Display';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/results' element={<Display/>}/>
      </Routes>
    </div>
  );
}

export default App;
