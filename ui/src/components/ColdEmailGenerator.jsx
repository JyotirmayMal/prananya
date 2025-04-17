import { useState } from 'react';
import axios from 'axios';

function ColdEmailGenerator() {
  const [yourName, setYourName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [emailContent, setEmailContent] = useState('');

  const generateEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5555/generate-email', {
        jobDesc,
        recruiterName,
        expertise,
        yourName,
      });

      setEmailContent(response.data.emailContent); // Set the generated email
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '60px auto',
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
    textarea: {
      width: '100%',
      height: '120px',
      padding: '14px 16px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '15px',
      resize: 'vertical',
      outlineColor: '#4CAF50',
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
    },
    outputBox: {
      marginTop: '28px',
      whiteSpace: 'pre-line',
      backgroundColor: '#f1f8e9',
      padding: '20px',
      borderRadius: '12px',
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#2e7d32',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Cold Email Generator</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={yourName}
        onChange={(e) => setYourName(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Recruiter Name"
        value={recruiterName}
        onChange={(e) => setRecruiterName(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Job Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        style={styles.textarea}
      />

      <input
        type="text"
        placeholder="Your Expertise (e.g., React, Data Analysis)"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        style={styles.input}
      />

      <button onClick={generateEmail} style={styles.button}>
        Generate Cold Email
      </button>

      {emailContent && (
        <div style={styles.outputBox}>
          {emailContent}
        </div>
      )}
    </div>
  );
}

export default ColdEmailGenerator;
