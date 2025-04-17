import { useState } from 'react';
import axios from 'axios';

function PrioritySalaryPredictor() {
  const [prediction, setPrediction] = useState("");
  const [job_title, setJob_title] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [job_type, setJob_type] = useState("");
  const [model, setModel] = useState("rf");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setPrediction(null);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/job-desc/predict', {
        job_title,
        skills,
        experience,
        industry,
        location,
        job_type,
        model
      });
      setPrediction(res.data["predicted_salary"]);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '650px',
      margin: '60px auto',
      background: '#fefefe',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
      fontFamily: 'Segoe UI, sans-serif'
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: '600',
      color: '#222',
      marginBottom: '30px'
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
    select: {
      width: '100%',
      padding: '14px 16px',
      margin: '12px 0',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '15px'
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
    predictionBox: {
      marginTop: '30px',
      backgroundColor: '#e3f2fd',
      padding: '16px 20px',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '500',
      color: '#1976d2'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Priority Based Salary Prediction</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={job_title}
        onChange={(e) => setJob_title(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Job Type"
        value={job_type}
        onChange={(e) => setJob_type(e.target.value)}
        style={styles.input}
      />

      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        style={styles.select}
      >
        <option value="rf">Random Forest</option>
        <option value="xg">XGBoost</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          ...styles.button,
          ...(loading ? { backgroundColor: '#999', cursor: 'not-allowed' } : {})
        }}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {prediction && (
        <div style={styles.predictionBox}>
          Predicted Salary: <strong>₹{prediction}</strong>
        </div>
      )}
    </div>
  );
}

export default PrioritySalaryPredictor;
