import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Greeting from './components/greetigs';

import SignUpForm from './components/signup';
import Login from './components/login';
import SignOut from './components/logout';

function App() {
  return (

      <Router>
            <Routes>
                <Route path='/' element={<Greeting/>}/>
                <Route path='/sign-up' element={<SignUpForm/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<SignOut/>}/>

</Routes>
</Router>
  );
}

export default App;
