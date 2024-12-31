import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import LandingPage from './pages/LandingPage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    
    <Router>
      <NavBar />
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<BookList/>} />
      </Routes>
    </Router>
  );
};

export default App;