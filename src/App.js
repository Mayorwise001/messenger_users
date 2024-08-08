import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/signup';
import Login from './components/login';
import SignOut from './components/sidebar/logout';
import Home from './components/home';
import ProtectedRoute from './components/protectedroute';

function App() {
  return (

      <Router>
            <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                    <Route/>
                    </Route>

                <Route path='/sign-up' element={<SignUpForm/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<SignOut/>}/>
  

</Routes>
</Router>
  );
}

export default App;
