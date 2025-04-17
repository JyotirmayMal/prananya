import { useState } from 'react';
import axios from 'axios';

function IndustryPredictor() {
  const [prediction, setPrediction] = useState(null);
  const [job_description, setJob_description] = useState("");
  const [required_skills, setRequired_skills] = useState("");
  const [experience_level, setExperience_level] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setPrediction(null);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/industry/predict', {
        job_description,
        required_skills,
        experience_level
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '60px auto',
      background: '#fefefe',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#222',
      fontSize: '24px',
      fontWeight: '600'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      margin: '12px 0',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '15px',
      transition: '0.2s ease-in-out'
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      marginTop: '20px',
      transition: 'background 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#45a049'
    },
    predictionBox: {
      marginTop: '30px',
      backgroundColor: '#e8f5e9',
      padding: '15px 20px',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '500',
      color: '#2e7d32'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Job Description-Based Industry Predictor</h2>

      <input
        type="text"
        placeholder="Job Description"
        value={job_description}
        onChange={(e) => setJob_description(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Required Skills"
        value={required_skills}
        onChange={(e) => setRequired_skills(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Experience Level"
        value={experience_level}
        onChange={(e) => setExperience_level(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={handleSubmit}
        style={{
          ...styles.button,
          ...(loading ? { backgroundColor: '#999', cursor: 'not-allowed' } : {})
        }}
        disabled={loading}
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {prediction && (
        <div style={styles.predictionBox}>
          Predicted Industry Type: <strong>{prediction}</strong>
        </div>
      )}
    </div>
  );
}

export default IndustryPredictor;
