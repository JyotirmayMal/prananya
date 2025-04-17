import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [navbarOpacity, setNavbarOpacity] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5555/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Failed to load jobs", err));

    const handleScroll = () => {
      const opacity = Math.max(0.7, 1 - window.scrollY / 300);
      setNavbarOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blogList = [
    { title: "5 Steps to Crack Interviews", author: "Bijayalaxmi" },
    { title: "Resume Tips for 2025", author: "Baisakhi" },
    { title: "Top 10 Coding Challenges", author: "Barsha" }
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for your query, ${formData.name}! You will be connected soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const slides = [slide1, slide2, slide3];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const navLinkStyle = {
    margin: '0 12px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: '0.3s ease',
    fontFamily: 'Poppins, sans-serif',
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        background: `rgba(51, 51, 51, ${navbarOpacity})`,
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        padding: '1rem 0',
        transition: 'opacity 0.4s ease-in-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {['/', '/jobs', '/career'].map((path, i) => (
            <Link
              key={path}
              to={path}
              style={navLinkStyle}
              onMouseOver={e => e.target.style.background = '#fff158'}
              onMouseOut={e => e.target.style.background = 'transparent'}
            >
              {['Home', 'Job Board', 'Career Intelligence'][i]}
            </Link>
          ))}
          <button
            onClick={() => {
              const contact = document.getElementById("contact-section");
              contact && contact.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              ...navLinkStyle,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.target.style.background = '#fff158'}
            onMouseOut={e => e.target.style.background = 'transparent'}
          >
            Contact TPCELL
          </button>
        </div>
      </nav>

      {/* Hero Slider */}
      <div>
        <img
          src={slides[currentSlide]}
          alt={`slide ${currentSlide + 1}`}
          style={{
            width: '100%',
            height: '90vh',
            objectFit: 'cover',
            display: 'block',
            borderBottom: '6px solid #fff158',
          }}
        />
      </div>

      {/* Job Listings */}
      <h2 style={{ padding: '2rem 1rem 0', fontFamily: 'Poppins, sans-serif' }}>Job Listings</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '1rem',
        gap: '1rem'
      }}>
      {jobs.map((job, idx) => (
        <Link
          to="/jobs"
          key={idx}
          style={{
            minWidth: '240px',
            background: '#f9f9f9',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s',
            fontFamily: 'Poppins, sans-serif',
            textDecoration: 'none',
            color: 'inherit'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h4>{job.title}</h4>
          <p style={{ color: '#555' }}>{job.company}</p>
        </Link>
        ))}
      </div>

      {/* Career Blogs */}
      <h2 style={{ padding: '2rem 1rem 0', fontFamily: 'Poppins, sans-serif' }}>Career Blogs</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '1rem',
        gap: '1rem'
      }}>
        {blogList.map((blog, idx) => (
          <div key={idx} style={{
            minWidth: '250px',
            background: '#fff',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            fontFamily: 'Poppins, sans-serif',
          }}>
            <Link
              to={`/career-blogs/${blog.title.replace(/\s+/g, '-').toLowerCase()}`}
              style={{ textDecoration: 'none', color: '#181DB8', fontWeight: 'bold' }}
            >
              <h4>{blog.title}</h4>
            </Link>
            <p style={{ color: '#777' }}>by {blog.author}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <h2 id="contact-section" style={{ padding: '2rem 1rem 1rem', fontFamily: 'Poppins, sans-serif' }}>Contact Us</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            resize: 'none'
          }}
        />
        <button type="submit" style={{
          padding: '0.8rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#181DB8',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          transition: '0.3s'
        }}
          onMouseOver={e => e.target.style.backgroundColor = '#000'}
          onMouseOut={e => e.target.style.backgroundColor = '#181DB8'}
        >
          Send
        </button>
      </form>

      {/* Footer */}
      <footer style={{
        background: '#181DB8',
        color: '#fff',
        textAlign: 'center',
        padding: '1.5rem',
        marginTop: '2rem',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px'
      }}>
        © 2025 HireHub. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
