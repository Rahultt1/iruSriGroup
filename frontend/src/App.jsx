import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <div className="">
        <NavigationBar className="z-50" />
        <div className="flex-grow relative z-0 pt-2"> 
          <div className="container mx-auto px-0">
            <SearchBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<BookList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;