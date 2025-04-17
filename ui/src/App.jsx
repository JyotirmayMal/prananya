import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CareerPrediction from './pages/CareerPrediction'
import HomePage from './pages/HomePage'
import Jobs from './pages/Jobs'
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career/*" element={<CareerPrediction />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/career-blogs/:blogTitle" element={<BlogPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
