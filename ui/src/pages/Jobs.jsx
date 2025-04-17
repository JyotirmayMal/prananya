// Jobs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import JobApplicationForm from '../components/JobApplicationForm';

const JobCard = ({ job }) => {
  const [showForm, setShowForm] = useState(false);

  const handleHover = (e) => {
    e.target.style.transform = 'translateX(5px)';
  };

  const handleMouseOut = (e) => {
    e.target.style.transform = 'translateX(0)';
  };

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div style={styles.cardWrapper}>
      <div style={styles.card}>
        <div style={styles.jobInfo}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
        </div>
        <button
          style={styles.applyButton}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          Apply
        </button>
      </div>

      {showForm && (
        <JobApplicationForm job={job} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5555/jobs')
      .then(response => setJobs(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.page}>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
      <Toaster />
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f2f2f2'
  },
  cardWrapper: {
    marginBottom: '30px'
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  jobInfo: {
    maxWidth: '70%'
  },
  applyButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  }
};

export default Jobs;
