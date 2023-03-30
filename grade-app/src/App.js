import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import { useEffect } from 'react';
import { refreshtoken } from './redux/authslice';
import Header from './components/Header';
import Explore from './pages/Explore';
import Message from './pages/Message';
import Notifications from './pages/Notifications';
import PrivateRouter from './utils/PrivateRouter';
import Profile from './pages/Profile';

function App() {
  const  dispatch = useDispatch()
  const {token,user} = useSelector(state=>state.auth)
  // console.log(user)
  useEffect(() => {
   dispatch(refreshtoken())
  }, [dispatch])
  return (
    <div className="App">
     
      <Router>
        <Alert/>
        { token &&  <Header/> }
       
        <Routes>
            <Route path="/" element={token ? <Home /> : <Login />} />
          <Route  path ="/login" element ={<Login/>}/>
           <Route  path ="/register" element ={<Register/>}/>
            <Route path="*" element={<NotFound/>}/>

            <Route element ={<PrivateRouter/>}>
               <Route  path ="/explore" element ={<Explore/>}/>
              <Route  path ="/message" element ={<Message/>}/>
              <Route  path ="/notifications" element ={<Notifications/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
         
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
