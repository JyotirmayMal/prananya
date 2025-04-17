import { Routes, Route, Link } from 'react-router-dom';
import SalaryPredictor from '../components/SalaryPredictor';
import IndustryPredictor from '../components/IndustryPredictor';
import PrioritySalaryPredictor from '../components/PrioritySalaryPredictor';
import ColdEmailGenerator from '../components/ColdEmailGenerator';

function CareerPrediction() {
  const navButtonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#4CAF50',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '16px',
  };

  const navButtonHoverStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
  };

  const handleMouseOver = (e) => {
    Object.assign(e.target.style, navButtonHoverStyle);
  };

  const handleMouseOut = (e) => {
    Object.assign(e.target.style, navButtonStyle);
  };

  return (
    <div style={{
      padding: '30px',
      fontFamily: 'Montserrat, sans-serif',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem', color: '#333' }}>
        Career Intelligence Platform
      </h1>

      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <Link
          to="/career/salary"
          style={navButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Location Salary Predictor
        </Link>
        <Link
          to="/career/industry"
          style={navButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Industry Predictor
        </Link>
        <Link
          to="/career/priority"
          style={navButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Priority Salary
        </Link>
        <Link
          to="/career/email"
          style={navButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Cold Email Generator
        </Link>
      </nav>

      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <Routes>
          <Route path="salary" element={<SalaryPredictor />} />
          <Route path="industry" element={<IndustryPredictor />} />
          <Route path="priority" element={<PrioritySalaryPredictor />} />
          <Route path="email" element={<ColdEmailGenerator />} />
        </Routes>
      </div>
    </div>
  );
}

export default CareerPrediction;
