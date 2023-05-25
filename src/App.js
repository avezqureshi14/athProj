import './App.css';
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='*' element={ <Home /> }/>
          <Route path='/login' element={ <Login /> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
