import { useState } from 'react';
import axios from 'axios';

function SalaryPredictor() {
  const [prediction, setPrediction] = useState(null);
  const [job_title, setJob_title] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setPrediction(null);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/salary/predict', {
        location,
        job_title,
      });
      setPrediction(res.data['Estimated Salary']);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '80px auto',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
      backgroundColor: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '24px',
      color: '#2c3e50',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '15px',
      outlineColor: '#4CAF50',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: loading ? '#999' : '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontSize: '16px',
      fontWeight: '600',
    },
    predictionBox: {
      marginTop: '28px',
      backgroundColor: '#e8f5e9',
      padding: '18px 22px',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '500',
      color: '#2e7d32',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Location-Based Salary Predictor</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={job_title}
        onChange={(e) => setJob_title(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button} disabled={loading}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {prediction && (
        <div style={styles.predictionBox}>
          Predicted Salary: <strong>₹{prediction}</strong>
        </div>
      )}
    </div>
  );
}

export default SalaryPredictor;
