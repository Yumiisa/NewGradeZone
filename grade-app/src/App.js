import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path ="/login" element ={<Login/>}/>
          <Route  path ="register" element ={<Register/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="*" element={<NotFound/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
