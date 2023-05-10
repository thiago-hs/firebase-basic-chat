import './App.css';
import { Auth } from './components/Auth';
import { useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const cookies = new Cookies();
  const [ isAuth , setIsAuth ] = useState(cookies.get('auth-token'));
  const [ room , setRoom ] = useState('');
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom('');
  };

  if(!isAuth){
    return (
      <div className="App">
        <h1>O app mais merda da história</h1>
        <Auth setIsAuth={setIsAuth} />
      </div>
    ); 
  }

  return (
    <>
      {
        room ? 

          <div className="App">
            <h1>O app mais merda da história</h1>
            <div className='room-chat'>
              <Chat room={room} setRoom={setRoom} />
            </div>
          </div> 
        
        : 
        
          <div className="App">
            <h1>O app mais merda da história</h1>
            <div className='select-room'>
              <label>Select a room</label>
              <input ref={roomInputRef}></input>
              <button onClick={() => { roomInputRef.current.value && setRoom(roomInputRef.current.value) }}>Enter chat</button>
            </div>
          </div>
      }

      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  ) 
}

export default App;
