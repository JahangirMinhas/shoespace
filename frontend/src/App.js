import Home from './pages/Home.js';
import MainBar from './components/MainBar.js';
import Collection from './pages/Collection.js';
import Login from './pages/login.js';
import SignUp from './pages/signup.js';
import Search from './pages/Search.js';
import VerifyEmail from './pages/verifyEmail.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const noAppBarPaths = ['/login', '/signup', '/verify-email'];

  return (
    <>
      {!noAppBarPaths.includes(location.pathname) && <MainBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:type" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  );
};

export default App;
